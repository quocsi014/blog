import { paths } from '@/config/paths';
import { userSelector } from '@/redux/selector/user-selector';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

export const AuthGuard = ({children}:{ children: React.ReactNode}) => {
  const user = useSelector(userSelector)
  if (!user) {
    return (
      <Navigate to={paths.auth.login.getHref(location.pathname)} replace />
    );
  }
  return children;
};
