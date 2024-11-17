import { TableRowSkeleton } from '@/components/table-row-skeleton';
import { Fragment } from 'react/jsx-runtime';

export const TableRowsSkeleton = ({
  row,
  col,
}: {
  row: number;
  col: number;
}) => {
  return (
    <Fragment>
      {Array.from({ length: row }).map((_, index) => (
        <TableRowSkeleton key={index} col={col}></TableRowSkeleton>
      ))}
    </Fragment>
  );
};
