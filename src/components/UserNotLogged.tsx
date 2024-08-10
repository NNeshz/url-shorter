import MaxWidthWrapper from "./MaxWidthWrapper";
import FormLink from "./form/FormLink";

const UserNotLogged = () => {
  return (
    <div className="flex justify-center items-center">
      <MaxWidthWrapper className="flex flex-col items-center justify-center gap-y-2">
        <h1 className="text-4xl font-extrabold text-center bg-[radial-gradient(circle,#6fffe9_0%,#1c2541_100%)] bg-clip-text text-transparent">
          Shorten Your Looooong Links :)
        </h1>
        <p className="text-pretty text-center text-white/80">
          Linkly is an efficient and easy-to-use URL shortening service that
          streamlines your online experience.
        </p>
        <FormLink isLogged={false} />
      </MaxWidthWrapper>
    </div>
  );
};

export default UserNotLogged;
