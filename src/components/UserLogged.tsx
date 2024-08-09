import React from "react";
import FormLink from "./form/FormLink";
import MaxWidthWrapper from "./MaxWidthWrapper";

const UserLogged = () => {
  return (
    <div className="flex justify-center items-center">
      <MaxWidthWrapper className="flex flex-col items-center justify-center gap-y-2">
        <h1 className="text-4xl font-extrabold text-center bg-[radial-gradient(circle,#db2777_0%,#2563eb_100%)] bg-clip-text text-transparent">
          Shorten Your Looooong Links :)
        </h1>
        <p className="text-pretty text-center text-white/80">
          Linkly is an efficient and easy-to-use URL shortening service that
          streamlines your online experience.
        </p>
        <FormLink isLogged={true} />
      </MaxWidthWrapper>
    </div>
  );
};

export default UserLogged;
