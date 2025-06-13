import aboutCount from "@/utils/aboutCount";
import { NextResponse } from "next/server";

export async function GET() {
  const views = await aboutCount();
  return NextResponse.json({ views });
}
