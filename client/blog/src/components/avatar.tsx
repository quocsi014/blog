import {
  Avatar as A,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';

type AvatarPropsType = {
  avatarUrl: string | null;
  firstName: string;
  lastName: string;
  className?: string;
};

export const Avatar = ({
  avatarUrl,
  firstName,
  lastName,
  className,
}: AvatarPropsType) => {
  return (
    <A className={`border-2 ${className}`}>
      <AvatarImage className='object-cover' src={avatarUrl || ''} />
      <AvatarFallback className='size-full'>
        {firstName[0].toLowerCase() + lastName[0].toLowerCase()}
      </AvatarFallback>
    </A>
  );
};
