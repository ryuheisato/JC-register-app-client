import axios from 'axios';
import { Events, columns } from './eventColumns';
import { EventDataTable } from './event-data-table';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast, Toaster } from 'sonner';
import { EventFormData } from '@/components/EventForm';
import { EventDialog } from '@/components/EventDialog';

export default function EventListPage() {
  const router = useRouter();
  const [data, setData] = useState<Events[]>([]);
  const semesterId = router.query.semesterId;

  const getData = async (): Promise<Events[]> => {
    if (!semesterId) {
      throw new Error('No semester ID');
    }
    const response = await axios.get(
      `http://localhost:3001/semesters/${semesterId}/events`
    );
    return response.data;
  };

  const fetchData = async () => {
    try {
      const fetchedData = await getData();
      setData(fetchedData);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('データの取得に失敗しました。');
    }
  };

  const handleFormSubmit = async (eventId: number, data: EventFormData) => {
    try {
      await axios.put(
        `http://localhost:3001/semesters/${semesterId}/events/${eventId}`,
        {
          name: data.event,
          date: data.date,
        }
      );
      toast.success('Event edited successfully');
      await fetchData();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.message);
      }
    }
  };

  useEffect(() => {
    if (router.isReady) {
      fetchData();
    }
  }, [router.isReady, router.query.semesterId]);

  const handleDeleteClick = async (eventId: number) => {
    if (window.confirm('本当にこのデータを削除しますか？')) {
      try {
        await axios.delete(
          `http://localhost:3001/semesters/${semesterId}/events/${eventId}`
        );
        await fetchData();
      } catch (error) {
        console.error('Error deleting data:', error);
        alert('データの削除に失敗しました。');
      }
    }
  };

  const handleEventSubmit = async (data: EventFormData) => {
    try {
      await axios.post(`http://localhost:3001/semesters/${semesterId}/events`, {
        name: data.event,
        date: data.date,
      });
      toast.success('Event created successfully');
      await fetchData();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.message);
      }
    }
  };

  return (
    <div className='container'>
      <div className='flex justify-end m-8'>
        <EventDialog onSubmit={handleEventSubmit} />
        <Toaster richColors />
      </div>
      <EventDataTable
        columns={columns(handleDeleteClick, handleFormSubmit)}
        data={data}
      />
      <Toaster richColors />
    </div>
  );
}
