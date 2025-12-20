# PXP Components Library

Bibliothèque de composants Webflow avec gestion multi-utilisateurs.

## Tech Stack

| Catégorie | Technologie |
|-----------|-------------|
| Runtime | Bun |
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + shadcn/ui |
| Animations | Motion (Framer Motion) |
| Auth | Better Auth |
| Database | PostgreSQL + Drizzle ORM |
| DB Hosting | Neon |
| Storage Images | Uploadthing |
| Storage Vidéos | Bunny |
| Code Editor | Monaco Editor |
| Code Display | Shiki |
| Rich Text | Tiptap |
| Search | Fuse.js + cmdk |
| Hosting | Vercel |

## Commands

```bash
bun install          # Install deps
bun dev              # Dev server (turbo)
bun build            # Production build
bun lint             # Run ESLint
bun db:push          # Push schema to DB
bun db:studio        # Drizzle Studio GUI
bun db:generate      # Generate migrations
bun db:migrate       # Run migrations
```

## Project Structure

```
app/
├── (auth)/              # Auth routes (login, invite)
├── (main)/              # Main app layout
│   ├── page.tsx         # Home - tous les composants
│   ├── category/[slug]/ # Composants par catégorie
│   ├── favorites/       # Composants favoris
│   └── components/
│       ├── [slug]/      # Détail composant
│       └── new/         # Création composant
├── settings/            # Pages settings
│   ├── preferences/
│   ├── profile/
│   ├── workspace/       # Admin+
│   ├── members/         # Admin+
│   ├── components/      # Admin+ bulk edit
│   └── categories/      # Admin+
└── api/                 # API routes
```

## Roles & Permissions

| Role | Level | Permissions |
|------|-------|-------------|
| OWNER | 4 | Tout (supprimer lib, transférer ownership) |
| ADMIN | 3 | Gérer membres, CRUD composants/catégories |
| BUILDER | 2 | Créer/éditer ses propres composants |
| VIEWER | 1 | Voir et copier uniquement |

```typescript
const ROLE_HIERARCHY: Record<Role, number> = {
  OWNER: 4,
  ADMIN: 3,
  BUILDER: 2,
  VIEWER: 1,
}

// Check permission
function hasPermission(userRole: Role, requiredRole: Role): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole]
}
```

## Key Patterns

### API Routes
- Valider avec Zod
- Vérifier auth + permissions server-side
- Retourner `{ data }` ou `{ error }`

### Components
- Server Components par défaut
- `'use client'` seulement si nécessaire (interactivité, hooks)
- Utiliser shadcn/ui components

### Database
- IDs: utiliser `nanoid()` ou `crypto.randomUUID()`
- Timestamps: toujours `createdAt` et `updatedAt`
- Relations: cascade delete pour les dépendances

### Code Style
- Prefer named exports
- Use absolute imports `@/`
- Error handling: try/catch avec messages explicites

## Don'ts

- Ne pas bypass l'auth
- Ne pas utiliser `any`
- Ne pas commit `.env`
- Ne pas skip error handling
- Ne pas créer de composants sans catégorie
- Ne pas permettre de supprimer la dernière catégorie
