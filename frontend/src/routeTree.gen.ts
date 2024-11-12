/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SigninIndexImport } from './routes/signin/index'

// Create Virtual Routes

const MyStoriesLazyImport = createFileRoute('/myStories')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const MyStoriesLazyRoute = MyStoriesLazyImport.update({
  id: '/myStories',
  path: '/myStories',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/myStories.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const SigninIndexRoute = SigninIndexImport.update({
  id: '/signin/',
  path: '/signin/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/myStories': {
      id: '/myStories'
      path: '/myStories'
      fullPath: '/myStories'
      preLoaderRoute: typeof MyStoriesLazyImport
      parentRoute: typeof rootRoute
    }
    '/signin/': {
      id: '/signin/'
      path: '/signin'
      fullPath: '/signin'
      preLoaderRoute: typeof SigninIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/myStories': typeof MyStoriesLazyRoute
  '/signin': typeof SigninIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/myStories': typeof MyStoriesLazyRoute
  '/signin': typeof SigninIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/myStories': typeof MyStoriesLazyRoute
  '/signin/': typeof SigninIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/myStories' | '/signin'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/myStories' | '/signin'
  id: '__root__' | '/' | '/myStories' | '/signin/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  MyStoriesLazyRoute: typeof MyStoriesLazyRoute
  SigninIndexRoute: typeof SigninIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  MyStoriesLazyRoute: MyStoriesLazyRoute,
  SigninIndexRoute: SigninIndexRoute,
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
        "/myStories",
        "/signin/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/myStories": {
      "filePath": "myStories.lazy.tsx"
    },
    "/signin/": {
      "filePath": "signin/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */