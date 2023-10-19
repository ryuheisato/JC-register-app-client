import axios from 'axios';
import { Semesters, columns } from './semesterColumns';
import { DataTable } from './semester-data-table';
import { useState, useEffect } from 'react';
import { SemesterDialog } from '@/components/SemesterDialog';

export function getData(): Promise<Semesters[]> {
  return axios
    .get('http://localhost:3001/semesters')
    .then((response) => response.data);
}

const fetchData = async (
  setData: React.Dispatch<React.SetStateAction<Semesters[]>>
) => {
  try {
    const fetchedData = await getData();
    setData(fetchedData);
  } catch (error) {
    console.error('Error fetching data:', error);
    alert('データの取得に失敗しました。');
  }
};

export default function DemoPage() {
  const [data, setData] = useState<Semesters[]>([]);

  useEffect(() => {
    fetchData(setData);
  }, []);

  const handleCellClick = async (id: number) => {
    if (
      window.confirm(
        '本当にこのデータを削除しますか？\nセメスターを削除すると、そのセメスターに紐づく全てのデータも削除されます。'
      )
    ) {
      try {
        await axios.delete(`http://localhost:3001/semesters/${id}`);
        await fetchData(setData);
      } catch (error) {
        console.error('Error deleting data:', error);
        alert('データの削除に失敗しました。');
      }
    }
  };

  return (
    <div className=' container'>
      <div className='flex justify-end m-8'>
        <SemesterDialog onSuccess={() => fetchData(setData)} />
      </div>
      <DataTable columns={columns(handleCellClick)} data={data} />
    </div>
  );
}
