import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import React, { Suspense } from "react";
import PostLoading from "./PostLoading";
import PostViewer from "./PostViewer";

export const revalidate = 60 * 60 * 3;

export default async function XPostPage({ params }: { params: { id: string } }) {
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
