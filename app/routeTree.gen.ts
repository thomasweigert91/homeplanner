/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as ProtectedImport } from './routes/_protected'
import { Route as IndexImport } from './routes/index'
import { Route as ProtectedTasksImport } from './routes/_protected.tasks'
import { Route as ProtectedStorageImport } from './routes/_protected.storage'
import { Route as ProtectedSettingsImport } from './routes/_protected.settings'
import { Route as ProtectedPlantsImport } from './routes/_protected.plants'
import { Route as ProtectedMealplanImport } from './routes/_protected.mealplan'
import { Route as ProtectedDashboardImport } from './routes/_protected.dashboard'

// Create/Update Routes

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const ProtectedRoute = ProtectedImport.update({
  id: '/_protected',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ProtectedTasksRoute = ProtectedTasksImport.update({
  id: '/tasks',
  path: '/tasks',
  getParentRoute: () => ProtectedRoute,
} as any)

const ProtectedStorageRoute = ProtectedStorageImport.update({
  id: '/storage',
  path: '/storage',
  getParentRoute: () => ProtectedRoute,
} as any)

const ProtectedSettingsRoute = ProtectedSettingsImport.update({
  id: '/settings',
  path: '/settings',
  getParentRoute: () => ProtectedRoute,
} as any)

const ProtectedPlantsRoute = ProtectedPlantsImport.update({
  id: '/plants',
  path: '/plants',
  getParentRoute: () => ProtectedRoute,
} as any)

const ProtectedMealplanRoute = ProtectedMealplanImport.update({
  id: '/mealplan',
  path: '/mealplan',
  getParentRoute: () => ProtectedRoute,
} as any)

const ProtectedDashboardRoute = ProtectedDashboardImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => ProtectedRoute,
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
    '/_protected': {
      id: '/_protected'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof ProtectedImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/_protected/dashboard': {
      id: '/_protected/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof ProtectedDashboardImport
      parentRoute: typeof ProtectedImport
    }
    '/_protected/mealplan': {
      id: '/_protected/mealplan'
      path: '/mealplan'
      fullPath: '/mealplan'
      preLoaderRoute: typeof ProtectedMealplanImport
      parentRoute: typeof ProtectedImport
    }
    '/_protected/plants': {
      id: '/_protected/plants'
      path: '/plants'
      fullPath: '/plants'
      preLoaderRoute: typeof ProtectedPlantsImport
      parentRoute: typeof ProtectedImport
    }
    '/_protected/settings': {
      id: '/_protected/settings'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof ProtectedSettingsImport
      parentRoute: typeof ProtectedImport
    }
    '/_protected/storage': {
      id: '/_protected/storage'
      path: '/storage'
      fullPath: '/storage'
      preLoaderRoute: typeof ProtectedStorageImport
      parentRoute: typeof ProtectedImport
    }
    '/_protected/tasks': {
      id: '/_protected/tasks'
      path: '/tasks'
      fullPath: '/tasks'
      preLoaderRoute: typeof ProtectedTasksImport
      parentRoute: typeof ProtectedImport
    }
  }
}

// Create and export the route tree

interface ProtectedRouteChildren {
  ProtectedDashboardRoute: typeof ProtectedDashboardRoute
  ProtectedMealplanRoute: typeof ProtectedMealplanRoute
  ProtectedPlantsRoute: typeof ProtectedPlantsRoute
  ProtectedSettingsRoute: typeof ProtectedSettingsRoute
  ProtectedStorageRoute: typeof ProtectedStorageRoute
  ProtectedTasksRoute: typeof ProtectedTasksRoute
}

const ProtectedRouteChildren: ProtectedRouteChildren = {
  ProtectedDashboardRoute: ProtectedDashboardRoute,
  ProtectedMealplanRoute: ProtectedMealplanRoute,
  ProtectedPlantsRoute: ProtectedPlantsRoute,
  ProtectedSettingsRoute: ProtectedSettingsRoute,
  ProtectedStorageRoute: ProtectedStorageRoute,
  ProtectedTasksRoute: ProtectedTasksRoute,
}

const ProtectedRouteWithChildren = ProtectedRoute._addFileChildren(
  ProtectedRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof ProtectedRouteWithChildren
  '/login': typeof LoginRoute
  '/dashboard': typeof ProtectedDashboardRoute
  '/mealplan': typeof ProtectedMealplanRoute
  '/plants': typeof ProtectedPlantsRoute
  '/settings': typeof ProtectedSettingsRoute
  '/storage': typeof ProtectedStorageRoute
  '/tasks': typeof ProtectedTasksRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof ProtectedRouteWithChildren
  '/login': typeof LoginRoute
  '/dashboard': typeof ProtectedDashboardRoute
  '/mealplan': typeof ProtectedMealplanRoute
  '/plants': typeof ProtectedPlantsRoute
  '/settings': typeof ProtectedSettingsRoute
  '/storage': typeof ProtectedStorageRoute
  '/tasks': typeof ProtectedTasksRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_protected': typeof ProtectedRouteWithChildren
  '/login': typeof LoginRoute
  '/_protected/dashboard': typeof ProtectedDashboardRoute
  '/_protected/mealplan': typeof ProtectedMealplanRoute
  '/_protected/plants': typeof ProtectedPlantsRoute
  '/_protected/settings': typeof ProtectedSettingsRoute
  '/_protected/storage': typeof ProtectedStorageRoute
  '/_protected/tasks': typeof ProtectedTasksRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/login'
    | '/dashboard'
    | '/mealplan'
    | '/plants'
    | '/settings'
    | '/storage'
    | '/tasks'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/login'
    | '/dashboard'
    | '/mealplan'
    | '/plants'
    | '/settings'
    | '/storage'
    | '/tasks'
  id:
    | '__root__'
    | '/'
    | '/_protected'
    | '/login'
    | '/_protected/dashboard'
    | '/_protected/mealplan'
    | '/_protected/plants'
    | '/_protected/settings'
    | '/_protected/storage'
    | '/_protected/tasks'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ProtectedRoute: typeof ProtectedRouteWithChildren
  LoginRoute: typeof LoginRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ProtectedRoute: ProtectedRouteWithChildren,
  LoginRoute: LoginRoute,
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
        "/_protected",
        "/login"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_protected": {
      "filePath": "_protected.tsx",
      "children": [
        "/_protected/dashboard",
        "/_protected/mealplan",
        "/_protected/plants",
        "/_protected/settings",
        "/_protected/storage",
        "/_protected/tasks"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/_protected/dashboard": {
      "filePath": "_protected.dashboard.tsx",
      "parent": "/_protected"
    },
    "/_protected/mealplan": {
      "filePath": "_protected.mealplan.tsx",
      "parent": "/_protected"
    },
    "/_protected/plants": {
      "filePath": "_protected.plants.tsx",
      "parent": "/_protected"
    },
    "/_protected/settings": {
      "filePath": "_protected.settings.tsx",
      "parent": "/_protected"
    },
    "/_protected/storage": {
      "filePath": "_protected.storage.tsx",
      "parent": "/_protected"
    },
    "/_protected/tasks": {
      "filePath": "_protected.tasks.tsx",
      "parent": "/_protected"
    }
  }
}
ROUTE_MANIFEST_END */
