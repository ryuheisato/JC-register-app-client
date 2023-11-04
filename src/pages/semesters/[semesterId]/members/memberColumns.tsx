import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export type Members = {
  name: string;

  studentID: number;

  id: number;
};

export const columns = (
  handleCellClick: (id: number) => Promise<void>
): ColumnDef<Members>[] => [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      return <div className='capitalize'>{row.getValue('name')}</div>;
    },
  },
  {
    accessorKey: 'studentID',
    header: 'Student ID',
    cell: ({ row }) => {
      return <div className='capitalize'>{row.getValue('studentID')}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const name = row.original;

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem
                onClick={() => {
                  handleCellClick(name.id);
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
