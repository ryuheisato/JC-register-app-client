'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const FormSchema = z.object({
  event: z.string({
    required_error: 'A event name is required.',
  }),
  date: z.date({
    required_error: 'A date is required.',
  }),
});

export type EventFormData = z.infer<typeof FormSchema>;

interface EventFormProps {
  eventId?: number;
  onSubmit: (data: EventFormData, eventId?: number) => Promise<void>;
  onClose: () => void;
}

export function EventForm({ onSubmit, eventId, onClose }: EventFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (formData) => {
          await onSubmit(formData, eventId);
          onClose();
        })}
        className='space-y-8'
      >
        <FormField
          control={form.control}
          name='event'
          render={({ field }) => (
            <FormItem>
              <FormLabel className=''>Event Name</FormLabel>
              <FormControl>
                <Input placeholder='Event Name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='date'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Date of event</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent side='top' className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex place-content-center'>
          <Button type='submit'>Save</Button>
        </div>
      </form>
    </Form>
  );
}
