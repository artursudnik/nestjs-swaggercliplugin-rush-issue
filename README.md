## Introduction

This repository isolates problem that is triggered when developing NestJS application with NestJS CLI plugin enabled and
within RushJS monorepository. Error is triggered when trying to execute production code.

## Steps to reproduce:

```shell
git clone https://github.com/artursudnik/nestjs-swaggercliplugin-rush-issue.git
cd nestjs-swaggercliplugin-rush-issue
rush install
cd apps/nestjs-app
npm run build
node dist/main.js
```

Application will crash and you will see the following:

```text
[Nest] 94062  - 06/27/2022, 3:17:20 PM     LOG [NestFactory] Starting Nest application...
[Nest] 94062  - 06/27/2022, 3:17:20 PM     LOG [InstanceLoader] AppModule dependencies initialized +14ms
node:internal/modules/cjs/loader:933
  const err = new Error(message);
              ^

Error: Cannot find module '.pnpm/@sphereon+pex@1.0.2/node_modules/@sphereon/pex/dist/main/lib/types/SSI.types'
Require stack:
- /Users/artur/nestjs-swaggercliplugin-rush-issue/apps/nestjs-app/dist/dtos/test1.dto.js
- /Users/artur/nestjs-swaggercliplugin-rush-issue/apps/nestjs-app/dist/app.controller.js
- /Users/artur/nestjs-swaggercliplugin-rush-issue/apps/nestjs-app/dist/app.module.js
- /Users/artur/nestjs-swaggercliplugin-rush-issue/apps/nestjs-app/dist/main.js
    at Function.Module._resolveFilename (node:internal/modules/cjs/loader:933:15)
    at Function.Module._load (node:internal/modules/cjs/loader:778:27)
    at Module.require (node:internal/modules/cjs/loader:1005:19)
    at require (node:internal/modules/cjs/helpers:102:18)
    at Function._OPENAPI_METADATA_FACTORY (/Users/artur/nestjs-swaggercliplugin-rush-issue/apps/nestjs-app/dist/dtos/test1.dto.js:7:105)
    at ModelPropertiesAccessor.applyMetadataFactory (/Users/artur/nestjs-swaggercliplugin-rush-issue/common/temp/node_modules/.pnpm/@nestjs+swagger@5.2.1_d698c50e080e28585857283d96ea096d/node_modules/@nestjs/swagger/dist/services/model-properties-accessor.js:27:93)
    at SchemaObjectFactory.extractPropertiesFromType (/Users/artur/nestjs-swaggercliplugin-rush-issue/common/temp/node_modules/.pnpm/@nestjs+swagger@5.2.1_d698c50e080e28585857283d96ea096d/node_modules/@nestjs/swagger/dist/services/schema-object-factory.js:76:38)
    at SchemaObjectFactory.exploreModelSchema (/Users/artur/nestjs-swaggercliplugin-rush-issue/common/temp/node_modules/.pnpm/@nestjs+swagger@5.2.1_d698c50e080e28585857283d96ea096d/node_modules/@nestjs/swagger/dist/services/schema-object-factory.js:92:41)
    at /Users/artur/nestjs-swaggercliplugin-rush-issue/common/temp/node_modules/.pnpm/@nestjs+swagger@5.2.1_d698c50e080e28585857283d96ea096d/node_modules/@nestjs/swagger/dist/services/schema-object-factory.js:33:36
    at Array.map (<anonymous>) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [
    '/Users/artur/nestjs-swaggercliplugin-rush-issue/apps/nestjs-app/dist/dtos/test1.dto.js',
    '/Users/artur/nestjs-swaggercliplugin-rush-issue/apps/nestjs-app/dist/app.controller.js',
    '/Users/artur/nestjs-swaggercliplugin-rush-issue/apps/nestjs-app/dist/app.module.js',
    '/Users/artur/nestjs-swaggercliplugin-rush-issue/apps/nestjs-app/dist/main.js'
  ]
}
```

When starting the code in developer mode, it is executed correctly:

```shell
npm run start:dev
```

However, after purging files:

```shell
rush purge
```

And building NestJS application as it would be standalone, not part of a monorepo:

```shell
npm i
npm run build
```

Executing the code, starts the application as expected:
```shell
node dist/main.js
```
```text
[Nest] 94627  - 06/27/2022, 3:26:11 PM     LOG [NestFactory] Starting Nest application...
[Nest] 94627  - 06/27/2022, 3:26:11 PM     LOG [InstanceLoader] AppModule dependencies initialized +13ms
[Nest] 94627  - 06/27/2022, 3:26:11 PM     LOG [RoutesResolver] AppController {/}: +80ms
[Nest] 94627  - 06/27/2022, 3:26:11 PM     LOG [RouterExplorer] Mapped {/, GET} route +1ms
[Nest] 94627  - 06/27/2022, 3:26:11 PM     LOG [RouterExplorer] Mapped {/test1, POST} route +1ms
[Nest] 94627  - 06/27/2022, 3:26:11 PM     LOG [NestApplication] Nest application successfully started +0ms
```
