import { Button } from '@/components/ui/button';
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from 'react-icons/ti';

type SortButtonProps = {
  sortField: string;
  sortBy: string | null;
  setSortBy: React.Dispatch<React.SetStateAction<string | null>>;
  asc: boolean | null;
  setAsc: React.Dispatch<React.SetStateAction<boolean | null>>;
};
export const SortButton = ({
  sortField,
  sortBy,
  setSortBy,
  asc,
  setAsc,
}: SortButtonProps) => {
  const handleSort = () => {
    if (sortField != sortBy) {
      setSortBy(sortField);
      setAsc(true);
      return;
    }
    if (asc) {
      setAsc(false);
    } else {
      setSortBy(null);
      setAsc(null);
    }
  };
  return (
    <Button
    className='size-fit'
    variant={'secondary'}
      onClick={() => {
        handleSort();
      }}
    >
      {sortBy != sortField ? (
        <TiArrowUnsorted />
      ) : asc ? (
        <TiArrowSortedUp />
      ) : (
        <TiArrowSortedDown />
      )}
    </Button>
  );
};
