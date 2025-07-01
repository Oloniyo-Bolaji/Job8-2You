import { db } from '@/app/database/index.js';
import { jobsTable, usersTable, applicationsTable } from '@/app/database/schema.js';
import { NextResponse } from 'next/server';
import { eq, inArray, desc } from 'drizzle-orm';

export async function GET(req, context) {
   const { params } = context
  try {
    const userId = params.id;

    if (!userId) {
      return NextResponse.json({ success: false, error: 'Missing user ID' }, { status: 400 });
    }

    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId))
      .then((res) => res[0]);

    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    // EMPLOYER: Fetch applications for their jobs
    if (user.role === 'employer') {
      const jobs = await db.select().from(jobsTable).where(eq(jobsTable.userId, userId));
      const jobIds = jobs.map((job) => job.id);

      if (jobIds.length === 0) {
        return NextResponse.json({ success: true, data: [] });
      }

      const applications = await db.query.applicationsTable.findMany({
        where: (applications, { inArray }) => inArray(applications.jobId, jobIds),
        with: {
          job: true,
          user: true,
        },
        orderBy: (applications) => desc(applications.appliedAt),
      });

      return NextResponse.json({ success: true, data: applications });
    }

    // EMPLOYEE: Fetch applications submitted by the user
    if (user.role === 'employee') {
      const applications = await db.query.applicationsTable.findMany({
        where: (applications) => eq(applications.userId, userId),
        with: {
          job: true,
          user: true,
        },
        orderBy: (applications) => desc(applications.appliedAt),
      });

      return NextResponse.json({ success: true, data: applications });
    }

    // Role not supported
    return NextResponse.json({
      success: false,
      error: 'Invalid user role',
    }, { status: 403 });

  } catch (err) {
    console.error('Database Error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
