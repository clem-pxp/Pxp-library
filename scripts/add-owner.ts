import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import * as schema from "../src/db/schema";

// Configuration - CHANGE CETTE VALEUR
const OWNER_EMAIL = "clem@pxperfect.studio"; // <- Mets ton email ici

async function addOwner() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql, { schema });

  console.log(`\n🔍 Looking for user with email: ${OWNER_EMAIL}\n`);

  // 1. Trouver l'utilisateur
  const user = await db.query.users.findFirst({
    where: eq(schema.users.email, OWNER_EMAIL),
  });

  if (!user) {
    console.log("❌ User not found!");
    console.log(
      "   Make sure you've signed in at least once before running this script.\n",
    );
    process.exit(1);
  }

  console.log(`✓ Found user: ${user.name || user.email} (id: ${user.id})\n`);

  // 2. Trouver la library
  const library = await db.query.libraries.findFirst();

  if (!library) {
    console.log("❌ No library found!");
    console.log("   Run 'bun run scripts/seed.ts' first.\n");
    process.exit(1);
  }

  console.log(`✓ Found library: ${library.name} (id: ${library.id})\n`);

  // 3. Vérifier si déjà membre
  const existingMembership = await db.query.libraryMembers.findFirst({
    where: eq(schema.libraryMembers.userId, user.id),
  });

  if (existingMembership) {
    console.log(
      `ℹ️  User is already a member with role: ${existingMembership.role}`,
    );

    if (existingMembership.role !== "OWNER") {
      // Upgrade to OWNER
      await db
        .update(schema.libraryMembers)
        .set({ role: "OWNER" })
        .where(eq(schema.libraryMembers.id, existingMembership.id));
      console.log("   → Upgraded to OWNER\n");
    } else {
      console.log("   → Already OWNER, nothing to do.\n");
    }
  } else {
    // Créer le membership
    await db.insert(schema.libraryMembers).values({
      id: nanoid(),
      userId: user.id,
      libraryId: library.id,
      role: "OWNER",
    });
    console.log("✅ Added as OWNER of the library!\n");
  }

  console.log("🎉 Done! You can now use the app.\n");
}

addOwner().catch((err) => {
  console.error("❌ Failed:", err);
  process.exit(1);
});
