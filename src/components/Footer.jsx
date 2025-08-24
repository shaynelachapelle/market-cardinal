import React from "react";

function Footer() {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <div className="flex flex-col justify-between bg-black h-70 px-6 py-4 pb-12 gap-6">
      <div>
        <h2 className="font-heading text-white text-2xl font-bold">
          Market Cardinal
        </h2>
      </div>
      <div className="flex flex-row items-center text-text gap-20">
        <div className="flex flex-col text-sm gap-2 text-text-muted">
          <h3 className="text-base pb-1">Data Sources</h3>
          <a
            className="w-fit border-b border-transparent hover:border-border duration-200"
            href="#"
          >
            Market Data
          </a>
          <a
            className="w-fit border-b border-transparent hover:border-border duration-200"
            href="#"
          >
            Company Info
          </a>
          <a
            className="w-fit border-b border-transparent hover:border-border duration-200"
            href="#"
          >
            News Articles
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-4 text-text-muted text-xs">
        <a href="https://logo.dev">Logos provided by Logo.dev</a>
        <p>©{year} Market Cardinal, Copyright All Rights Reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
