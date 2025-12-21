# PXP Components Library — Project Plan v4

> Bibliothèque de composants Webflow interne avec gestion multi-utilisateurs.
> Ce document sert de guide complet pour Claude Code.

---

## Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Architecture & Stack](#architecture--stack)
3. [Navigation & Structure](#navigation--structure)
4. [Features détaillées](#features-détaillées)
5. [Modèle de données](#modèle-de-données)
6. [Pages & Routes](#pages--routes)
7. [Flows utilisateur](#flows-utilisateur)
8. [Design Figma](#design-figma)
9. [Phases de développement](#phases-de-développement)
10. [Configuration Claude Code](#configuration-claude-code)

---

## Vue d'ensemble

### Objectif

Créer une plateforme type "shadcn pour Webflow" permettant de :

- **Stocker** des composants Webflow réutilisables avec leur code
- **Documenter** chaque composant (vidéo, preview, attributs, instructions)
- **Copier** le JSON Webflow en un clic pour coller dans Webflow
- **Gérer** les accès équipe avec différents rôles
- **Rechercher** rapidement via search bar et command palette (⌘K)

### Vision

- **Phase 1 (MVP)** : Une seule bibliothèque (la tienne), tu invites des membres
- **Phase 2** : Multi-bibliothèques, chaque utilisateur peut créer sa propre lib

---

## Architecture & Stack

### Stack technique

| Catégorie | Technologie | Justification |
|-----------|-------------|---------------|
| **Runtime** | Bun | Ultra-rapide, remplace npm/yarn |
| **Framework** | Next.js 15 (App Router) | SSR, API routes, excellent DX |
| **Language** | TypeScript (strict) | Type safety |
| **Styling** | Tailwind CSS + shadcn/ui | Cohérent, customisable |
| **Animations** | Motion (Framer Motion) | Animations fluides |
| **Auth** | Better Auth | Flexible, self-hosted |
| **Database** | PostgreSQL + Drizzle ORM | Type-safe, performant |
| **DB Hosting** | Neon | Serverless PostgreSQL |
| **Storage** | Bunny.net | Images + vidéos, CDN global |
| **Code Editor** | Monaco Editor | Édition dans les forms |
| **Code Display** | Shiki | Syntax highlighting lecture |
| **Rich Text** | Tiptap | Éditeur WYSIWYG |
| **Search** | Fuse.js | Fuzzy search client-side |
| **Command Palette** | cmdk (shadcn) | ⌘K search globale |
| **Hosting** | Vercel | Deploy auto |

### Commandes

```bash
bun install              # Install deps
bun dev                  # Dev server
bun build                # Production build
bun db:push              # Push schema to DB
bun db:studio            # Drizzle Studio GUI
bun db:generate          # Generate migrations
```

---

## Navigation & Structure

### Architecture de navigation

```
┌─────────────────────────────────────────────────────────────────┐
│                           HEADER                                │
│  Logo    [Searchbar interne]           [⌘K]  [+ New]  [Avatar] │
├──────────────┬──────────────────────────────────────────────────┤
│              │                                                  │
│   SIDEBAR    │                    CONTENT                       │
│              │                                                  │
│   🏠 Home    │    (Page content based on route)                │
│              │                                                  │
│   CATEGORIES │                                                  │
│   📁 Anims   │                                                  │
│   📁 Forms   │                                                  │
│   📁 Nav     │                                                  │
│   📁 Cards   │                                                  │
│              │                                                  │
│   ⭐ Favorites│                                                  │
│              │                                                  │
│   ──────────│                                                  │
│              │                                                  │
│   ⚙️ Settings │                                                  │
│   (si admin) │                                                  │
│              │                                                  │
└──────────────┴──────────────────────────────────────────────────┘
```

### Pages principales

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Tous les composants (récent → ancien) |
| `/category/[slug]` | Category | Composants d'une catégorie |
| `/favorites` | Favorites | Composants favoris de l'user |
| `/components/[slug]` | Component Detail | Détail d'un composant |
| `/components/new` | Create Component | Formulaire création |
| `/settings/*` | Settings | Pages de paramètres |

### Différence Home vs Category vs Favorites

| Page | Contenu | Tri |
|------|---------|-----|
| **Home** | TOUS les composants | Récent → Ancien |
| **Category** | Composants de la catégorie X | Récent → Ancien |
| **Favorites** | Composants favorisés par l'user | Récent → Ancien |

> **Important** : Ce sont des **pages séparées** (URLs différentes), pas des filtres sur la même page.

---

## Features détaillées

### 1. Système d'authentification & Rôles

#### Rôles et permissions

| Rôle | Permissions |
|------|-------------|
| **Owner** | Tout (supprimer la lib, transférer ownership) |
| **Admin** | Gérer membres, CRUD composants/catégories, bulk edit |
| **Builder** | Créer/éditer ses propres composants, dupliquer |
| **Viewer** | Voir et copier les composants uniquement |

#### Matrice des permissions détaillée

| Action | Viewer | Builder | Admin | Owner |
|--------|--------|---------|-------|-------|
| Voir composants | ✅ | ✅ | ✅ | ✅ |
| Copier code/Webflow | ✅ | ✅ | ✅ | ✅ |
| Ajouter aux favoris | ✅ | ✅ | ✅ | ✅ |
| Créer composant | ❌ | ✅ | ✅ | ✅ |
| Éditer ses composants | ❌ | ✅ | ✅ | ✅ |
| Éditer tous composants | ❌ | ❌ | ✅ | ✅ |
| Dupliquer | ❌ | ✅ | ✅ | ✅ |
| Supprimer composant | ❌ | ❌ | ✅ | ✅ |
| Bulk edit composants | ❌ | ❌ | ✅ | ✅ |
| Gérer catégories | ❌ | ❌ | ✅ | ✅ |
| Gérer membres | ❌ | ❌ | ✅ | ✅ |
| Modifier workspace | ❌ | ❌ | ✅ | ✅ |

---

### 2. Searchbar interne (Home)

Recherche locale dans les composants affichés.

- Input dans le header
- Recherche dans `name`, `description`
- Filtrage instantané de la grille
- Pas de modal, juste un input

---

### 3. Command Palette (⌘K)

Recherche globale style Tailwind.

- S'ouvre avec `⌘K` / `Ctrl+K`
- Recherche dans : Composants, Catégories, Pages, Actions
- Highlight des termes trouvés
- Navigation clavier

#### Sections de résultats

```
COMPOSANTS
├── 📦 Dot Canvas
├── 📦 Video Player
└── 📦 Filter System

CATÉGORIES
├── 📁 Animations
└── 📁 Forms

PAGES
├── 📄 Settings
├── 📄 Profile
└── 📄 Members

ACTIONS
├── ➕ Nouveau composant
└── 🎨 Changer de thème
```

---

### 4. Page Component Detail

#### Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Retour    Component Name              [♡] [Duplicate] [Edit] │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────┐  ┌──────────────────────┐ │
│  │                                 │  │   QUICK INFO         │ │
│  │         VIDEO PLAYER            │  │                      │ │
│  │                                 │  │   Category: Forms    │ │
│  │                                 │  │   Created by: Clem   │ │
│  └─────────────────────────────────┘  │   Updated: 2d ago    │ │
│                                       │   Status: Published  │ │
│  [Open preview ↗]                     │                      │ │
│                                       │   [Copy to Webflow]  │ │
│                                       └──────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  DOCUMENTATION                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Setup (external scripts)                         [Copy]│   │
│  │  ───────────────────────────────────────────────────── │   │
│  │  <script src="..."></script>                           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Copy to Webflow                                  [Copy]│   │
│  │  ───────────────────────────────────────────────────── │   │
│  │  { "type": "@webflow/XscpData", ... }                  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  JavaScript                                       [Copy]│   │
│  │  ───────────────────────────────────────────────────── │   │
│  │  function init() { ... }                               │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  CSS                                              [Copy]│   │
│  │  ───────────────────────────────────────────────────── │   │
│  │  .component { ... }                                    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  IMPLEMENTATION                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Attributes Table                                       │   │
│  │  | Attribute | Value | Element | Required | Desc |      │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Details (Rich text)                                    │   │
│  │  Instructions, notes, responsive info...                │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Edit Mode (inline)

Quand on clique sur "Edit", la page passe en mode édition :
- Tous les champs deviennent éditables
- Les code blocks deviennent des Monaco editors
- Boutons "Save" et "Cancel" apparaissent

---

### 5. Page Create Component

Page dédiée (`/components/new`) avec navigation sticky.

#### Sections du formulaire (dans l'ordre)

1. **Général** — Nom, slug, catégorie, thumbnail, vidéo, preview URL
2. **Setup** — Head code (scripts externes, CDN)
3. **Webflow** — JSON paste + validation
4. **JavaScript** — Code JS
5. **CSS** — Code CSS
6. **Attributs** — Tableau dynamique
7. **Détails** — Rich text (Tiptap)

#### Validation

```typescript
// Champs requis
- name: string (requis)
- categoryId: string (requis)
- Au moins UN parmi: headCode, webflowJson, jsCode
```

---

### 6. Settings

#### Structure

```
Settings
├── GENERAL
│   ├── Preferences (theme, etc.)
│   └── Profile (avatar, name, username, email)
│
└── ADMINISTRATION (Admin+ only)
    ├── Workspace (logo, name)
    ├── Members (table, invite, roles)
    ├── Components (bulk edit)
    └── Categories (CRUD)
```

#### Page Members

- Table avec : Avatar, Name, Email, Role, Joined
- Searchbar pour filtrer
- Bouton "Invite" → Modal (email + role)
- Dropdown pour changer le rôle
- Action pour retirer un membre

#### Page Components (Bulk Edit)

- Table de tous les composants
- Sélection multiple (checkboxes)
- Actions bulk : Change category, Change status, Delete
- Filtres et tri

#### Page Categories

- Liste des catégories avec couleur et count
- Drag & drop pour réordonner
- CRUD (Create, Edit, Delete)

---

## Modèle de données

### Schema Drizzle

```typescript
// schema.ts

import { pgTable, text, timestamp, boolean, integer, json, pgEnum } from 'drizzle-orm/pg-core'

// Enums
export const roleEnum = pgEnum('role', ['OWNER', 'ADMIN', 'BUILDER', 'VIEWER'])
export const categoryStatusEnum = pgEnum('category_status', ['DRAFT', 'PUBLISHED', 'ARCHIVED'])

// Users
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  username: text('username').unique(),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Library (Workspace)
export const libraries = pgTable('libraries', {
  id: text('id').primaryKey(),
  name: text('name').notNull().default('My Library'),
  slug: text('slug').notNull().unique(),
  logoUrl: text('logo_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Library Members
export const libraryMembers = pgTable('library_members', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  libraryId: text('library_id').notNull().references(() => libraries.id, { onDelete: 'cascade' }),
  role: roleEnum('role').notNull().default('VIEWER'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Library Invites
export const libraryInvites = pgTable('library_invites', {
  id: text('id').primaryKey(),
  email: text('email').notNull(),
  role: roleEnum('role').notNull().default('VIEWER'),
  token: text('token').notNull().unique(),
  libraryId: text('library_id').notNull().references(() => libraries.id, { onDelete: 'cascade' }),
  expiresAt: timestamp('expires_at').notNull(),
  usedAt: timestamp('used_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Categories
export const categories = pgTable('categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull(),
  color: text('color').notNull().default('#6366f1'),
  icon: text('icon'),
  status: categoryStatusEnum('status').notNull().default('PUBLISHED'),
  order: integer('order').notNull().default(0),
  libraryId: text('library_id').notNull().references(() => libraries.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Components
export const components = pgTable('components', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull(),
  
  // Media
  thumbnailUrl: text('thumbnail_url'),
  videoUrl: text('video_url'),
  previewUrl: text('preview_url'),
  
  // Content
  description: json('description'), // Tiptap JSON
  
  // Code
  headCode: text('head_code'),      // Setup: external scripts
  webflowJson: json('webflow_json'), // Webflow paste
  jsCode: text('js_code'),
  cssCode: text('css_code'),
  
  // Attributes
  attributes: json('attributes'),    // Array of ComponentAttribute
  
  // Meta
  isPublished: boolean('is_published').notNull().default(false),
  
  // Relations
  libraryId: text('library_id').notNull().references(() => libraries.id, { onDelete: 'cascade' }),
  categoryId: text('category_id').notNull().references(() => categories.id),
  createdById: text('created_by_id').notNull().references(() => users.id),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Favorites
export const favorites = pgTable('favorites', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  componentId: text('component_id').notNull().references(() => components.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
```

### Types TypeScript

```typescript
// types/index.ts

export interface ComponentAttribute {
  name: string        // "data-filter"
  value: string       // "group"
  element: string     // "wrapper"
  required: boolean   // true
  description: string // "Main container"
}

export type Role = 'OWNER' | 'ADMIN' | 'BUILDER' | 'VIEWER'
export type CategoryStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'

export const ROLE_HIERARCHY: Record<Role, number> = {
  OWNER: 4,
  ADMIN: 3,
  BUILDER: 2,
  VIEWER: 1,
}
```

---

## Pages & Routes

### Routes de l'application

| Route | Page | Accès |
|-------|------|-------|
| `/` | Home | All |
| `/category/[slug]` | Category | All |
| `/favorites` | Favorites | All |
| `/components/[slug]` | Component Detail | All |
| `/components/new` | Create Component | Builder+ |
| `/settings` | Redirect → /settings/preferences | All |
| `/settings/preferences` | Preferences | All |
| `/settings/profile` | Profile | All |
| `/settings/workspace` | Workspace | Admin+ |
| `/settings/members` | Members | Admin+ |
| `/settings/components` | Components (bulk) | Admin+ |
| `/settings/categories` | Categories | Admin+ |
| `/login` | Login | Public |
| `/forbidden` | Forbidden | Public |
| `/invite/[token]` | Accept Invite | Public |

### Routes API

| Route | Méthode | Accès | Description |
|-------|---------|-------|-------------|
| `/api/components` | GET | All | Liste composants |
| `/api/components` | POST | Builder+ | Créer composant |
| `/api/components/[id]` | GET | All | Détail |
| `/api/components/[id]` | PATCH | Creator/Admin+ | Modifier |
| `/api/components/[id]` | DELETE | Admin+ | Supprimer |
| `/api/components/[id]/duplicate` | POST | Builder+ | Dupliquer |
| `/api/components/bulk` | PATCH | Admin+ | Bulk edit |
| `/api/categories` | GET | All | Liste |
| `/api/categories` | POST | Admin+ | Créer |
| `/api/categories/[id]` | PATCH | Admin+ | Modifier |
| `/api/categories/[id]` | DELETE | Admin+ | Supprimer |
| `/api/categories/reorder` | POST | Admin+ | Réordonner |
| `/api/members` | GET | Admin+ | Liste |
| `/api/members/invite` | POST | Admin+ | Inviter |
| `/api/members/[id]` | PATCH | Admin+ | Changer rôle |
| `/api/members/[id]` | DELETE | Admin+ | Retirer |
| `/api/favorites` | GET | All | Mes favoris |
| `/api/favorites` | POST | All | Ajouter |
| `/api/favorites/[id]` | DELETE | All | Retirer |
| `/api/workspace` | PATCH | Admin+ | Modifier workspace |
| `/api/user/profile` | PATCH | All | Modifier profil |
| `/api/search` | GET | All | Search globale |

---

## Flows utilisateur

### Flow 1: Créer un composant

```
User (Builder+) clique "+ New component"
  ↓
Navigate to /components/new
  ↓
Remplit le formulaire (sections dans l'ordre)
  ↓
Clique "Publish" ou "Save as draft"
  ↓
POST /api/components
  ↓
Redirect to /components/[slug]
```

### Flow 2: Éditer un composant

```
User sur /components/[slug]
  ↓
Clique "Edit" (si permission)
  ↓
Page passe en Edit Mode (inline)
  ↓
Modifie les champs
  ↓
Clique "Save"
  ↓
PATCH /api/components/[id]
  ↓
Retour en mode lecture
```

### Flow 3: Dupliquer un composant

```
User sur /components/[slug]
  ↓
Clique "Duplicate" (Builder+)
  ↓
Navigate to /components/new?duplicate=[id]
  ↓
Formulaire pré-rempli avec:
  - Nom: "{original} copy"
  - Tous les champs copiés
  - Status: Draft
  - Creator: Current user
  ↓
User modifie si besoin
  ↓
Clique "Publish" ou "Save as draft"
```

### Flow 4: Bulk edit composants

```
Admin sur /settings/components
  ↓
Sélectionne plusieurs composants (checkboxes)
  ↓
Barre d'action apparaît
  ↓
Choisit action: "Change category" / "Change status" / "Delete"
  ↓
Modal de confirmation si Delete
  ↓
PATCH /api/components/bulk
  ↓
Table mise à jour
```

### Flow 5: Inviter un membre

```
Admin sur /settings/members
  ↓
Clique "Invite"
  ↓
Modal: Email + Role
  ↓
POST /api/members/invite
  ↓
Email envoyé avec lien /invite/[token]
  ↓
Nouveau membre clique le lien
  ↓
Login/Signup
  ↓
Ajouté à la library avec le rôle
```

---

## Design Figma

### Structure des pages Figma

```
📄 Cover
📄 —————————————
📄 🎨 Design System

📄 —————————————
📄 🔐 Auth
    ├── Login / Default
    └── Forbidden / Default

📄 —————————————
📄 ⚙️ Settings
    ├── Preferences / Default
    ├── Profile / Default
    ├── Profile / New Email
    ├── Workspace / Default
    ├── Members / Default
    ├── Members / Click
    ├── Members / Edit role
    ├── Members / Edit details
    ├── Members / Remove Member
    ├── Members / Invite Member
    ├── Components / Default
    ├── Components / Change category
    ├── Components / Change status
    ├── Components / Edit
    ├── Components / Sort & filters / Open
    ├── Components / Sort & filters / Active
    ├── Category / Default
    ├── Category / Bulk edit status
    ├── Category / Edit
    ├── Category / Edit modal
    ├── Category / Create modal
    └── Category / Delete confirmation

📄 —————————————
📄 🏠 Main
    ├── Home / Default
    ├── Home / Empty
    ├── Favorites / Default
    ├── Favorites / Empty
    ├── Category / Default
    └── Category / Empty

📄 —————————————
📄 📦 Component Detail
    ├── Default
    ├── Copy success (toast)
    ├── Edit mode / Default
    ├── Edit mode / JSON paste
    ├── Edit mode / Success
    └── Delete confirmation

📄 —————————————
📄 ✏️ Create Component
    ├── Default
    ├── Validation errors
    ├── Upload / Uploading
    ├── Upload / Uploaded
    └── Rich text tooltips/popovers

📄 —————————————
📄 🔍 Searchbar (⌘K)
    ├── Default
    ├── With results
    ├── Not found
    └── Recent

📄 —————————————
📄 🧩 UI Components
📄 —————————————
📄 🗑️ Archive
```

---

## Phases de développement

> **Statut actuel**: Phase 4 terminée + optimisations performances Linear-like

### Phase 0: Setup ✅

```
Objectif: Projet Next.js fonctionnel

Tasks:
- [x] bunx create-next-app@latest pxp-components
- [x] Configurer TypeScript strict
- [x] Installer shadcn/ui + Tailwind
- [x] Installer Motion
- [x] Structure de dossiers
- [x] Setup .env.example
- [x] Git init

Validation:
- [x] bun dev fonctionne
- [x] bun build passe
```

### Phase 1: Database ✅

```
Objectif: Schema Drizzle connecté à Neon

Tasks:
- [x] Installer Drizzle ORM
- [x] Créer le schema complet (users, sessions, accounts, verifications, libraries, libraryMembers, libraryInvites, categories, components, favorites)
- [x] Configurer Neon (créer projet)
- [x] Setup scripts DB (push, studio, generate, migrate)
- [ ] Push schema (à faire quand DATABASE_URL configuré)
- [ ] Seed catégories par défaut

Validation:
- [ ] bun db:studio montre les tables
- [ ] Seed exécuté
```

### Phase 2: Auth Better Auth ✅

```
Objectif: Auth fonctionnelle

Tasks:
- [x] Installer Better Auth
- [x] Configurer providers (Google OAuth)
- [x] API route /api/auth/[...all]
- [x] Auth client (signIn, signOut, signUp, useSession)
- [x] Middleware routes protégées
- [x] Page login (app/(auth)/login)
- [x] Helper getCurrentUser() avec rôle (src/lib/auth-utils.ts)
- [x] Helpers hasPermission(), requireAuth(), requireRole()

Décisions:
- App privée: pas de signup public, accès par invitation uniquement
- Single library MVP: pas de création auto de library à l'inscription
- Les invités rejoignent la library existante via /invite/[token]
- Le owner créera sa library + membership manuellement (seed ou admin)

Validation:
- [x] Middleware protège les routes
- [x] Login page fonctionnelle
- [ ] Test complet avec DB (nécessite DATABASE_URL)
```

### Phase 3: Layout App 🟡 (responsive reporté)

```
Objectif: Shell de l'app avec navigation

Tasks:
- [x] Layout avec header + sidebar
- [x] Header: breadcrumbs, searchbar trigger, + New button
- [x] Sidebar: Home (The Vault), Categories list (accordion), Favorites, Settings
- [x] User menu intégré dans dropdown logo (Settings, Invite members, Sign out)
- [x] Theme switcher (next-themes)
- [x] Icons personnalisées (components/icons/)
- [ ] Responsive (sidebar drawer mobile) → REPORTÉ

Validation:
- [x] Navigation fonctionne
- [ ] Responsive OK → REPORTÉ
- [x] Theme OK

Décision: Le responsive mobile sera fait plus tard pour se concentrer sur les features core.
```

### Phase 4: Categories CRUD ✅

```
Objectif: Gestion des catégories

Tasks:
- [x] Page /settings/categories
- [x] Liste avec couleur et count
- [x] Modal création
- [x] Modal édition
- [x] Suppression avec confirmation
- [x] API routes protégées (Admin+)
- [x] Sidebar dynamique avec catégories

Validation:
- [x] CRUD complet
- [x] Viewer ne peut pas accéder
```

### Phase 3.5: Performance Linear-like ✅

```
Objectif: Navigation instantanée style Linear

Tasks:
- [x] TanStack Query pour caching client-side
- [x] AppLoader pour précharger données au démarrage
- [x] Middleware léger avec getSessionCookie (pas d'appel HTTP)
- [x] React.cache() sur getCurrentUser() et getCategories()
- [x] Pages settings en client components avec hooks
- [x] API GET /api/categories et /api/user/me

Architecture:
- Premier load: ~1-2s (cold start Neon)
- Navigations suivantes: ~15-30ms (cache local)
- Données cachées 5-10 minutes
- Refetch en background automatique

Fichiers clés:
- lib/hooks/ - useCurrentUser, useCategories
- lib/permissions.ts - hasPermission (client-safe)
- components/providers/query-provider.tsx
- components/providers/app-loader.tsx
```

### Phase 5: Uploads (2h)

```
Objectif: Upload thumbnail et vidéo

Tasks:
- [ ] Configurer Uploadthing (images)
- [ ] Configurer Bunny (vidéos)
- [ ] Composant ThumbnailUpload
- [ ] Composant VideoUpload avec progress
- [ ] States: uploading, uploaded, error

Validation:
- [ ] Upload image OK
- [ ] Upload vidéo OK
```

### Phase 6: Create Component (5h)

```
Objectif: Formulaire complet de création

Tasks:
- [ ] Page /components/new
- [ ] Navigation sticky sidebar
- [ ] Section Général (nom, slug, catégorie, media)
- [ ] Section Setup (Monaco HTML)
- [ ] Section Webflow (Monaco JSON + validation)
- [ ] Section JavaScript (Monaco JS)
- [ ] Section CSS (Monaco CSS)
- [ ] Section Attributs (table builder)
- [ ] Section Détails (Tiptap)
- [ ] Boutons: Draft / Publish
- [ ] API POST /api/components
- [ ] Validation Zod

Validation:
- [ ] Création fonctionne
- [ ] Tous les champs sauvés
- [ ] Validation OK
```

### Phase 7: Home & Browse (4h)

```
Objectif: Pages de listing

Tasks:
- [ ] Page / (Home) avec grid
- [ ] Page /category/[slug]
- [ ] Page /favorites
- [ ] ComponentCard component
- [ ] Searchbar interne (filter local)
- [ ] Empty states
- [ ] Tri: récent → ancien
- [ ] API GET /api/components avec filtres

Validation:
- [ ] 3 pages fonctionnent
- [ ] Search filtre OK
- [ ] Empty states OK
```

### Phase 8: Favoris (2h)

```
Objectif: Système de favoris

Tasks:
- [ ] Bouton favori sur cards
- [ ] Bouton favori sur detail
- [ ] API toggle favori
- [ ] Page /favorites
- [ ] Optimistic UI

Validation:
- [ ] Toggle OK
- [ ] Persisté en DB
```

### Phase 9: Component Detail (4h)

```
Objectif: Page détail complète

Tasks:
- [ ] Page /components/[slug]
- [ ] Header avec actions
- [ ] Video player (Bunny)
- [ ] Quick info sidebar
- [ ] Documentation blocks avec Shiki
- [ ] Attributes table
- [ ] Details rich text
- [ ] Copy buttons avec feedback
- [ ] Permissions par rôle

Validation:
- [ ] Toutes infos affichées
- [ ] Copy fonctionne
- [ ] Syntax highlighting OK
```

### Phase 10: Edit Mode (3h)

```
Objectif: Édition inline sur Component Detail

Tasks:
- [ ] Bouton Edit (si permission)
- [ ] Toggle mode lecture → édition
- [ ] Champs deviennent éditables
- [ ] Code blocks → Monaco
- [ ] Save / Cancel buttons
- [ ] API PATCH /api/components/[id]

Validation:
- [ ] Edit inline fonctionne
- [ ] Permissions respectées
```

### Phase 11: Duplicate (1h)

```
Objectif: Dupliquer un composant

Tasks:
- [ ] Bouton Duplicate sur detail
- [ ] Navigate to /components/new?duplicate=[id]
- [ ] Pré-remplir avec: nom + " copy", draft, new creator
- [ ] API support

Validation:
- [ ] Duplication crée copie
- [ ] Nouveau en draft
```

### Phase 12: Command Palette (3h)

```
Objectif: ⌘K search globale

Tasks:
- [ ] Installer cmdk
- [ ] Hook useCommandPalette
- [ ] Keyboard shortcut ⌘K / Ctrl+K
- [ ] Search composants (Fuse.js)
- [ ] Search catégories
- [ ] Pages statiques
- [ ] Actions
- [ ] Highlight termes
- [ ] Navigation clavier

Validation:
- [ ] ⌘K ouvre
- [ ] Search fonctionne
- [ ] Highlight visible
```

### Phase 13: Settings - Profile & Workspace (2h)

```
Objectif: Pages settings personnelles

Tasks:
- [ ] Page /settings/preferences
- [ ] Page /settings/profile
- [ ] Page /settings/workspace (Admin+)
- [ ] API routes

Validation:
- [ ] Modifications sauvées
```

### Phase 14: Settings - Members (3h)

```
Objectif: Gestion des membres

Tasks:
- [ ] Page /settings/members
- [ ] Table membres
- [ ] Searchbar
- [ ] Dropdown changer rôle
- [ ] Retirer membre
- [ ] Modal invitation
- [ ] Email avec Resend
- [ ] Page /invite/[token]

Validation:
- [ ] Liste OK
- [ ] Invitation envoyée
- [ ] Nouveau membre ajouté
```

### Phase 15: Settings - Bulk Edit (3h)

```
Objectif: Bulk edit des composants

Tasks:
- [ ] Page /settings/components
- [ ] Table avec sélection multiple
- [ ] Barre d'actions
- [ ] Change category (dropdown)
- [ ] Change status
- [ ] Delete avec confirmation
- [ ] API PATCH /api/components/bulk

Validation:
- [ ] Sélection multiple OK
- [ ] Bulk actions OK
```

### Phase 16: Polish & Deploy (3h)

```
Objectif: Production ready

Tasks:
- [ ] Toasts pour feedback
- [ ] Loading states
- [ ] Error boundaries
- [ ] Pages 404, error
- [ ] Metadata SEO
- [ ] Test responsive
- [ ] Vérifier permissions
- [ ] Variables env prod
- [ ] Deploy Vercel

Validation:
- [ ] bun build OK
- [ ] Deploy fonctionnel
```

---

## Timeline estimée

| Phase | Description | Durée |
|-------|-------------|-------|
| 0 | Setup | 2h |
| 1 | Database | 2h |
| 2 | Auth | 3h |
| 3 | Layout | 3h |
| 4 | Categories | 2h |
| 5 | Uploads | 2h |
| 6 | Create Component | 5h |
| 7 | Home & Browse | 4h |
| 8 | Favoris | 2h |
| 9 | Component Detail | 4h |
| 10 | Edit Mode | 3h |
| 11 | Duplicate | 1h |
| 12 | Command Palette | 3h |
| 13 | Settings Profile/Workspace | 2h |
| 14 | Settings Members | 3h |
| 15 | Settings Bulk Edit | 3h |
| 16 | Polish & Deploy | 3h |
| **Total** | | **~47h** |

---

## Configuration Claude Code

### CLAUDE.md

```markdown
# PXP Components Library

## About
Bibliothèque de composants Webflow avec gestion multi-utilisateurs.

## Tech Stack
- Runtime: Bun
- Framework: Next.js 15 (App Router)
- Language: TypeScript (strict)
- Styling: Tailwind CSS + shadcn/ui
- Animations: Motion
- Auth: Better Auth
- Database: PostgreSQL + Drizzle ORM (Neon)
- Storage: Uploadthing (images), Bunny (videos)
- Code Editor: Monaco (edit), Shiki (display)
- Rich Text: Tiptap
- Search: Fuse.js + cmdk

## Commands
bun install          # Install deps
bun dev              # Dev server
bun build            # Build
bun db:push          # Push schema
bun db:studio        # Drizzle Studio

## Key Patterns

### Permissions
- Check role server-side before mutations
- Use hasPermission() helper
- Roles: OWNER > ADMIN > BUILDER > VIEWER

### API Routes
- Validate with Zod
- Check auth + permissions
- Return { data } or { error }

### Components
- Server Components by default
- 'use client' only when needed
- Use shadcn/ui components

## Don'ts
- Don't bypass auth
- Don't use 'any'
- Don't commit .env
- Don't skip error handling
```

---

## Notes importantes

1. **Pages séparées** — Home, Category, Favorites sont des pages distinctes, pas des filtres

2. **Edit inline** — L'édition se fait directement sur Component Detail, pas une page séparée

3. **Duplicate flow** — Ouvre Create Component pré-rempli, pas une copie directe

4. **Pas de Logs dans MVP** — Retiré pour simplifier, peut être ajouté plus tard

5. **Better Auth** — Remplace Clerk pour plus de contrôle

6. **Drizzle + Neon** — Remplace Prisma + Supabase pour meilleures perfs

7. **Bunny pour vidéos** — Uploadthing limité, Bunny pour HLS streaming