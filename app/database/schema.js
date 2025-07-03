import {
  integer,
  uuid,
  pgTable,
  varchar,
  text,
  pgEnum,
  jsonb,
  date,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// USERS TABLE
export const usersTable = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  image: text('image'),
  role: text('role').default("employee"),
  headline: varchar('headline', { length: 255 }),
  skills: jsonb("skills"),
  bio: text('bio'),
  dateOfBirth: date('date_of_birth'),
  resumeURL: text('resume_url'),
  companylocation: text('companylocation'),
  year: text('year'),
  description: text('description'),
  contactEmail: text('contactEmail'),
  websiteUrl: text('websiteUrl'),
  address: text('address'),
  linkedIn: text('linkedIn'),
  x: text('x'),
  instagram: text('instagram'),
  profileViews: integer('profile_views').default(0),
  createdAt: timestamp('created_at').defaultNow(),
})

// JOBS TABLE
export const jobsTable = pgTable('job', {
  id: uuid('job_id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  category: varchar('category', { length: 255 }).notNull(),
  company: varchar('company', { length: 255 }).notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  roleType: varchar('role_type', { length: 255 }).notNull(),
  description: text('description').notNull(),
  requirements: jsonb('requirements').notNull(),
  salary: varchar('salary', { length: 255 }).notNull(),
  jobLink: varchar('job_link', { length: 255 }).notNull(),
  clickCount: integer('click_count').default(0),
  deadline: date('deadline').notNull(),
  bookmarkCount: integer('bookmark_count').default(0),
  applicationCount: integer('application_count').default(0),
  userId: uuid('user_id')
    .references(() => usersTable.id, { onDelete: 'cascade' })
    .notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

// BOOKMARKS TABLE (many-to-many: users <-> jobs)
export const bookmarksTable = pgTable('bookmarks', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .references(() => usersTable.id)
    .notNull(),
  jobId: uuid('job_id')
    .references(() => jobsTable.id, { onDelete: 'cascade' })
    .notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const applicationsTable = pgTable('applications', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id),
  jobId: uuid('job_id')
    .notNull()
    .references(() => jobsTable.id, { onDelete: 'cascade' }),
  resume: text('resume').notNull(),
  status: varchar('status', { length: 50 }).default('Pending'),
  appliedAt: timestamp('applied_at').defaultNow(),
})

// RELATIONS

export const usersRelations = relations(usersTable, ({ many }) => ({
  jobs: many(jobsTable),
  bookmarks: many(bookmarksTable),
  applications: many(applicationsTable),
}))

export const jobsRelations = relations(jobsTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [jobsTable.userId],
    references: [usersTable.id],
  }),
  bookmarks: many(bookmarksTable),
  applications: many(applicationsTable),
}))

export const bookmarksRelations = relations(bookmarksTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [bookmarksTable.userId],
    references: [usersTable.id],
  }),
  job: one(jobsTable, {
    fields: [bookmarksTable.jobId],
    references: [jobsTable.id],
  }),
}))

export const applicationsRelations = relations(applicationsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [applicationsTable.userId],
    references: [usersTable.id],
  }),
  job: one(jobsTable, {
    fields: [applicationsTable.jobId],
    references: [jobsTable.id],
  }),
}))
