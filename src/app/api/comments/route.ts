import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    console.log("Form data: ", formData);
    const userId = Number(formData.get("userId"));
    const postId = Number(formData.get("postId"));
    const content = formData.get("content")?.toString();

    if (isNaN(userId) || isNaN(postId)) {
      throw new Error(
        "Invalid Request: userId and postId must be valid numbers."
      );
    }

    if (content?.trim() === "" || !content) {
      throw new Error("Invalid Request: Comment content must not be empty.");
    }

    const newComment = await prisma.comment.create({
      data: {
        content: content,
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

    const comment = await prisma.comment.findUnique({
      where: {
        id: newComment.id,
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json({ success: true, comment });
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
    const id = Number(formData.get("id"));

    if (isNaN(id)) {
      throw new Error("Invalid Request: Insufficient data.");
    }

    await prisma.comment.delete({
      where: {
        id,
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
