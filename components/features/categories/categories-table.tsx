"use client";

import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
  type RowSelectionState,
} from "@tanstack/react-table";
import Image from "next/image";
import { MoreHorizontal, Activity, Pencil, Trash2 } from "lucide-react";
import { Cube, Calendar, UserPen } from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { getCategoryIcon } from "@/lib/icons-map";
import { cn } from "@/lib/utils";
import type { CategoryWithCount } from "@/lib/data/categories";

const GRID_COLS =
  "grid-cols-[minmax(250px,1fr)_minmax(250px,1fr)_minmax(120px,180px)_minmax(120px,180px)_minmax(120px,180px)_2.125rem]";

interface CategoriesTableProps {
  data: CategoryWithCount[];
  onEditClick?: (category: CategoryWithCount) => void;
  onDeleteClick?: (category: CategoryWithCount) => void;
}

const cellStyles = {
  base: "flex items-center h-9 border-b-[0.5px] border-r-[0.5px] border-border-base transition-colors duration-100",
  category: "px-[0.875rem] border-l-[0.5px]",
  default: "px-3.5",
  status: "px-[0.375rem] border-r-0",
  actions: "p-0 justify-center border-r-0",
};

function TableRow({
  row,
}: {
  row: ReturnType<
    ReturnType<typeof useReactTable<CategoryWithCount>>["getRowModel"]
  >["rows"][number];
}) {
  return (
    <div
      className={cn(
        "group col-span-full grid grid-cols-subgrid bg-main hover:bg-[#F8F8F8] data-[state=selected]:bg-blue-50",
        GRID_COLS,
      )}
      data-state={row.getIsSelected() && "selected"}
    >
      {row.getVisibleCells().map((cell) => (
        <div
          key={cell.id}
          className={cn(
            cellStyles.base,
            cell.column.id === "actions"
              ? cellStyles.actions
              : cell.column.id === "status"
                ? cellStyles.status
                : cell.column.id === "category"
                  ? cellStyles.category
                  : cellStyles.default,
          )}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </div>
      ))}
    </div>
  );
}

export function CategoriesTable({
  data,
  onEditClick,
  onDeleteClick,
}: CategoriesTableProps) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const columns = useMemo<ColumnDef<CategoryWithCount>[]>(
    () => [
      {
        id: "category",
        accessorKey: "name",
        header: ({ table }) => (
          <div className="flex items-center gap-3">
            <Checkbox
              className="cursor-pointer"
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) =>
                table.toggleAllPageRowsSelected(!!value)
              }
              aria-label="Select all"
            />
            <span className="sub-2xs text-soft">Category</span>
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Checkbox
              className="cursor-pointer"
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              onClick={(e) => e.stopPropagation()}
              aria-label="Select row"
            />
            <div className="flex items-center gap-[0.375rem]">
              {(() => {
                const Icon = getCategoryIcon(row.original.icon);
                return <Icon className="size-4 text-base" />;
              })()}
              <span className="sub-xs text-base truncate">
                {row.original.name}
              </span>
            </div>
          </div>
        ),
      },
      {
        id: "components",
        accessorKey: "componentCount",
        header: () => (
          <div className="flex items-center gap-[0.375rem]">
            <Cube className="size-[0.875rem] text-soft" />
            <span className="sub-2xs text-soft">Components</span>
          </div>
        ),
        cell: ({ row }) => (
          <span className="text-soft">{row.original.componentCount}</span>
        ),
      },
      {
        id: "createdBy",
        enableSorting: false,
        header: () => (
          <div className="flex items-center gap-[0.375rem]">
            <UserPen className="size-[0.875rem] text-soft" />
            <span className="sub-2xs text-soft">Created by</span>
          </div>
        ),
        cell: ({ row }) => {
          const creator = row.original.createdBy;
          if (!creator) {
            return <span className="text-soft">-</span>;
          }
          return (
            <div className="flex gap-[0.375rem] items-center">
              {creator.avatarUrl ? (
                <Image
                  src={creator.avatarUrl}
                  alt={creator.username || ""}
                  width={20}
                  height={20}
                  className="size-5 rounded-full overflow-hidden object-cover"
                />
              ) : (
                <div className="size-5 rounded-full bg-gray-200" />
              )}
              <span className="sub-xs text-soft">
                {creator.username || "-"}
              </span>
            </div>
          );
        },
      },
      {
        id: "createdAt",
        enableSorting: false,
        header: () => (
          <div className="flex items-center gap-[0.375rem]">
            <Calendar className="size-[0.875rem] text-soft" />
            <span className="sub-2xs text-soft">Created at</span>
          </div>
        ),
        cell: ({ row }) => {
          const date = row.original.createdAt;
          const formatted = new Date(date).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          });
          return <span className="text-2xs text-soft">{formatted}</span>;
        },
      },
      {
        id: "status",
        accessorKey: "status",
        enableSorting: false,
        header: () => (
          <div className="flex items-center gap-[0.375rem]">
            <Activity className="size-[0.875rem] text-soft" />
            <span className="sub-2xs text-soft">Status</span>
          </div>
        ),
        cell: ({ row }) => {
          const status = row.original.status;
          const statusConfig = {
            DRAFT: {
              label: "Draft",
              className: "bg-orange-100 border-orange-300 text-orange-600 ",
            },
            PUBLISHED: {
              label: "Published",
              className: "bg-green-100 border-green-300 text-green-600",
            },
            ARCHIVED: {
              label: "Archived",
              className: "bg-slate-100 text-slate-600 border-slate-300",
            },
          };
          const config = statusConfig[status];
          return (
            <span
              className={`inline-flex border-[0.5px] rounded-[7px] text-2xs font-medium leading-tight h-[1.375rem] items-center justify-center px-[0.375rem] ${config.className}`}
            >
              {config.label}
            </span>
          );
        },
      },
      {
        id: "actions",
        enableSorting: false,
        header: () => null,
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="size-5 rounded-[6px] flex items-center justify-center cursor-pointer transition-colors duration-100 hover:bg-gray-200 active:bg-gray-200"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className="size-3 text-soft" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => onEditClick?.(row.original)}>
                  <div className="flex items-center gap-2">
                    <Pencil className="size-4" />
                    <span>Edit category</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => onDeleteClick?.(row.original)}
                >
                  <div className="flex items-center gap-2">
                    <Trash2 className="size-4" />
                    <span>Delete</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [onEditClick, onDeleteClick],
  );

  // eslint-disable-next-line react-hooks/incompatible-library -- opted out with "use no memo"
  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    getRowId: (row) => row.id,
  });

  const headerStyles = {
    base: "flex items-center h-10 border-t-[0.5px] border-b-[0.5px] border-r-[0.5px] border-border-base sub-2xs text-soft font-medium",
    category: "px-[0.875rem] border-l-[0.5px]",
    default: "px-3.5",
    status: "px-3.5 border-r-0",
    actions: "p-0 border-r-0",
  };

  if (data.length === 0) {
    return (
      <div className="w-full overflow-x-auto">
        <div className={cn("grid min-w-full", GRID_COLS)}>
          <div
            className={cn(
              "col-span-full grid grid-cols-subgrid bg-gray-100/50",
              GRID_COLS,
            )}
          >
            {table.getHeaderGroups().map((headerGroup) =>
              headerGroup.headers.map((header) => (
                <div
                  key={header.id}
                  className={cn(
                    headerStyles.base,
                    header.id === "actions"
                      ? headerStyles.actions
                      : header.id === "status"
                        ? headerStyles.status
                        : header.id === "category"
                          ? headerStyles.category
                          : headerStyles.default,
                  )}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </div>
              )),
            )}
          </div>
        </div>
        <div className="p-8 text-center">
          <p className="text-soft">No categories found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className={cn("grid min-w-full", GRID_COLS)}>
        {table.getHeaderGroups().map((headerGroup) => (
          <div
            key={headerGroup.id}
            className={cn(
              "col-span-full grid grid-cols-subgrid bg-gray-100/50",
              GRID_COLS,
            )}
          >
            {headerGroup.headers.map((header) => (
              <div
                key={header.id}
                className={cn(
                  headerStyles.base,
                  header.id === "actions"
                    ? headerStyles.actions
                    : header.id === "status"
                      ? headerStyles.status
                      : header.id === "category"
                        ? headerStyles.category
                        : headerStyles.default,
                )}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </div>
            ))}
          </div>
        ))}
        <div className={cn("col-span-full grid grid-cols-subgrid", GRID_COLS)}>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.original.id} row={row} />
          ))}
        </div>
      </div>
    </div>
  );
}
