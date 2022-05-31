import { Block } from 'notion-types'
import { defaultMapImageUrl } from 'react-notion-x'

import { defaultPageIcon, defaultPageCover } from './config'

export const mapImageUrl = (url: string, block: Block, keepSignedUrls = false) => {
  if (url === defaultPageCover || url === defaultPageIcon) {
    return url
  }

  const mappedUrl = defaultMapImageUrl(url, block);

  if (!mappedUrl.includes('X-Amz')) {
    return mappedUrl
  }

  const cdnUrl = `https://cdn.aucklandarmycadets.org.nz/${encodeURIComponent(mappedUrl)}`

  return (keepSignedUrls)
    ? cdnUrl
    : cdnUrl.replace(/X-Amz-.*?%26/g, '')
}
