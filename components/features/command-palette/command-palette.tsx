"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Command,
  CommandCollection,
  CommandDialog,
  CommandDialogPopup,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandPanel,
  CommandSeparator,
} from "@/components/ui/command";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { useCategories, useSearch } from "@/lib/hooks";
import { getCategoryIcon } from "@/lib/icons-map";
import {
  ArrowDown,
  ArrowEnter,
  ArrowUp,
  Cube,
  FilterOptions,
  Heart,
  Layers,
  Out,
  UserFill,
  UserPlus,
  Users,
  Vault,
  Workspace,
} from "@/components/icons";
import { useCommandPalette } from "@/components/providers/command-palette-provider";

interface Item {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  shortcut?: string;
  href?: string;
  action?: () => void;
  groupName?: string;
}

interface Group {
  value: string;
  items: Item[];
}

const SUGGESTIONS: Item[] = [
  { value: "home", label: "The Vault", icon: Vault, href: "/", shortcut: "⌥1" },
  {
    value: "favorites",
    label: "Favorites",
    icon: Heart,
    href: "/favorites",
    shortcut: "⌥2",
  },
  {
    value: "create-component",
    label: "Create Component",
    icon: Cube,
    href: "/components/new",
    shortcut: "⌥3",
  },
];

const ACTIONS: Item[] = [
  {
    value: "create-component-action",
    label: "Create Component",
    icon: Cube,
    href: "/components/new",
  },
  {
    value: "invite-members",
    label: "Invite Members",
    icon: UserPlus,
    href: "/settings/members",
  },
];

const SETTINGS: Item[] = [
  {
    value: "preferences",
    label: "Preferences",
    icon: FilterOptions,
    href: "/settings/preferences",
  },
  {
    value: "profile",
    label: "Profile",
    icon: UserFill,
    href: "/settings/profile",
  },
  {
    value: "workspace",
    label: "Workspace",
    icon: Workspace,
    href: "/settings/workspace",
  },
  {
    value: "members",
    label: "Members",
    icon: Users,
    href: "/settings/members",
  },
  {
    value: "components-settings",
    label: "Components",
    icon: Cube,
    href: "/settings/components",
  },
  {
    value: "categories-settings",
    label: "Categories",
    icon: Layers,
    href: "/settings/categories",
  },
];

const MORE: Item[] = [
  {
    value: "sign-out",
    label: "Sign Out",
    icon: Out,
    action: () => {
      window.location.href = "/api/auth/sign-out";
    },
  },
];

export function CommandPalette() {
  const router = useRouter();
  const { open, setOpen } = useCommandPalette();
  const [query, setQuery] = React.useState("");

  const { data: categories = [] } = useCategories();
  const { data: searchedComponents = [] } = useSearch(query);

  const handleItemClick = React.useCallback(
    (item: Item) => {
      setOpen(false);
      setQuery("");
      if (item.href) {
        router.push(item.href);
      } else if (item.action) {
        item.action();
      }
    },
    [router, setOpen],
  );

  const filterItems = React.useCallback(
    (item: Item, inputValue: string): boolean => {
      const search = inputValue.toLowerCase();
      return (
        item.label.toLowerCase().includes(search) ||
        item.value.toLowerCase().includes(search) ||
        (item.groupName?.toLowerCase().includes(search) ?? false)
      );
    },
    [],
  );

  const categoryItems: Item[] = React.useMemo(
    () =>
      categories.map((category) => ({
        value: category.id,
        label: category.name,
        icon: getCategoryIcon(category.icon),
        href: `/category/${category.slug}`,
        shortcut: `${category.componentCount}`,
      })),
    [categories],
  );

  const componentItems: Item[] = React.useMemo(
    () =>
      searchedComponents.map((component) => ({
        value: component.id,
        label: component.name,
        icon: Cube,
        href: `/components/${component.slug}`,
        shortcut: component.categoryName,
      })),
    [searchedComponents],
  );

  const groups: Group[] = React.useMemo(() => {
    const addGroupName = (items: Item[], groupName: string): Item[] =>
      items.map((item) => ({ ...item, groupName }));

    const result: Group[] = [
      { value: "Suggestions", items: addGroupName(SUGGESTIONS, "Suggestions") },
      { value: "Actions", items: addGroupName(ACTIONS, "Actions") },
    ];

    if (categoryItems.length > 0) {
      result.push({
        value: "Categories",
        items: addGroupName(categoryItems, "Categories"),
      });
    }

    if (componentItems.length > 0) {
      result.push({
        value: "Components",
        items: addGroupName(componentItems, "Components"),
      });
    }

    result.push({
      value: "Settings",
      items: addGroupName(SETTINGS, "Settings"),
    });
    result.push({ value: "More", items: addGroupName(MORE, "More") });

    return result;
  }, [categoryItems, componentItems]);

  return (
    <CommandDialog onOpenChange={setOpen} open={open}>
      <CommandDialogPopup>
        <Command filter={filterItems} items={groups}>
          <CommandInput
            placeholder="Search for pages and commands..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <CommandPanel>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandList>
              {(group: Group) => {
                const isSuggestions = group.value === "Suggestions";
                return (
                  <React.Fragment key={group.value}>
                    <CommandGroup items={group.items}>
                      <CommandGroupLabel>{group.value}</CommandGroupLabel>
                      <CommandCollection>
                        {(item: Item) => (
                          <CommandItem
                            className="group justify-between"
                            key={item.value}
                            onClick={() => handleItemClick(item)}
                            value={item.value}
                          >
                            <div className="flex items-center gap-1.5">
                              {item.icon && <item.icon className="size-4" />}
                              <span className="text-sm font-medium text-base !leading-tight">
                                {item.label}
                              </span>
                            </div>
                            {isSuggestions && item.shortcut ? (
                              <Kbd variant="shortcut">{item.shortcut}</Kbd>
                            ) : (
                              <Kbd
                                className="opacity-0 group-data-highlighted:opacity-100 transition-opacity"
                                variant="icon-ghost"
                              >
                                <ArrowEnter />
                              </Kbd>
                            )}
                          </CommandItem>
                        )}
                      </CommandCollection>
                    </CommandGroup>
                    <CommandSeparator />
                  </React.Fragment>
                );
              }}
            </CommandList>
          </CommandPanel>
          <CommandFooter>
            <div className="flex items-center gap-2">
              <KbdGroup>
                <Kbd variant="icon">
                  <ArrowUp />
                </Kbd>
                <Kbd variant="icon">
                  <ArrowDown />
                </Kbd>
              </KbdGroup>
              <span>Navigate</span>
            </div>
            <div className="flex items-center gap-2">
              <Kbd variant="icon">
                <ArrowEnter />
              </Kbd>
              <span>Open</span>
            </div>
          </CommandFooter>
        </Command>
      </CommandDialogPopup>
    </CommandDialog>
  );
}
