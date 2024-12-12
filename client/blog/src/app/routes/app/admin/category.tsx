import { AdminContentLayout } from '@/components/layout/admin-content-layout';
import { CategoryList } from '@/features/admin/categories/components/category-list';

export const AdminCategoryRoute = () => {
  return (
    <div>
      <AdminContentLayout title='Category'>
        <CategoryList></CategoryList>
      </AdminContentLayout>
    </div>
  );
};

