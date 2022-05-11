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
  description: 'The City of Auckland Cadet Unit is part of the New Zealand Cadet Forces (NZCF), a military-styled, volunteer, youth organisation.',

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
  pageUrlOverrides: {
    '/covid-19': '8179d6fd04064574a211bf5b0f624b9e'
  },

  exposedRouteIds: [
    'd9e4d2d799734db09a547021f200d5bc',
    '25109801828247598e668318a66ea73b',
    '2ffc4c76c2ed40a7af1cb70f4e6860d2',
    'd04d370a69944ae2a19ef40cd57856cc',
    '88e040db05f840409ae366d1aea1324a',
    '2076120a98a24d91b81c2fd4799d8b87',
    '687e21f7605047dd9ab0a971b81f550f',
    'b9644ebf38f742329d3f38b600d07e51',
    'f5acad4db5894467a574b88caa3f5d5c',
    '8179d6fd04064574a211bf5b0f624b9e'
  ],

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
