import React from 'react';
import {useNavigate} from "react-router";
import Dropdown from "./Dropdown";

const NavItem = ({ title, url }) => {
  let navigate = useNavigate();

  const onClick = () => {
    navigate(url)
  }

  return (
    <div
      onClick={onClick}
      className="text-gray-500 hover:text-gray-700 cursor-pointer mx-4 font-medium">
      {title}
    </div>
  );
};

const Navbar = () => {

  return (
    <div className="bg-white flex items-center justify-between border-b shadow-lg py-5 px-5 lg:px-20">
      <div className="flex flex-1 items-center">
        <div className="text-2xl mr-5">
          <span className="text-indigo-500">FITNESS</span>
          <span className="text-orange-500 font-semibold">APP</span>
        </div>
        <div className="hidden md:block">
          <div className="flex items-center">
            <NavItem title="Categories" url="/" />
            <NavItem title="Plans" url="/plans" />
            <NavItem title="Influencers" url="/influencers" />
          </div>
        </div>
      </div>
      <Dropdown />
    </div>
  );
};

export default Navbar;