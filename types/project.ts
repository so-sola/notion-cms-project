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
}
