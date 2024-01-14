import axios from 'axios';
import { Members, columns } from './memberColumns';
import { MemberDataTable } from './member-data-table';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';

export default function DemoPage() {
  const router = useRouter();
  const [data, setData] = useState<Members[]>([]);
  const semesterId = router.query.semesterId;

  const getData = async (): Promise<Members[]> => {
    if (!semesterId) {
      throw new Error('No semester ID');
    }
    const response = await axios.get(
      `http://localhost:3001/semesters/${semesterId}/members`
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

  useEffect(() => {
    if (router.isReady) {
      fetchData();
    }
  }, [router.isReady, router.query.semesterId]);

  const handleCellClick = async (studentId: number) => {
    if (window.confirm('本当にこのデータを削除しますか？')) {
      try {
        await axios.delete(
          `http://localhost:3001/semesters/${semesterId}/members/${studentId}`
        );
        await fetchData();
      } catch (error) {
        console.error('Error deleting data:', error);
        alert('データの削除に失敗しました。');
      }
    }
  };

  const handleClick = () => {
    router.push(`/semesters/${semesterId}/members/register`);
  };

  return (
    <div className='container'>
      <div className='flex justify-end m-8'>
        <Button onClick={handleClick}>メンバー登録</Button>
      </div>
      <MemberDataTable columns={columns(handleCellClick)} data={data} />
    </div>
  );
}
