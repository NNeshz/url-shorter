import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function DELETE(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        const user = await db.user.findUnique({
            where: {
                email: session.user.email,
            }
        });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const { id } = await req.json();
        const link = await db.url.findUnique({
            where: {
                id,
            }
        });
        if (!link) {
            return NextResponse.json({ message: "Link not found" }, { status: 404 });
        }

        if (link.userId !== user.id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await db.url.delete({
            where: {
                id,
            }
        });

        return NextResponse.json({ message: "Link deleted" });
    } catch (error) {
        return NextResponse.json({ message: (error as Error).message }, { status: 500 });
    }
}