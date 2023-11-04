import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { TermSelector } from './TermSelector';
import { YearSelector } from './YearSelecter';
import { useState } from 'react';
import axios from 'axios';
import { DialogClose } from '@radix-ui/react-dialog';

export function SemesterDialog({ onSuccess }: { onSuccess: () => void }) {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);

  const handleAdd = async () => {
    if (selectedYear && selectedTerm) {
      try {
        await axios.post('http://localhost:3001/semesters', {
          term: `${selectedTerm} ${selectedYear}`,
        });
        onSuccess();
      } catch (error) {
        console.error('Error posting data:', error);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>セメスターを追加</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>セメスターを追加</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label className='text-right'>Term</Label>
            <TermSelector onTermChange={setSelectedTerm} />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label className='text-right'>Year</Label>
            <YearSelector onYearChange={setSelectedYear} />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type='submit' onClick={handleAdd}>
              追加
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
