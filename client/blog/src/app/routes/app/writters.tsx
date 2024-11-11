import { AppLayout } from "@/components/layout/app-layout"
import { WritterList } from "@/features/writter/wirtter-list"

export const WrittersRoute = ()=>{
  return(
    <AppLayout title="TechBlog">
      <WritterList/>
    </AppLayout>
  )
}