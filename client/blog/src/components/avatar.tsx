import {
  Avatar as A,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';

type AvatarPropsType = {
  avatarUrl: string | null;
  firstName: string;
  lastName: string;
};

export const Avatar = ({ avatarUrl, firstName, lastName }: AvatarPropsType) => {
  return (
    <A className='border-2'>
      <AvatarImage src={avatarUrl || ''} />
      <AvatarFallback>{firstName[0] + lastName[0]}</AvatarFallback>
    </A>
  );
};
