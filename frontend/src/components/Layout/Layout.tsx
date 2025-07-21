import React, { type ReactNode } from "react";
import Header from "../Header";
import Footer from "../Footer";
import ToastContainer from "../Toast/ToastContainer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="font-inter antialiased">
      <Header />
      <ToastContainer />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
