import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface ParamsProps {
    url: string
}

const Page = async ({ params } : { params: ParamsProps }) => {

    const { url } = params;

    const data = await db.url.findUnique({
        where: {
            shortUrl: url,
        }
    })

    if (!data) {
        redirect('/')
    }

    redirect(data.originalUrl)
}

export default Page;