import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import axios from 'axios'; // 仮にaxiosを使用してデモリクエストを行う場合

export function ScrollAreaDemo() {
  const [years, setYears] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('');

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const range = 3;
    const generatedYears = Array.from({ length: range * 2 + 1 }, (_, index) =>
      String(currentYear - range + index)
    );
    setYears(generatedYears);
    setSelectedYear(String(currentYear));
  }, []);

  const handleYearClick = (year: string) => {
    setSelectedYear(year);
  };

  return (
    <div className='relative'>
      <ScrollArea className='h-72 w-48 rounded-md border'>
        <div className='p-4'>
          <h4 className='mb-4 text-sm font-medium leading-none'>Select Year</h4>
          {years.map((year) => (
            <div key={year} className='flex flex-col'>
              <div
                className={`text-sm cursor-pointer ${
                  year === selectedYear ? 'bg-slate-200' : ''
                }`}
                onClick={() => handleYearClick(year)}
              >
                {year}
              </div>
              <Separator className='my-2' />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
