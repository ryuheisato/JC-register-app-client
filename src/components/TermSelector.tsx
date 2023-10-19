import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function TermSelector({
  onTermChange,
}: {
  onTermChange: (term: string) => void;
}) {
  return (
    <Select
      onValueChange={(value) => {
        console.log(`Term selected: ${value}`);
        onTermChange(value);
      }}
    >
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Select a Term' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Term</SelectLabel>
          <SelectItem value='Fall'>Fall</SelectItem>
          <SelectItem value='Winter'>Winter</SelectItem>
          <SelectItem value='Spring'>Spring</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
