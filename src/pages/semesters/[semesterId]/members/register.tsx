import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Toaster, toast } from 'sonner';
import React from 'react';
const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  studentId: z.string().min(7, {
    message: 'Student ID must be at least 7 characters.',
  }),
});

export default function RegisterForm() {
  const router = useRouter();
  const semesterId = router.query.semesterId;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      studentId: '',
    },
  });

  const { reset, setFocus } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(
        `http://localhost:3001/semesters/${semesterId}/members`,
        {
          name: values.name,
          studentId: values.studentId,
        }
      );
      toast.success(`${values.name} has been added.`);
      reset();
      setTimeout(() => setFocus('name'), 0);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const backendMessage = error.response?.data.message;
        if (backendMessage) {
          form.setError('studentId', {
            type: 'manual',
            message: backendMessage,
          });
        }
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='flex place-content-center mt-24 mb-4 space-x-8'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xl'>Name</FormLabel>
                <FormControl>
                  <Input
                    className='py-8 px-24 text-xl'
                    placeholder='Name'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='studentId'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xl'>Student ID</FormLabel>
                <FormControl>
                  <Input
                    className='py-8 px-24 text-xl'
                    placeholder='Student ID'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex justify-center'>
          <Toaster richColors />
          <Button type='submit'>Submit</Button>
        </div>
      </form>
    </Form>
  );
}
