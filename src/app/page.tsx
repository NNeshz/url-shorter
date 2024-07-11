import FormLink from "@/components/form/FormLink";
import ListLinks from "@/components/ListLinks";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const Page = async () => {
  const session = await getServerSession(authOptions);

  const isLogged = session ? true : false;

  return <div className="w-full h-[86vh] md:h-screen flex flex-col justify-center items-center gap-y-2">
    <h1 className="text-5xl font-bold">Short Link</h1>
    <FormLink isLogged={isLogged} /> 
    <ListLinks />
  </div>;
};

export default Page;
