import { db } from "@/app/database/index.js";
import { NextResponse } from "next/server";
import { postsTable } from "@/app/database/schema.js";
import { eq } from 'drizzle-orm';

export async function GET(req, context) {
   const { params } = context
  try {
    if (!params?.id) {
      return NextResponse.json(
        { success: false, error: "Missing job ID" },
        { status: 400 }
      );
    }

    const post = await db.query.postsTable.findFirst({
      where: (post, { eq }) => eq(post.id, params.id),
      with: {
        author: true,
      },
    });

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Job not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: post });
  } catch (err) {
    console.error("Database Error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}