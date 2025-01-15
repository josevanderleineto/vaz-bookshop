'use client';


import Footer from "./components/footer/page";
import Header from "./components/header/page";
import SalesPage from "./components/pages/sales/page";

export default function HomePage() {
  return (
    <div>
        <Header/>
      <main className="">
        <SalesPage/>
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
}