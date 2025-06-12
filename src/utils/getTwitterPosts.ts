interface Response {
  data: {
    attachments: {
      media_keys: string[];
    };
    edit_history_tweet_ids: string[];
    text: string;
    created_at: string;
    public_metrics: {
      retweet_count: number;
      reply_count: number;
      like_count: number;
      quote_count: number;
      bookmark_count: number;
      impression_count: number;
    };
    id: string;
  }[];
  includes: {
    media: {
      media_key: string;
      type: "photo";
      url: string;
      width: number;
      height: number;
    }[];
  };
  meta: {
    result_count: number;
    newest_id: string;
    oldest_id: string;
  };
}

export default async function getTwitterPosts() {
  const res = await fetch(
    "https://api.twitter.com/2/users/1366763978844741638/tweets?tweet.fields=attachments,text,source,public_metrics,created_at&expansions=attachments.media_keys&media.fields=url,width,height,preview_image_url",
    {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
      next: { revalidate: 43200 },
    }
  );

  if (!res.ok) {
    throw new Error("Error when getting X posts");
  }

  const json = (await res.json()) as Response;

  return json;
}
