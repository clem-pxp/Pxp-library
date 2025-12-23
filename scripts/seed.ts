import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { nanoid } from "nanoid";
import * as schema from "../src/db/schema";

// Configuration
const LIBRARY_NAME = "PxP Components";

async function seed() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql, { schema });

  console.log("🌱 Seeding database...\n");

  // 1. Créer la library
  const libraryId = nanoid();
  const librarySlug = "pxp-components";

  console.log("📚 Creating library...");
  await db.insert(schema.libraries).values({
    id: libraryId,
    name: LIBRARY_NAME,
    slug: librarySlug,
  });
  console.log(`   ✓ Library "${LIBRARY_NAME}" created (id: ${libraryId})\n`);

  // 2. Créer les catégories par défaut
  console.log("📁 Creating default categories...");
  const defaultCategories = [
    { name: "Utilities & Scripts", slug: "utilities-scripts", icon: "code" },
    { name: "Scroll Animations", slug: "scroll-animations", icon: "scroll" },
    { name: "Buttons", slug: "buttons", icon: "pointer" },
    { name: "Forms", slug: "forms", icon: "form" },
    { name: "Navigation", slug: "navigation", icon: "menu" },
  ];

  for (let i = 0; i < defaultCategories.length; i++) {
    const cat = defaultCategories[i];
    await db.insert(schema.categories).values({
      id: nanoid(),
      name: cat.name,
      slug: cat.slug,
      icon: cat.icon,
      order: i,
      libraryId: libraryId,
    });
    console.log(`   ✓ Category "${cat.name}" created`);
  }

  console.log("\n✅ Seed completed!");
  console.log("\n📌 Next steps:");
  console.log("   1. Start the app: bun dev");
  console.log("   2. Go to /login and sign in with Google or email/password");
  console.log(`   3. Run: bun run scripts/add-owner.ts`);
  console.log("      (This will add you as OWNER of the library)\n");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
