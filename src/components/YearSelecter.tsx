import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';

export function YearSelector({
  onYearChange,
}: {
  onYearChange: (year: string) => void;
}) {
  const [years, setYears] = useState<string[]>([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const range = 2;
    const generatedYears = Array.from({ length: range * 2 + 1 }, (_, index) =>
      String(currentYear - range + index)
    );
    setYears(generatedYears);
  }, []);

  return (
    <Select
      onValueChange={(value) => {
        onYearChange(value);
      }}
    >
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Select a Year' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Year</SelectLabel>
          {years.map((year) => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
