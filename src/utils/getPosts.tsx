import getTabnewsPosts from "./getTabnewsPosts";
import getTwitterPosts from "./getTwitterPosts";

type Posts = {
  id: string;
  rawDate: string;
  date: string;
  in: "x" | "tabnews";
  title: string;
  views: string;
  attachments: { width: number; height: number; url: string; type: string }[];
}[];

function toSimpleDate(dates: string) {
  const date = new Date(dates);
  const day = date.getDate();
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const year = date.getFullYear().toString().slice(-2);

  return `${day}/${month}/${year}`;
}

export default async function getPosts() {
  const posts: Posts = [];

  const tabnewsPosts = await getTabnewsPosts();

  tabnewsPosts.forEach((post) => {
    posts.push({
      id: post.slug,
      rawDate: post.created_at,
      date: toSimpleDate(post.created_at),
      in: "tabnews",
      title:
        (post.title as string).length > 80
          ? `${(post.title as string).slice(0, 80)}...`
          : (post.title as string),
      views: "--",
      attachments: [],
    });
  });

  try {
    const xPosts = await getTwitterPosts();

    xPosts.data.forEach((post) => {
      const attchaments: Posts[0]["attachments"] = [];

      post.attachments.media_keys.forEach((key) => {
        const media = xPosts.includes.media.find((m) => m.media_key === key);
        if (media) {
          attchaments.push({
            height: media.height,
            width: media.width,
            url: media.url,
            type: media.type,
          });
        }
      });

      posts.push({
        id: post.id,
        rawDate: post.created_at,
        date: toSimpleDate(post.created_at),
        in: "x",
        title:
          (post.text as string).length > 80
            ? `${(post.text as string).slice(0, 80)}...`
            : (post.text as string),
        views: post.public_metrics.impression_count.toString(),
        attachments: attchaments,
      });
    });
  } catch (error) {
    console.error(error);
  }

  posts.sort((a, b) => new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime());

  return posts;
}
