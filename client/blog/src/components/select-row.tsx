import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useUpdateSearchParam from '@/hooks/use-update-query';
import { useMemo} from 'react';

export function SelectRow() {
  const updateSearchParam = useUpdateSearchParam();
  const handleChange = useMemo(() => {
    return (value: string) => {
      localStorage.setItem('rows', value);
      updateSearchParam('page');
      // updateSearchParam('rows', value);
    };
  }, [updateSearchParam]);

  return (
    <Select
      onValueChange={(value) => {
        handleChange(value);
      }}
    >
      <SelectTrigger className='w-fit focus:ring-transparent focus:ring-offset-0'>
        <SelectValue placeholder='number of rows' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Number of rows</SelectLabel>
          <SelectItem value='10'>10 rows</SelectItem>
          <SelectItem value='15'>15 rows</SelectItem>
          <SelectItem value='20'>20 rows</SelectItem>
          <SelectItem value='30'>30 rows</SelectItem>
          <SelectItem value='40'>40 rows</SelectItem>
          <SelectItem value='50'>50 rows</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}