import { db } from "@/app/database/index.js";
import { NextResponse } from "next/server";
import { jobsTable } from "@/app/database/schema.js";
import { desc, eq } from 'drizzle-orm';

export async function GET(req, context) {
   const { params } = context
  try {
    if (!params?.category) {
      return NextResponse.json(
        { success: false, error: "Missing category" },
        { status: 400 }
      );
    }

    const jobs = await db.query.jobsTable.findMany({
      where: (job, { eq }) => eq(job.category, params.category),
      with: {
        user: true,
      },
      orderBy: (jobs) => desc(jobs.createdAt)
    });

    if (!jobs) {
      return NextResponse.json(
        { success: false, error: "Jobs not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: jobs });
  } catch (err) {
    console.error("Database Error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}