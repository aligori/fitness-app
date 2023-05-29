import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white">
      <div className="relative items-center h-16 lg:h-20 shadow flex">
        <div className="hidden lg:flex w-full justify-end">
          <div className="flex mr-6" />
        </div>
      </div>
      <div
        onClick={() => setOpen(!open)}
        className="flex-1 text-2xl absolute right-8 top-6 cursor-pointer lg:hidden text-indigo-900 z-40">
        {open ? <FaTimes classname="sticky" /> : <FaBars />}
      </div>
    </nav>
  );
};

export default Header;
