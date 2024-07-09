import SignUpForm from "@/components/form/SignUpForm";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const Page = () => {
  return (
    <div className="w-full">
      <MaxWidthWrapper className="h-screen flex justify-center items-center">
        <SignUpForm />
      </MaxWidthWrapper>
    </div>
  );
};

export default Page;
