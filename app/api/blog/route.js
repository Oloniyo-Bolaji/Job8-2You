import { db } from "@/app/database/index.js";
import { postsTable, usersTable } from "@/app/database/schema.js";
import { NextResponse } from "next/server";
import { eq } from 'drizzle-orm';



export async function GET() {
  try {
     const postsWithUsers = await db.query.postsTable.findMany({
     with: {
      author: true,
      },
    });
    return NextResponse.json({ success: true, data: postsWithUsers });
  } catch (err) {
    console.error("Database Error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}