import { uuidToId } from 'notion-utils'

import { notion } from './notion-api'
import { rootNotionPageId, exposedRouteDatabaseId, cleanPageUrlMap } from './config';
import { PageUrlOverridesInverseMap, PageUrlOverridesMap } from './types'

const prependSlash = (slug) => (slug[0] === '/') ? slug : `/${slug}`

async function queryDatabase(): Promise<{
	exposedRouteIds: string[],
	pageUrlOverrides: PageUrlOverridesMap
}> {

	if (!exposedRouteDatabaseId) return {
		exposedRouteIds: [],
		pageUrlOverrides: {}
	}

	const recordMap = await notion.getPage(exposedRouteDatabaseId)

	const [collectionPointerId, { value: { schema } }] = Object.entries(recordMap.collection)
		.find(([, { value: { parent_id } }]) => uuidToId(parent_id) === exposedRouteDatabaseId)

	let slugProperty;
	try {
		[slugProperty] = Object.entries(schema).find(([, { name }]) => name.toUpperCase().includes('SLUG'))
	}
	catch {
		throw new Error('Cannot find slug override property in exposed routes database')
	}

	const [exposedRouteIds, pageUrlOverrides] = Object.values(recordMap.block)
		.filter(({ value: { parent_id } }) => parent_id === collectionPointerId)
		.filter(({ value: { properties } }) => properties?.title?.[0]?.[1]?.[0]?.[0] === 'p')
		.reduce(
			(
				[routeIds, overrides],
				{ value: { properties: { title: [[, [[, pageId]]]], [slugProperty]: [[slug]] = [[]] } } }
			) => (slug) ? [[...routeIds, uuidToId(pageId)], { ...overrides, [prependSlash(slug)]: uuidToId(pageId) }] : [[...routeIds, uuidToId(pageId)], overrides],
			[[], {}]
		)

	// ensure root id is exposed
	if (!exposedRouteIds.includes(rootNotionPageId)) exposedRouteIds.push(rootNotionPageId)

	return {
		exposedRouteIds,
		pageUrlOverrides
	}
}

export async function getExposedRouteIds(): Promise<string[]> {
	return (await queryDatabase()).exposedRouteIds
}

export async function getPageUrlOverrides(): Promise<PageUrlOverridesMap> {
	return cleanPageUrlMap(
		(await queryDatabase()).pageUrlOverrides,
		{ label: 'pageUrlOverrides' }
	)
}

export async function getInversePageUrlOverrides(): Promise<PageUrlOverridesInverseMap> {
	return invertPageUrlOverrides(await getPageUrlOverrides())
}

function invertPageUrlOverrides(
	pageUrlOverrides: PageUrlOverridesMap
): PageUrlOverridesInverseMap {
	return Object.keys(pageUrlOverrides).reduce((acc, uri) => {
		const pageId = pageUrlOverrides[uri]

		return {
			...acc,
			[pageId]: uri
		}
	}, {})
}