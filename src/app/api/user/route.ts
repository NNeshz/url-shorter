import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";

const registrationSchema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  username: z.string().min(3).max(25, {
    message: "Username must be between 3 and 25 characters long",
  }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { password, username } = registrationSchema.parse(body);

    // Check if username already exists
    const existingUsername = await db.user.findUnique({
      where: {
        username,
      },
    });
    if (existingUsername) {
      return NextResponse.json(
        { user: null, message: "User is already picked." },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { user: null, message: "An error occurred" },
      { status: 500 }
    );
  }
}
