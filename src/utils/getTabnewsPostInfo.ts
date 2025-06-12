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
    next: { revalidate: 60 * 60 },
  });

  if (!res.ok) {
    return null;
  }

  const json = (await res.json()) as PostInfo;

  return json;
}
