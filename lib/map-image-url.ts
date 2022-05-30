import fetch from 'isomorphic-unfetch'

import { Block } from 'notion-types'
import { defaultMapImageUrl } from 'react-notion-x'

import { defaultPageIcon, defaultPageCover } from './config'

export const mapImageUrl = (url: string, block: Block) => {
  if (url === defaultPageCover || url === defaultPageIcon) {
    return url
  }

  const mappedUrl = defaultMapImageUrl(url, block);

  return mappedUrl

  if (!mappedUrl.includes('X-Amz')) {
    return mappedUrl
  }

  const cdnUrl = `https://cdn.aucklandarmycadets.org.nz/${encodeURIComponent(mappedUrl)}`

  // cache the fully authorised url in the cdn in a non-blocking manner
  // TODO: there must be a better way than this?
  fetch(cdnUrl)

  return cdnUrl.replace(/X-Amz-.*?%26/g, '')
}
