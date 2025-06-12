type Posts = {
  id: string;
  owner_id: string;
  parent_id: string | null;
  slug: string;
  title: string | null;
  status: string;
  type: string;
  source_url: string | null;
  created_at: string;
  updated_at: string;
  published_at: string;
  deleted_at: string | null;
  owner_username: string;
  tabcoins: number;
  tabcoins_credit: number;
  tabcoins_debit: number;
  children_deep_count: number;
}[];

export default async function getTabnewsPosts() {
  const res = await fetch("https://www.tabnews.com.br/api/v1/contents/kauadev?page=1&per_page=50", {
    next: { revalidate: 60 },
  });

  const json = (await res.json()) as Posts;

  const validPosts = json.filter(
    (post) => post.parent_id === null && post.title !== null && post.deleted_at === null
  );

  return validPosts;
}
