import React from "react";
import Header from "./header";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main style={{ marginTop: '64px', backgroundColor: '#f6f6f6', overflow: 'hidden' }} className="overflow-hidden">
        { children }
      </main>
      <Footer />
    </>
  )
}