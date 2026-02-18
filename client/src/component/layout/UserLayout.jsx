import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import HeroLayout from "./HeroLayout";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div>
      {/* {Header} */}
      <Header />
      {/* {Main components} */}
      <main>
        <Outlet/>
      </main>
      {/* {Footer} */}
      <Footer />
    </div>
  );
};

export default UserLayout;
