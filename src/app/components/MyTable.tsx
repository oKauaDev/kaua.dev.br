"use client";

import React from "react";
import Link from "next/link";
import getPosts, { Posts } from "@/utils/getPosts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import X from "@/components/icons/X";
import Tabnews from "@/components/icons/Tabnews";
import formatNumber from "@/utils/formatNumber";
import { useTranslations } from "next-intl";
import getTabnewsPosts from "@/utils/getTabnewsPosts";

export default function MyTable() {
  const t = useTranslations("HomePage");
  const [exec, setExec] = React.useState(false);
  const [posts, setPosts] = React.useState<Posts>([]);

  React.useEffect(() => {
    const fetchPosts = async () => {
      setExec(true);
      const tabnewsPosts = await getTabnewsPosts();
      const data = await getPosts(tabnewsPosts);
      setPosts(data);
    };

    if (!exec) fetchPosts();
  }, [exec]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px] text-sm text-neutral-700 font-normal leading-4 dark:text-neutral-400">
            {t("table_date")}
          </TableHead>
          <TableHead className="w-[16px] text-sm text-neutral-700 font-normal leading-4 dark:text-neutral-400">
            {t("table_in")}
          </TableHead>
          <TableHead className="text-sm text-neutral-700 font-normal leading-4 dark:text-neutral-400">
            {t("table_title")}
          </TableHead>
          <TableHead className="w-[40px] text-sm text-neutral-700 font-normal leading-4 dark:text-neutral-400  text-right">
            {t("table_views")}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell colSpan={4} className="p-0">
              <Link
                href={`/${post.in}/${post.id}`}
                className="flex items-center gap-4 px-4 py-3 hover:bg-muted transition-colors"
              >
                <span className="w-[60px] text-sm text-neutral-800 dark:text-neutral-200 font-normal">
                  {post.date}
                </span>
                <span className="flex items-center justify-centertext-sm text-neutral-800 dark:text-neutral-200 font-normal">
                  {post.in === "x" ? <X /> : <Tabnews />}
                </span>
                <span className="flex-1 text-sm text-neutral-800 dark:text-neutral-200 font-normal">
                  {post.title}
                </span>
                <span className="w-[40px] text-sm text-neutral-800 dark:text-neutral-200 font-normal text-right">
                  {isNaN(Number(post.views)) ? post.views : formatNumber(Number(post.views))}
                </span>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
