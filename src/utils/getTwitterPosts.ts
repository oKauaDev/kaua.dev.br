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
  // Check if the Twitter Bearer Token is available
  if (!process.env.TWITTER_BEARER_TOKEN) {
    console.warn("TWITTER_BEARER_TOKEN is not set, skipping Twitter posts");
    return null;
  }

  try {
    const res = await fetch(
      "https://api.twitter.com/2/users/1366763978844741638/tweets?tweet.fields=attachments,text,source,public_metrics,created_at&expansions=attachments.media_keys&media.fields=url,width,height,preview_image_url",
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        },
        next: { revalidate: 43200 },
      }
    );

    console.warn(res);

    if (!res.ok) {
      console.error(`Twitter API error: ${res.status} ${res.statusText}`);
      return null;
    }

    // Check if response is JSON
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error("Twitter API returned non-JSON response");
      return null;
    }

    const json = (await res.json()) as Response;
    return json;
  } catch (error) {
    console.error("Error fetching Twitter posts:", error);
    return null;
  }
}
