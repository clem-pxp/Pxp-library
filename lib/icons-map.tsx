import { BracketsCurly } from "@/components/icons/BracketsCurly";
import { MouseScroll } from "@/components/icons/MouseScroll";
import { ButtonCursor } from "@/components/icons/ButtonCursor";
import { Folder } from "lucide-react";

// Map icon names (stored in DB) to React components
export const CATEGORY_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  code: BracketsCurly,
  scroll: MouseScroll,
  pointer: ButtonCursor,
  form: BracketsCurly, // TODO: créer une icône Form
  menu: BracketsCurly, // TODO: créer une icône Menu
  sparkles: BracketsCurly, // TODO: créer une icône Sparkles
  default: Folder,
};

export function getCategoryIcon(
  iconName: string | null,
): React.ComponentType<{ className?: string }> {
  if (!iconName) return CATEGORY_ICONS.default;
  return CATEGORY_ICONS[iconName] || CATEGORY_ICONS.default;
}
