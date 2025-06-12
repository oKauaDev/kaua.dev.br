import { createClient } from "redis";

const redis = await createClient().connect();

export default async function aboutCount() {
  const result = await redis.get("item");
  await redis.set("item", String((Number(result) || 0) + 1));
  return (Number(result) || 0) + 1;
}
