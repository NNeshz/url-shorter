import UserLogged from "@/components/UserLogged";
import UserNotLogged from "@/components/UserNotLogged";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const Page = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex justify-center items-center h-screen">
      <section className="flex justify-center items-center px-8 md:px-20">
        {session ? <UserLogged /> : <UserNotLogged />}
      </section>
    </div>
  );
};

export default Page;
