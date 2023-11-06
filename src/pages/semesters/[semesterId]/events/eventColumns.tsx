import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useRouter } from 'next/router';
import { useState } from 'react';
import { EventForm } from '@/components/EventForm';
import { EventFormData } from '@/components/EventForm';
import { format } from 'date-fns';

export type Events = {
  name: string;

  date: string;

  id: number;
};

export const columns = (
  handleDeleteClick: (id: number) => Promise<void>,
  handleFormSubmit: (eventId: number, formData: EventFormData) => Promise<void>
): ColumnDef<Events>[] => [
  {
    accessorKey: 'name',
    header: 'Event Name',
    cell: ({ row }) => {
      return <div className='capitalize pr-60'>{row.getValue('name')}</div>;
    },
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const date = new Date(row.getValue('date'));
      return (
        <div className='capitalize text-slate-500 text-base pr-40'>
          {format(date, 'yyyy-MM-dd')}
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const events = row.original;
      const router = useRouter();
      const semesterId = router.query.semesterId;

      const handleAttendanceClick = () => {
        router.push(
          `/semesters/${semesterId}/events/${events.id}/attend-with-id`
        );
      };

      const handleAttendeesClick = () => {
        router.push(`/semesters/${semesterId}/events/${events.id}/attendees`);
      };

      return (
        <div className='justify-center flex space-x-12'>
          <Button
            onClick={() => {
              handleAttendanceClick();
            }}
            className=''
          >
            出席を記録
          </Button>
          <Button
            onClick={() => {
              handleAttendeesClick();
            }}
          >
            出席者一覧
          </Button>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const events = row.original;
      const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

      return (
        <>
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant='ghost' className='h-8 w-8 p-0'>
                  <span className='sr-only'>Open menu</span>
                  <MoreHorizontal className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                  Edit
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={(event) => {
                    event.stopPropagation;
                    handleDeleteClick(events.id);
                  }}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>Edit Event</DialogTitle>
                <DialogDescription>
                  Make changes to the event here.
                </DialogDescription>
              </DialogHeader>
              <div className=' flex justify-center'>
                <EventForm
                  onSubmit={async (data) => {
                    await handleFormSubmit(events.id, data);
                    setIsEditDialogOpen(false);
                  }}
                  onClose={() => setIsEditDialogOpen(false)}
                />
              </div>
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];
