import SignInForm from "@/components/form/SingInForm";

const Page = () => {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 h-screen"
      style={{
        backgroundImage: `url('/assets/wallpaper.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <section className="flex justify-center items-center px-8 md:px-20">
        <SignInForm />
      </section>
      <section className="hidden md:block bg-zinc-950"></section>
    </div>
  );
};

export default Page;
