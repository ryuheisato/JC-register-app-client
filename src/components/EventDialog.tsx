import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { useState } from 'react';
import { EventForm } from '@/components/EventForm';
import { EventFormData } from '@/components/EventForm';
import { Button } from '@/components/ui/button';

export function EventDialog({
  onSubmit,
}: {
  onSubmit: (data: EventFormData) => Promise<void>;
}) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogTrigger asChild>
        <Button>イベント作成</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Create a New Event</DialogTitle>
        </DialogHeader>
        <div className=' flex justify-center'>
          <EventForm
            onSubmit={async (data) => {
              await onSubmit(data);
              setIsEditDialogOpen(false);
            }}
            onClose={() => setIsEditDialogOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
