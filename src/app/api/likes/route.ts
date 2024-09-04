import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    console.log("Form data: ", formData);
    const userId = Number(formData.get("userId"));
    const postId = Number(formData.get("postId"));

    if (isNaN(userId) || isNaN(postId)) {
      throw new Error(
        "Invalid Request: userId and postId must be valid numbers."
      );
    }

    await prisma.likes.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        post: {
          connect: {
            id: postId,
          },
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ success: false, error: err.message }),
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const formData = await req.formData();
    const userId = Number(formData.get("userId"));
    const postId = Number(formData.get("postId"));

    if (!userId || !postId) {
      throw new Error("Invalid Request: Insufficient data.");
    }

    await prisma.likes.deleteMany({
      where: {
        userId,
        postId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ success: false, error: err.message }),
      {
        status: 500,
      }
    );
  }
}
