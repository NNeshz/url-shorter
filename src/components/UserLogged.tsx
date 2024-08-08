import React from "react";
import FormLink from "./form/FormLink";
import DisplayLinks from "./DisplayLinks";

const UserLogged = () => {
  return (
    <div className="flex flex-col items-center gap-y-2 text-white backdrop-filter backdrop-blur-sm bg-opacity-10 border border-white/10 md:px-0 py-8 rounded-md">
      <h1 className="text-6xl font-semibold text-center">Short URL</h1>
      <p className="text-center text-sm md:px-4 lg:px-10 break-keep">
        Copy and paste your long URL into the input field and click submit
      </p>
      <FormLink />
      <DisplayLinks />
    </div>
  );
};

export default UserLogged;
