import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast, Toaster } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SimpleRegisterForm() {
  const router = useRouter();
  const { semesterId, eventId } = router.query;

  const [studentId, setStudentId] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form Submitted', studentId);

    try {
      await axios.post(
        `http://localhost:3001/semesters/${semesterId}/events/${eventId}/attend-with-id`,
        { studentId }
      );
      toast.success('Attendee recorded.');
      setStudentId(''); // 入力値をリセット
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const backendMessage = error.response?.data.message;
        if (backendMessage) {
          toast.error(backendMessage);
        }
      }
    }
  };

  return (
    <div className='space-y-8'>
      <form onSubmit={handleSubmit}>
        <div className='flex place-content-center mt-24 mb-4 space-x-8'>
          <div>
            <label htmlFor='studentId' className='text-xl'>
              Student ID
            </label>
            <Input
              className='py-8 px-24 text-xl'
              placeholder='Student ID'
              id='studentId'
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
          </div>
        </div>
        <div className='flex justify-center'>
          <Button type='submit'>Submit</Button>
        </div>
      </form>
      <Toaster richColors />
    </div>
  );
}
