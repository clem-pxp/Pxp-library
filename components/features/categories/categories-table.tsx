"use client";

import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type RowSelectionState,
} from "@tanstack/react-table";
import Image from "next/image";
import {
  MoreHorizontal,
  FolderOpen,
  Layers,
  User,
  Calendar,
  Activity,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CategoryWithCount } from "@/lib/data/categories";

interface CategoriesTableProps {
  data: CategoryWithCount[];
  onEdit?: (category: CategoryWithCount) => void;
}

export function CategoriesTable({ data, onEdit }: CategoriesTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const columns = useMemo<ColumnDef<CategoryWithCount>[]>(
    () => [
      {
        id: "category",
        accessorKey: "name",
        header: ({ table }) => (
          <div className="flex items-center gap-3">
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) =>
                table.toggleAllPageRowsSelected(!!value)
              }
              aria-label="Select all"
            />
            <div className="flex items-center gap-[0.375rem]">
              <FolderOpen className="size-[0.875rem] text-soft" />
              <span className="sub-2xs text-soft">Category</span>
            </div>
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              onClick={(e) => e.stopPropagation()}
              aria-label="Select row"
            />
            <div className="flex items-center gap-2">
              <div
                className="size-2.5 rounded-full shrink-0"
                style={{ backgroundColor: row.original.color }}
              />
              <span className="font-medium text-strong truncate">
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
            <Layers className="size-[0.875rem] text-soft" />
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
            <User className="size-[0.875rem] text-soft" />
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
          return <span className="text-soft">{formatted}</span>;
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
          <button
            type="button"
            className="size-5 rounded-[6px] flex items-center justify-center transition-colors duration-100 hover:bg-gray-200 active:bg-gray-200"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(row.original);
            }}
          >
            <MoreHorizontal className="size-3 text-soft" />
          </button>
        ),
      },
    ],
    [onEdit],
  );

  // eslint-disable-next-line react-hooks/incompatible-library -- opted out with "use no memo"
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: true,
  });

  if (data.length === 0) {
    return (
      <div className="w-full">
        <Table>
          <TableHeader className="[&_tr]:border-0">
            <TableRow className="border-0 hover:bg-transparent">
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={
                      header.id === "actions"
                        ? "h-10 w-[2.125rem] p-0 border-y-[0.5px] border-border-base"
                        : header.id === "status"
                          ? "h-10 px-3.5 sub-2xs text-soft border-[0.5px] border-border-base border-r-0"
                          : "h-10 px-3.5 sub-2xs text-soft border-[0.5px] border-border-base"
                    }
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                )),
              )}
            </TableRow>
          </TableHeader>
        </Table>
        <div className="p-8 text-center">
          <p className="text-soft">No categories found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Table>
        <TableHeader className="[&_tr]:border-0">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="border-0 hover:bg-transparent"
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={
                    header.id === "actions"
                      ? "h-10 w-[2.125rem] p-0 border-y-[0.5px] border-border-base"
                      : header.id === "status"
                        ? "h-10 px-3.5 sub-2xs text-soft border-[0.5px] border-border-base border-r-0"
                        : "h-10 px-3.5 sub-2xs text-soft border-[0.5px] border-border-base"
                  }
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              className="border-0 transition-colors duration-[50ms] hover:bg-gray-100"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={
                    cell.column.id === "actions"
                      ? "w-[2.125rem] p-0 border-y-[0.5px] border-border-base"
                      : cell.column.id === "status"
                        ? "px-3.5 py-2.5 border-[0.5px] border-border-base border-r-0"
                        : "px-3.5 py-2.5 border-[0.5px] border-border-base"
                  }
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
