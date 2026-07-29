import { ProjectShowcase } from "@/components/project-showcase"
import { getPublishedProjects } from "@/lib/notion"

// Notion 데이터 페칭을 별도 컴포넌트로 분리해 Suspense 경계로 감싸기 위한 서버 컴포넌트
async function ProjectShowcaseSection() {
  const projects = await getPublishedProjects()

  return <ProjectShowcase projects={projects} />
}

export { ProjectShowcaseSection }
