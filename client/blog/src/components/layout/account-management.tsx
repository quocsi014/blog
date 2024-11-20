import { paths } from '@/config/paths';
import { Link } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import { useLogout } from '@/features/auth/apis/logout';
import { useSelector } from 'react-redux';
import {
  userSelector,
} from '@/redux/selector/user-selector';
import { Avatar } from '@/components/avatar';

export const AccountManagement = () => {
  const user = useSelector(userSelector);
  const { mutate } = useLogout({});
  return (
    <div className='flex items-center h-fit'>
      {user ? (
        <Fragment>
          <Avatar
            avatarUrl={user.avatar_url}
            firstName={user.first_name}
            lastName={user.last_name}
          />
          <div className='border-l-2 mx-4 border-black self-stretch'></div>
          <span
            className='cursor-pointer'
            onClick={() => {
              mutate(undefined);
            }}
          >
            Log out
          </span>
        </Fragment>
      ) : (
        <Fragment>
          <Link to={paths.auth.login.getHref()}>Login</Link>
          <div className='border-l-2 mx-4 border-black'></div>
          <Link to={paths.auth.register.getHref()}>Register</Link>
        </Fragment>
      )}
    </div>
  );
};
