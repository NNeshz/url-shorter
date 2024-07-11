import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { shortLink } from "@/utils/shortLink";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { url } = await req.json();

    const user = await db.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (!url) {
      return NextResponse.json({ message: "URL is required" }, { status: 400 });
    }

    const shortUrl = shortLink();
    const newLink = await db.url.create({
      data: {
        originalUrl: url,
        shortUrl,
        user: {
          connect: {
            id: user.id,
          },
        },
      }
    })

    return NextResponse.json({ link: newLink });
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}
