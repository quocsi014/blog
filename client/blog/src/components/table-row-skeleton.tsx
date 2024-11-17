import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/ui/table';

export const TableRowSkeleton = ({ col }: { col: number }) => {
  return (
    <TableRow className='p-2 bg-white'>
      {Array.from({ length: col }).map((_, index) => (
        <TableCell>
          <Skeleton key={index} className='w-full h-4' />
        </TableCell>
      ))}
    </TableRow>
  );
};
