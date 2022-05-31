import pMap from 'p-map'
import pMemoize from 'p-memoize'
import { ExtendedRecordMap, SearchParams, SearchResults } from 'notion-types'
import { mergeRecordMaps, uuidToId } from 'notion-utils'

import { notion } from './notion-api'
import { getPreviewImageMap } from './preview-images'
import { proxySignedUrls } from './proxy-signed-urls'
import {
  isPreviewImageSupportEnabled,
  navigationStyle,
  navigationLinks
} from './config'

const getNavigationLinkPages = pMemoize(
  async (): Promise<ExtendedRecordMap[]> => {
    const navigationLinkPageIds = (navigationLinks || [])
      .map((link) => link.pageId)
      .filter(Boolean)

    if (navigationStyle !== 'default' && navigationLinkPageIds.length) {
      return pMap(
        navigationLinkPageIds,
        async (navigationLinkPageId) =>
          notion.getPage(navigationLinkPageId, {
            chunkLimit: 1,
            fetchMissingBlocks: false,
            fetchCollections: false,
            signFileUrls: false
          }),
        {
          concurrency: 4
        }
      )
    }

    return []
  }
)

export const UNAUTHORISED: unique symbol = Symbol('Unauthorised');

export async function getPage(pageId: string, exposedPageIds: string[]): Promise<ExtendedRecordMap | typeof UNAUTHORISED> {
  // don't bother fetching the page if it's not an exposed route
  if (exposedPageIds.length && !exposedPageIds.includes(uuidToId(pageId))) return UNAUTHORISED;

  let recordMap = await notion.getPage(pageId)

  if (navigationStyle !== 'default') {
    // ensure that any pages linked to in the custom navigation header have
    // their block info fully resolved in the page record map so we know
    // the page title, slug, etc.
    const navigationLinkRecordMaps = await getNavigationLinkPages()

    if (navigationLinkRecordMaps?.length) {
      recordMap = navigationLinkRecordMaps.reduce(
        (map, navigationLinkRecordMap) =>
          mergeRecordMaps(map, navigationLinkRecordMap),
        recordMap
      )
    }
  }

  // ensure signed urls are cached in the proxy before proceeding
  await proxySignedUrls(recordMap);

  console.log('Generating preview images')

  if (isPreviewImageSupportEnabled) {
    const previewImageMap = await getPreviewImageMap(recordMap)
      ; (recordMap as any).preview_images = previewImageMap
  }

  return recordMap
}

export async function search(params: SearchParams): Promise<SearchResults> {
  return notion.search(params)
}
