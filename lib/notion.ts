import { Client, isFullDatabase, isFullPage } from '@notionhq/client'
import type { PageObjectResponse } from '@notionhq/client'
import type { Project } from '@/types/project'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

let cachedDataSourceId: string | null = null

async function resolveDataSourceId(): Promise<string> {
  if (cachedDataSourceId) return cachedDataSourceId

  const database = await notion.databases.retrieve({
    database_id: process.env.NOTION_DATABASE_ID!,
  })
  if (!isFullDatabase(database)) {
    throw new Error('Notion 데이터베이스 응답이 불완전합니다 (권한 또는 Integration 연결을 확인하세요).')
  }

  cachedDataSourceId = database.data_sources[0].id
  return cachedDataSourceId
}

function getPlainText(richText: { plain_text: string }[]): string {
  return richText.map((item) => item.plain_text).join('')
}

function getThumbnailUrl(page: PageObjectResponse): string | null {
  const property = page.properties['썸네일']
  if (property.type !== 'files') return null

  const file = property.files[0]
  if (!file) return null

  return file.type === 'external' ? file.external.url : file.file.url
}

function parseProject(page: PageObjectResponse): Project {
  const properties = page.properties

  const title = properties['제목']
  const description = properties['설명']
  const tags = properties['태그']
  const link = properties['링크']
  const isPublished = properties['공개여부']
  const order = properties['정렬순서']

  if (
    title.type !== 'title' ||
    description.type !== 'rich_text' ||
    tags.type !== 'multi_select' ||
    link.type !== 'url' ||
    isPublished.type !== 'checkbox' ||
    order.type !== 'number'
  ) {
    throw new Error(`Notion 프로젝트 속성 타입이 예상과 다릅니다 (page id: ${page.id})`)
  }

  return {
    id: page.id,
    title: getPlainText(title.title),
    description: getPlainText(description.rich_text),
    thumbnailUrl: getThumbnailUrl(page),
    tags: tags.multi_select.map((option) => option.name),
    link: link.url,
    isPublished: isPublished.checkbox,
    order: order.number,
  }
}

export async function getPublishedProjects(): Promise<Project[]> {
  const dataSourceId = await resolveDataSourceId()

  const response = await notion.dataSources.query({
    data_source_id: dataSourceId,
    filter: { property: '공개여부', checkbox: { equals: true } },
    sorts: [{ property: '정렬순서', direction: 'ascending' }],
  })

  return response.results.filter(isFullPage).map(parseProject)
}
