import { RoleGuard } from '@/guard/role-guard';

export const AdminPostRoute = () => {
  return (
    <RoleGuard roles={['ADMIN']}>
      <div>post</div>
    </RoleGuard>
  );
};
