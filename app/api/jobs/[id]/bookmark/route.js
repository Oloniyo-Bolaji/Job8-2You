import { db } from "@/app/database";
import { jobsTable, bookmarksTable } from "@/app/database/schema";
import { eq, and, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req, context) {
   const { params } = context
  try {
    const jobId = params?.id;
    const { userId } = await req.json();

    if (!jobId || !userId) {
      return NextResponse.json(
        { success: false, error: "Missing job ID or user ID" },
        { status: 400 }
      );
    }

    // Check if bookmarked
    const existing = await db
      .select()
      .from(bookmarksTable)
      .where(and(eq(bookmarksTable.userId, userId), eq(bookmarksTable.jobId, jobId)));

    let action = "";

    if (existing.length === 0) {
      // Not bookmarked: insert and increment
      await db.insert(bookmarksTable).values({ userId, jobId });
      await db
        .update(jobsTable)
        .set({
          bookmarkCount: sql`${jobsTable.bookmarkCount} + 1`,
        })
        .where(eq(jobsTable.id, jobId));

      action = "bookmarked";
    } else {
      // Already bookmarked: delete and decrement
      await db
        .delete(bookmarksTable)
        .where(and(eq(bookmarksTable.userId, userId), eq(bookmarksTable.jobId, jobId)));

      await db
        .update(jobsTable)
        .set({
          bookmarkCount: sql`${jobsTable.bookmarkCount} - 1`,
        })
        .where(eq(jobsTable.id, jobId));

      action = "unbookmarked";
    }

    return NextResponse.json({
      success: true,
      action,
    });

  } catch (err) {
    console.error("Database Error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}