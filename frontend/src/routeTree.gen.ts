/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as SigninIndexImport } from './routes/signin/index'
import { Route as ProfileProfileIdIndexImport } from './routes/profile/$profileId/index'
import { Route as ProfileProfileIdStoriesIndexImport } from './routes/profile/$profileId/stories/index'
import { Route as ProfileProfileIdStoriesStoryIdImport } from './routes/profile/$profileId/stories/$storyId'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const SigninIndexRoute = SigninIndexImport.update({
  id: '/signin/',
  path: '/signin/',
  getParentRoute: () => rootRoute,
} as any)

const ProfileProfileIdIndexRoute = ProfileProfileIdIndexImport.update({
  id: '/profile/$profileId/',
  path: '/profile/$profileId/',
  getParentRoute: () => rootRoute,
} as any)

const ProfileProfileIdStoriesIndexRoute =
  ProfileProfileIdStoriesIndexImport.update({
    id: '/profile/$profileId/stories/',
    path: '/profile/$profileId/stories/',
    getParentRoute: () => rootRoute,
  } as any)

const ProfileProfileIdStoriesStoryIdRoute =
  ProfileProfileIdStoriesStoryIdImport.update({
    id: '/profile/$profileId/stories/$storyId',
    path: '/profile/$profileId/stories/$storyId',
    getParentRoute: () => rootRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/signin/': {
      id: '/signin/'
      path: '/signin'
      fullPath: '/signin'
      preLoaderRoute: typeof SigninIndexImport
      parentRoute: typeof rootRoute
    }
    '/profile/$profileId/': {
      id: '/profile/$profileId/'
      path: '/profile/$profileId'
      fullPath: '/profile/$profileId'
      preLoaderRoute: typeof ProfileProfileIdIndexImport
      parentRoute: typeof rootRoute
    }
    '/profile/$profileId/stories/$storyId': {
      id: '/profile/$profileId/stories/$storyId'
      path: '/profile/$profileId/stories/$storyId'
      fullPath: '/profile/$profileId/stories/$storyId'
      preLoaderRoute: typeof ProfileProfileIdStoriesStoryIdImport
      parentRoute: typeof rootRoute
    }
    '/profile/$profileId/stories/': {
      id: '/profile/$profileId/stories/'
      path: '/profile/$profileId/stories'
      fullPath: '/profile/$profileId/stories'
      preLoaderRoute: typeof ProfileProfileIdStoriesIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/signin': typeof SigninIndexRoute
  '/profile/$profileId': typeof ProfileProfileIdIndexRoute
  '/profile/$profileId/stories/$storyId': typeof ProfileProfileIdStoriesStoryIdRoute
  '/profile/$profileId/stories': typeof ProfileProfileIdStoriesIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/signin': typeof SigninIndexRoute
  '/profile/$profileId': typeof ProfileProfileIdIndexRoute
  '/profile/$profileId/stories/$storyId': typeof ProfileProfileIdStoriesStoryIdRoute
  '/profile/$profileId/stories': typeof ProfileProfileIdStoriesIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/signin/': typeof SigninIndexRoute
  '/profile/$profileId/': typeof ProfileProfileIdIndexRoute
  '/profile/$profileId/stories/$storyId': typeof ProfileProfileIdStoriesStoryIdRoute
  '/profile/$profileId/stories/': typeof ProfileProfileIdStoriesIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/signin'
    | '/profile/$profileId'
    | '/profile/$profileId/stories/$storyId'
    | '/profile/$profileId/stories'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/signin'
    | '/profile/$profileId'
    | '/profile/$profileId/stories/$storyId'
    | '/profile/$profileId/stories'
  id:
    | '__root__'
    | '/'
    | '/signin/'
    | '/profile/$profileId/'
    | '/profile/$profileId/stories/$storyId'
    | '/profile/$profileId/stories/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  SigninIndexRoute: typeof SigninIndexRoute
  ProfileProfileIdIndexRoute: typeof ProfileProfileIdIndexRoute
  ProfileProfileIdStoriesStoryIdRoute: typeof ProfileProfileIdStoriesStoryIdRoute
  ProfileProfileIdStoriesIndexRoute: typeof ProfileProfileIdStoriesIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  SigninIndexRoute: SigninIndexRoute,
  ProfileProfileIdIndexRoute: ProfileProfileIdIndexRoute,
  ProfileProfileIdStoriesStoryIdRoute: ProfileProfileIdStoriesStoryIdRoute,
  ProfileProfileIdStoriesIndexRoute: ProfileProfileIdStoriesIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/signin/",
        "/profile/$profileId/",
        "/profile/$profileId/stories/$storyId",
        "/profile/$profileId/stories/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/signin/": {
      "filePath": "signin/index.tsx"
    },
    "/profile/$profileId/": {
      "filePath": "profile/$profileId/index.tsx"
    },
    "/profile/$profileId/stories/$storyId": {
      "filePath": "profile/$profileId/stories/$storyId.tsx"
    },
    "/profile/$profileId/stories/": {
      "filePath": "profile/$profileId/stories/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
