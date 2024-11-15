import { ContentLayout } from "@/components/layout/content-layout"
import { WritterList } from "@/features/writter/wirtter-list"

export const WrittersRoute = ()=>{
  return(
    <ContentLayout title="Author">
      <WritterList/>
    </ContentLayout>
  )
}