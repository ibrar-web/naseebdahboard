import type { ReactNode } from 'react';
import { Pagination } from '@/components/table/Pagination';
import { Skeleton } from '@/components/ui/Skeleton';

export interface DataColumn<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
}

interface DataTableProps<T> {
  columns: DataColumn<T>[];
  rows: T[];
  isLoading?: boolean;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export const DataTable = <T,>({
  columns,
  rows,
  isLoading = false,
  page = 1,
  totalPages = 1,
  onPageChange,
}: DataTableProps<T>) => (
  <div className="overflow-hidden rounded-[28px] bg-white shadow-panel">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-100">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.22em] text-slate-500"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {isLoading
            ? Array.from({ length: 5 }).map((_, rowIndex) => (
                <tr key={rowIndex} className="align-top">
                  {columns.map((column) => (
                    <td key={column.key} className="px-5 py-4">
                      <Skeleton className="h-5 w-full max-w-[12rem]" />
                    </td>
                  ))}
                </tr>
              ))
            : rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="align-top">
                  {columns.map((column) => (
                    <td key={column.key} className="px-5 py-4 text-sm text-slate-700">
                      {column.render(row)}
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>
    </div>
    {onPageChange ? <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} /> : null}
  </div>
);
