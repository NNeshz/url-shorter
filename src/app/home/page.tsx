import FormLink from "@/components/form/FormLink";
import ListLinks from "@/components/ListLinks";
import NotAuthorized from "@/components/NotAuthorized";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <NotAuthorized />
    );
  }

  return <div className="w-full h-screen flex flex-col justify-center items-center gap-y-2">
    <h1 className="text-5xl font-bold">Short Link</h1>
    <FormLink userMail={session?.user.email!} /> 
    <ListLinks />
  </div>;
};

export default Page;
