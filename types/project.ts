export interface Project {
  id: string
  /** 제목 */
  title: string
  /** 설명 */
  description: string
  /** 썸네일 (파일이 없는 경우 null) */
  thumbnailUrl: string | null
  /** 태그 */
  tags: string[]
  /** 링크 (GitHub/데모, 비어있는 경우 null) */
  link: string | null
  /** 공개여부 */
  isPublished: boolean
  /** 정렬순서 (선택 필드) */
  order: number | null
  /** 케이스 스터디: 문제 정의 */
  problemDefinition: string
  /** 케이스 스터디: 목표 */
  goal: string
  /** 케이스 스터디: 과정 */
  process: string
  /** 케이스 스터디: 결과 */
  result: string
  /** 프로젝트 진행 기간 */
  period: string
  /** 담당 역할 */
  role: string
  /** 팀 구성 */
  team: string
}
