# Auth0-SPA-Fullstack-Template

This is a fullstack template for Auth0.

## Tech Stack

### Package Management

- [Turbo](https://turbo.build/repo/docs)
- [pnpm](https://pnpm.io/)

### Frontend

- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [Apollo Client](https://www.apollographql.com/docs/react/)

### Backend

- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [NestJS](https://nestjs.com/)
- [GraphQL](https://graphql.org/)
- [GraphQL Code Generator](https://www.graphql-code-generator.com/)

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `frontend`: a [Vite](https://vite.dev/) and a [React](https://reactjs.org/) app
- `backend`: a [NestJS](https://nestjs.com/) app
- `@repo/ui`: a stub React component library shared by `frontend` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

## How to develop?

依存関係があるので、以下の順番で実行する。
※ いずれ解消する予定

#### 1. Lunch the Backend Server

```bash
pnpm start:dev
```

#### 2. Generate GraphQL Schema

```bash
pnpm codegen
```

#### 3. Lunch the Frontend Server

```
pnpm dev
```
