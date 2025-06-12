import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import React, { Suspense } from "react";
import PostLoading from "./PostLoading";
import PostViewer from "./PostViewer";

export const revalidate = 10800;

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function XPostPage({ params }: PageProps) {
  return (
    <>
      <Navbar />
      <Suspense fallback={<PostLoading />}>
        <PostViewer params={params} />
      </Suspense>
      <Footer />
    </>
  );
}
