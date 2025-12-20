import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  json,
  pgEnum,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// Enums
export const roleEnum = pgEnum("role", ["OWNER", "ADMIN", "BUILDER", "VIEWER"]);

// Users
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  username: text("username").unique(),
  avatarUrl: text("avatar_url"),
  emailVerified: boolean("email_verified").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Sessions (Better Auth)
export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Accounts (Better Auth - OAuth)
export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  idToken: text("id_token"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Verifications (Better Auth)
export const verifications = pgTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Library (Workspace)
export const libraries = pgTable("libraries", {
  id: text("id").primaryKey(),
  name: text("name").notNull().default("My Library"),
  slug: text("slug").notNull().unique(),
  logoUrl: text("logo_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Library Members
export const libraryMembers = pgTable(
  "library_members",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    libraryId: text("library_id")
      .notNull()
      .references(() => libraries.id, { onDelete: "cascade" }),
    role: roleEnum("role").notNull().default("VIEWER"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("library_members_user_library_idx").on(
      table.userId,
      table.libraryId,
    ),
  ],
);

// Library Invites
export const libraryInvites = pgTable("library_invites", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  role: roleEnum("role").notNull().default("VIEWER"),
  token: text("token").notNull().unique(),
  libraryId: text("library_id")
    .notNull()
    .references(() => libraries.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at").notNull(),
  usedAt: timestamp("used_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Categories
export const categories = pgTable(
  "categories",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    color: text("color").notNull().default("#6366f1"),
    icon: text("icon"),
    order: integer("order").notNull().default(0),
    libraryId: text("library_id")
      .notNull()
      .references(() => libraries.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("categories_library_slug_idx").on(table.libraryId, table.slug),
  ],
);

// Component Attribute Type
export type ComponentAttribute = {
  name: string;
  value: string;
  element: string;
  required: boolean;
  description: string;
};

// Components
export const components = pgTable(
  "components",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),

    // Media
    thumbnailUrl: text("thumbnail_url"),
    videoUrl: text("video_url"),
    previewUrl: text("preview_url"),

    // Content
    description: json("description").$type<Record<string, unknown>>(),

    // Code
    headCode: text("head_code"),
    webflowJson: json("webflow_json").$type<Record<string, unknown>>(),
    jsCode: text("js_code"),
    cssCode: text("css_code"),

    // Attributes
    attributes: json("attributes").$type<ComponentAttribute[]>(),

    // Meta
    isPublished: boolean("is_published").notNull().default(false),

    // Relations
    libraryId: text("library_id")
      .notNull()
      .references(() => libraries.id, { onDelete: "cascade" }),
    categoryId: text("category_id")
      .notNull()
      .references(() => categories.id),
    createdById: text("created_by_id")
      .notNull()
      .references(() => users.id),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("components_library_slug_idx").on(table.libraryId, table.slug),
  ],
);

// Favorites
export const favorites = pgTable(
  "favorites",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    componentId: text("component_id")
      .notNull()
      .references(() => components.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("favorites_user_component_idx").on(
      table.userId,
      table.componentId,
    ),
  ],
);

// Types exports
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Library = typeof libraries.$inferSelect;
export type NewLibrary = typeof libraries.$inferInsert;
export type LibraryMember = typeof libraryMembers.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Component = typeof components.$inferSelect;
export type NewComponent = typeof components.$inferInsert;
export type Favorite = typeof favorites.$inferSelect;
export type Role = "OWNER" | "ADMIN" | "BUILDER" | "VIEWER";
