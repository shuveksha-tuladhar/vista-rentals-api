import React, { type ReactNode } from "react";
import Header from "../Header";
import Footer from "../Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="font-inter antialiased">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
