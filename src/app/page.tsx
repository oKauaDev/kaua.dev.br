import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TableLoading from "./components/TableLoading";
import { Suspense } from "react";
import MyTable from "./components/MyTable";

export const revalidate = 60 * 60;

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="mt-20 min-h-[36vh] max-md:min-h-[50vh]">
        <Suspense fallback={<TableLoading />}>
          <MyTable />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
