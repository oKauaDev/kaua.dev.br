import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

type AttributeMap = Record<string, string[]>;
type ProtocolMap = Record<string, string[]>;

export async function markdownToHtml(markdown: string): Promise<string> {
  // Estende o schema padrão ao invés de recriá-lo do zero
  const schema = JSON.parse(JSON.stringify(defaultSchema)) as unknown as {
    attributes?: AttributeMap;
    protocols?: ProtocolMap;
  };

  // Permite atributos adicionais necessários
  schema.attributes = {
    ...schema.attributes,
    "*": [...(schema.attributes?.["*"] ?? []), "className", "id"],
    a: [...(schema.attributes?.a ?? []), "href", "title", "target", "rel"],
    img: [
      ...(schema.attributes?.img ?? []),
      "src",
      "alt",
      "title",
      "width",
      "height",
      "style",
      "loading",
      "decoding",
    ],
    p: [...(schema.attributes?.p ?? []), "align"],
    div: [...(schema.attributes?.div ?? []), "align"],
  };

  // Permite protocolos http/https/data para imagens externas
  schema.protocols = {
    ...(schema.protocols ?? {}),
    href: ["http", "https", "mailto"],
    src: ["http", "https", "data"],
  } as ProtocolMap;

  const processed = await remark()
    // Converte MDAST -> HAST, mantendo HTML bruto do markdown
    .use(remarkRehype, { allowDangerousHtml: true })
    // Processa nós HTML brutos embutidos no markdown
    .use(rehypeRaw)
    // Sanitiza com schema estendido (evita XSS, mas permite <img>, align, etc.)
    .use(rehypeSanitize, schema)
    // Serializa HAST -> HTML string
    .use(rehypeStringify)
    .process(markdown);

  return String(processed);
}
