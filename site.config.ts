import { siteConfig } from './lib/site-config';

export default siteConfig({
  // the site's root Notion page (required)
  rootNotionPageId: 'd9e4d2d799734db09a547021f200d5bc',

  // if you want to restrict pages to a single notion workspace (optional)
  // (this should be a Notion ID; see the docs for how to extract this)
  rootNotionSpaceId: '3b5f4a31dd744bd4981a1d29fb5ee924',

  // basic site info (required)
  name: 'City of Auckland Cadet Unit',
  domain: 'www.aucklandarmycadets.com',
  author: 'City of Auckland Cadet Unit',

  // open graph metadata (optional)
  description: 'We are part of the New Zealand Cadet Forces (NZCF) — a military-styled, volunteer, youth organisation for NZ\'s successful leaders of tomorrow.',

  // default notion icon and cover images for site-wide consistency (optional)
  // page-specific values will override these site-wide defaults
  defaultPageIcon: null,
  defaultPageCover: null,
  defaultPageCoverPosition: 0.5,

  // whether or not to enable support for LQIP preview images (optional)
  isPreviewImageSupportEnabled: true,

  // whether or not redis is enabled for caching generated preview images (optional)
  // NOTE: if you enable redis, you need to set the `REDIS_HOST` and `REDIS_PASSWORD`
  // environment variables. see the readme for more info
  isRedisEnabled: false,

  // map of notion page IDs to URL paths (optional)
  // any pages defined here will override their default URL paths
  // example:
  //
  // pageUrlOverrides: {
  //   '/foo': '067dd719a912471ea9a3ac10710e7fdf',
  //   '/bar': '0be6efce9daf42688f65c76b89f8eb27'
  // }
  // define these overrides in the exposedRouteDatabase

  exposedRouteDatabaseId: '26d0c0dad7a34b8e81766d800c3b174f',

  // whether to use the default notion navigation style or a custom one with links to
  // important pages
  // navigationStyle: 'default'
  navigationStyle: 'custom',
  navigationLinks: [
    {
      title: 'Home',
      anchorId: '#'
    },
    {
      title: 'Unit',
      anchorId: '#6a4e761d9698400b8d696b4b1d00c074',
    },
    {
      title: 'Join',
      anchorId: '#03047a8065cc4fe494c7cc09ef0d842a'
    },
    {
      title: 'Training',
      anchorId: '#214aa91c3dc34e1ca7e8c703f86df8be'
    },
    {
      title: 'FAQ',
      pageId: '687e21f7605047dd9ab0a971b81f550f'
    },
    {
      title: 'Contact Us',
      anchorId: '#b87d8ff64db944fea9ab1b7ad4ea982e'
    },
  ]
});
