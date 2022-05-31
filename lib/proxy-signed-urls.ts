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
			console.log(`Fetching https://cdn.aucklandarmycadets.org.nz/${encodeURIComponent(url)}`)
			try {
				const res = await memoizedGot(`https://cdn.aucklandarmycadets.org.nz/${encodeURIComponent(url)}`)
				console.log(`Fetched https://cdn.aucklandarmycadets.org.nz/${encodeURIComponent(url)}`)
				if (res.statusCode < 200 || res.statusCode >= 300) console.log(res)
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