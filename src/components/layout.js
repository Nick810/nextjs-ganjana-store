import React from "react";
import Header from "./header";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <>
      <Header />
        <main className="overflow-hidden mt-16" style={{ backgroundColor: '#f6f6f6'}}>
          { children }
        </main>
      <Footer />
    </>
  )
}
