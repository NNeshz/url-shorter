import SignInForm from "@/components/form/SingInForm";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const Page = () => {
  return (
    <div className="min-h-screen w-full">
      <MaxWidthWrapper className="h-screen flex justify-center items-center">
        <SignInForm />
      </MaxWidthWrapper>
    </div>
  );
};

export default Page;
