import { AuthGuard } from '@/guard/AuthGuard';
import { NoPermisstion } from '@/guard/no-permission';
import { userSelector } from '@/redux/selector/user-selector';
import { useSelector } from 'react-redux';

type RoleGuardPropType = {
  roles: string[];
  children: React.ReactNode;
};

export const RoleGuard = ({ roles, children }: RoleGuardPropType) => {
  const user = useSelector(userSelector);
  return (
    <AuthGuard>
      {!roles.includes(user?.role || '') ? <NoPermisstion /> : children}
    </AuthGuard>
  );
};
