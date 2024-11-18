import { useUsers } from '@/features/admin/user/apis/list-user';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { User } from '@/types/user';
import { formatDate } from '@/utils/data';
import { Button } from '@/components/ui/button';
import { TableRowsSkeleton } from '@/components/table-rows-skeleton';
import { Pagination } from '@/components/pagination';
import { useQueryString } from '@/hooks/useQueryString';

export const UserList = () => {
  const queryString = useQueryString();
  const { data } = useUsers({
    page: Number.parseInt(queryString['page']) || 1,
  });
  return (
    <div>
      <Button className='bg-gray-500 hover:bg-gray-600 text-white text-lg absolute top-0 right-0'>
        Create user
      </Button>
      <Table className='border'>
        <TableHeader className='bg-gray-200 text-lg text-gray-600'>
          <TableRow>
            <TableHead className='w-[100px] font-bold text-black'>
              User
            </TableHead>
            <TableHead className='w-[200px] font-bold text-black'>First name</TableHead>
            <TableHead className='w-[200px] font-bold text-black'>Last name</TableHead>
            <TableHead className='font-bold text-black'>Email</TableHead>
            <TableHead className='w-[100px] font-bold text-black'>
              Role
            </TableHead>
            <TableHead className='w-[200px] font-bold text-black'>
              Create at
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data ? (
            data.data.items.map((user: User) => (
              <TableRow key={user.id}>
                <TableCell className='text-md font-semibold'>
                  {user.id}
                </TableCell>
                <TableCell className='text-md font-medium text-gray-700'>
                  {user.first_name}
                </TableCell>
                <TableCell className='text-md font-medium text-gray-700'>
                  {user.last_name}
                </TableCell>
                <TableCell className='text-md font-medium text-gray-700'>
                  {user.email}
                </TableCell>
                <TableCell className='text-md font-medium text-gray-700'>
                  {user.role}
                </TableCell>
                <TableCell className='text-md font-medium text-gray-700'>
                  {formatDate(user.created_at)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRowsSkeleton col={6} row={14}></TableRowsSkeleton>
          )}
        </TableBody>
      </Table>
      {data ? (
        <Pagination
          className=' flex justify-end mt-6'
          currentPage={Number.parseInt(queryString['page'] || '1')}
          totalPage={data.data.totalPage}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
