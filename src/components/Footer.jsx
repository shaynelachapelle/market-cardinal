import React from "react";

function Footer() {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <div className="flex flex-col justify-between bg-black h-70 px-6 py-4 pb-12 gap-6">
      <div>
        <h1 className="font-heading text-white text-3xl font-bold">
          Market Cardinal
        </h1>
      </div>
      <div className="flex flex-row items-center text-white gap-20">
        <div className="flex flex-col text-sm gap-2">
          <h3 className="text-base pb-1">Company</h3>
          <a
            className="w-fit border-b border-transparent hover:border-white duration-200"
            href="#"
          >
            Test Item
          </a>
          <a
            className="w-fit border-b border-transparent hover:border-white duration-200"
            href="#"
          >
            Test Item
          </a>
          <a
            className="w-fit border-b border-transparent hover:border-white duration-200"
            href="#"
          >
            Test Item
          </a>
        </div>
        <div className="flex flex-col text-sm gap-2">
          <h3 className="text-base pb-1">Help</h3>
          <a
            className="w-fit border-b border-transparent hover:border-white duration-200"
            href="#"
          >
            Test Item
          </a>
          <a
            className="w-fit border-b border-transparent hover:border-white duration-200"
            href="#"
          >
            Test Item
          </a>
          <a
            className="w-fit border-b border-transparent hover:border-white duration-200"
            href="#"
          >
            Test Item
          </a>
        </div>
        <div className="flex flex-col text-sm gap-2">
          <h3 className="text-base pb-1">Tools</h3>
          <a
            className="w-fit border-b border-transparent hover:border-white duration-200"
            href="#"
          >
            Test Item
          </a>
          <a
            className="w-fit border-b border-transparent hover:border-white duration-200"
            href="#"
          >
            Test Item
          </a>
          <a
            className="w-fit border-b border-transparent hover:border-white duration-200"
            href="#"
          >
            Test Item
          </a>
        </div>
      </div>
      <div className="flex flex-row items-center text-white text-xs">
        <p>©{year} Market Cardinal Copyright All Rights Reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
