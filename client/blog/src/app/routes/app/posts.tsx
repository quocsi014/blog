import { AppLayout } from "@/components/layout/app-layout"
import { Posts } from "@/features/post/posts-list"

export const PostsRoute = ()=>{
  return(
    <AppLayout title="TechBlog">
      <Posts/>
    </AppLayout>
  )
}