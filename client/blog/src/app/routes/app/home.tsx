import { ContentLayout } from '@/components/layout/content-layout';
import { Home } from '@/features/home/components/home';

export const PostsRoute = () => {
  return (
    <ContentLayout title='TechBlog'>
      <Home />
    </ContentLayout>
  );
};
