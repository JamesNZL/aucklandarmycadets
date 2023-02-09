import got from 'got'
import pMap from 'p-map'
import pMemoize from 'p-memoize'
import { ExtendedRecordMap } from 'notion-types'

export async function proxySignedUrls(
  recordMap: ExtendedRecordMap
): Promise<void> {
  const urls: string[] = Object.values(recordMap.signed_urls)

  await pMap(
    urls,
    async (url) => {
      console.log('Fetching', {
        fetched: false,
        fullUrl: `https://cdn.aucklandarmycadets.org.nz/${encodeURIComponent(url)}`,
        filename: url.match(/\/([^/]*)\??X?/)?.[1]
      })

      try {
        const res = await memoizedGot(`https://cdn.aucklandarmycadets.org.nz/${encodeURIComponent(url)}`)

        console.log('Fetched', {
          fetched: true,
          fullUrl: `https://cdn.aucklandarmycadets.org.nz/${encodeURIComponent(url)}`,
          filename: url.match(/\/([^/]*)\??X?/)?.[1]
        })

        if (res.statusCode < 200 || res.statusCode >= 300) console.warn('res error', { res })
      } catch (err) {
        console.warn(err)
      }

      return
    },
    {
      concurrency: 8
    }
  )

  return
}

const memoizedGot = pMemoize(got)