interface PostInfo {
  id: string;
  owner_id: string;
  parent_id: null;
  slug: string;
  title: string;
  body: string;
  status: string;
  type: string;
  source_url: null;
  created_at: string;
  updated_at: string;
  published_at: string;
  deleted_at: null;
  owner_username: string;
  tabcoins: number;
  tabcoins_credit: number;
  tabcoins_debit: number;
  children_deep_count: number;
}

export default async function getTabnewsPostInfo(id: string) {
  const res = await fetch(`https://www.tabnews.com.br/api/v1/contents/kauadev/${id}`, {
    next: { revalidate: 3600 },
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36",
    },
  });

  console.warn(res);

  if (!res.ok) {
    return null;
  }

  const json = (await res.json()) as PostInfo;

  return json;
}
