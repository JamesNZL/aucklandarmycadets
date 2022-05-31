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
			const res = await memoizedGot(`https://cdn.aucklandarmycadets.org.nz/${encodeURIComponent(url)}`)
			console.log(res)
			return
		},
		{
			concurrency: 8
		}
	)

	return
}

const memoizedGot = pMemoize(got)