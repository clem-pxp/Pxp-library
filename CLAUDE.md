# PXP Components Library

Bibliothèque de composants Webflow avec gestion multi-utilisateurs.

> **Plan du projet** : Voir [PROJECT_PLAN.md](./PROJECT_PLAN.md) pour les specs complètes et les phases de développement.

## Règles de développement

**IMPORTANT**: Toujours mettre à jour PROJECT_PLAN.md au fur et à mesure de l'avancement:
- Cocher les tâches complétées `[x]`
- Mettre à jour le "Statut actuel" en haut de la section Phases
- Documenter les décisions prises (ex: features reportées)
- Ajouter des notes si le scope change

## Tech Stack

| Catégorie | Technologie |
|-----------|-------------|
| Runtime | Bun |
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + Coss UI (Base UI) |
| Animations | Motion (Framer Motion) |
| Auth | Better Auth |
| Database | PostgreSQL + Drizzle ORM |
| DB Hosting | Neon |
| Storage | Bunny.net (images + vidéos) |
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

### Performance (Linear-like)

L'app utilise une architecture optimisée pour des navigations instantanées :

1. **TanStack Query** pour le caching client-side
   - Données cachées pendant 5-10 minutes
   - Navigation instantanée depuis le cache
   - Refetch en background

2. **AppLoader** charge les données au démarrage
   - `currentUser` et `categories` préchargés
   - Premier load ~1-2s, navigations suivantes ~15ms

3. **Middleware léger** avec `getSessionCookie`
   - Vérifie le cookie de session (synchrone)
   - Pas d'appel HTTP/DB dans le middleware

4. **Fonctions cachées** avec `React.cache()`
   - `getCurrentUser()` et `getCategories()` wrappés
   - Une seule requête DB par render

```typescript
// Utiliser les hooks client pour les données
import { useCurrentUser, useCategories } from "@/lib/hooks";

// Pour les permissions client-side
import { hasPermission } from "@/lib/permissions";
```

### API Routes
- Valider avec Zod
- Vérifier auth + permissions server-side
- Retourner `{ data }` ou `{ error }`

### Components

#### Architecture

```
components/
├── index.ts              # Barrel export principal
├── ui/                   # Primitives Coss UI (Button, Input, Dialog...)
│   └── search-input.tsx  # Composants UI custom basés sur Coss UI
├── icons/                # Icônes SVG custom
│   └── index.ts          # Export toutes les icônes
├── illustrations/        # SVG illustrations (thèmes, empty states)
│   └── index.ts
├── layout/               # Composants de structure (Header, Sidebar, Shell)
│   └── index.ts
├── providers/            # React Context providers
│   └── index.ts
├── shared/               # Composants utilitaires réutilisables
│   └── index.ts
└── features/             # Composants métier par domaine
    └── categories/       # Ex: CategoriesList, CategoryModal
        └── index.ts
```

#### Conventions

| Dossier | Usage | Exemple |
|---------|-------|---------|
| `ui/` | Primitives UI réutilisables partout | `Button`, `SearchInput` |
| `icons/` | Icônes SVG custom (pas Lucide) | `Search`, `Settings` |
| `layout/` | Structure de page, navigation | `Header`, `Sidebar` |
| `features/` | Composants liés à un domaine métier | `CategoriesList` |
| `shared/` | Utilitaires cross-domain | `ThemeToggle` |

#### Règles

1. **Barrel exports obligatoires** - Chaque dossier a un `index.ts`
2. **Imports depuis index** - `import { Search, Heart } from "@/components/icons"`
3. **Pages = minimalistes** - La logique métier dans `features/`, pas dans `app/`
4. **Coss UI first** - Toujours utiliser Coss UI (basé sur Base UI) si le composant existe
5. **Composer plutôt que créer** - Étendre Coss UI plutôt que from scratch

```typescript
// ✅ Bon
import { Search, Settings, Heart } from "@/components/icons";
import { CategoriesList } from "@/components/features/categories";

// ❌ Mauvais
import { Search } from "@/components/icons/Search";
```

### Database
- IDs: utiliser `nanoid()` ou `crypto.randomUUID()`
- Timestamps: toujours `createdAt` et `updatedAt`
- Relations: cascade delete pour les dépendances
- Utiliser `sql\`count(*)\`` au lieu de charger toutes les relations

### Code Style
- Prefer named exports
- Use absolute imports `@/`
- Error handling: try/catch avec messages explicites

### Responsive Design
- **Mobile** = `< lg` breakpoint (< 1024px) - utilise `useIsDesktop()` hook
- **Desktop** = `>= lg` breakpoint (>= 1024px)

## Don'ts

- Ne pas bypass l'auth
- Ne pas utiliser `any`
- Ne pas commit `.env`
- Ne pas skip error handling
- Ne pas créer de composants sans catégorie
- Ne pas permettre de supprimer la dernière catégorie
