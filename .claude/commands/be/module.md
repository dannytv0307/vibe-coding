Create a production-ready NestJS module with full CRUD scaffold.

Input: $ARGUMENTS
Format: `<ModuleName> [type]`
- type options: `crud` (default) | `service-only` | `auth`

---

## Role
You are a Senior Backend Engineer with 10+ years of NestJS experience. You generate modules that are: type-safe, testable, well-structured, and follow NestJS best practices.

---

## Step 1 — Validate & Parse Input

- If `$ARGUMENTS` is empty → stop and ask: "Vui lòng cung cấp tên module. Ví dụ: /be:module Product crud"
- Parse ModuleName (PascalCase). Auto-convert camelCase / kebab-case to PascalCase.
- Route and file names use kebab-case: `<module-name>`
- Parse type (default: `crud`)

---

## Step 2 — Determine destination

Module destination: `backend/src/<module-name>/`

Verify `backend/src/app.module.ts` exists — needed for registration in Step 4.

---

## Step 3 — Generate files

### For `crud` type — create 6 files:

**`<module-name>.module.ts`**
```ts
import { Module } from '@nestjs/common'
import { <ModuleName>Controller } from './<module-name>.controller'
import { <ModuleName>Service } from './<module-name>.service'

@Module({
  controllers: [<ModuleName>Controller],
  providers: [<ModuleName>Service],
  exports: [<ModuleName>Service],
})
export class <ModuleName>Module {}
```

**`<module-name>.controller.ts`**
```ts
import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { <ModuleName>Service } from './<module-name>.service'
import { Create<ModuleName>Dto } from './dto/create-<module-name>.dto'
import { Update<ModuleName>Dto } from './dto/update-<module-name>.dto'

@Controller('<module-name>s')
export class <ModuleName>Controller {
  constructor(private readonly <moduleName>Service: <ModuleName>Service) {}

  @Post()
  create(@Body() dto: Create<ModuleName>Dto) {
    return this.<moduleName>Service.create(dto)
  }

  @Get()
  findAll() {
    return this.<moduleName>Service.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.<moduleName>Service.findOne(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Update<ModuleName>Dto) {
    return this.<moduleName>Service.update(id, dto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.<moduleName>Service.remove(id)
  }
}
```

**`<module-name>.service.ts`**
```ts
import { Injectable, NotFoundException } from '@nestjs/common'
import { Create<ModuleName>Dto } from './dto/create-<module-name>.dto'
import { Update<ModuleName>Dto } from './dto/update-<module-name>.dto'

@Injectable()
export class <ModuleName>Service {
  // TODO: inject repository (TypeORM / Prisma / Mongoose)

  async create(dto: Create<ModuleName>Dto) {
    // TODO: implement
    throw new Error('Not implemented')
  }

  async findAll() {
    // TODO: implement
    return []
  }

  async findOne(id: string) {
    // TODO: implement
    throw new NotFoundException(`<ModuleName> #${id} not found`)
  }

  async update(id: string, dto: Update<ModuleName>Dto) {
    // TODO: implement
    throw new Error('Not implemented')
  }

  async remove(id: string) {
    // TODO: implement
    throw new Error('Not implemented')
  }
}
```

**`dto/create-<module-name>.dto.ts`**
```ts
import { IsString, IsNotEmpty } from 'class-validator'

export class Create<ModuleName>Dto {
  @IsString()
  @IsNotEmpty()
  name: string

  // add fields as needed
}
```

**`dto/update-<module-name>.dto.ts`**
```ts
import { PartialType } from '@nestjs/mapped-types'
import { Create<ModuleName>Dto } from './create-<module-name>.dto'

export class Update<ModuleName>Dto extends PartialType(Create<ModuleName>Dto) {}
```

**`<module-name>.service.spec.ts`** — Unit test
```ts
import { Test, TestingModule } from '@nestjs/testing'
import { <ModuleName>Service } from './<module-name>.service'

describe('<ModuleName>Service', () => {
  let service: <ModuleName>Service

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [<ModuleName>Service],
    }).compile()

    service = module.get<<ModuleName>Service>(<ModuleName>Service)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  // add domain-specific tests here
})
```

### For `service-only` type — create 3 files:
- `<module-name>.module.ts` (no controller)
- `<module-name>.service.ts`
- `<module-name>.service.spec.ts`

### For `auth` type — create 6 files:
Same as `crud` but controller has:
- `POST /auth/login`
- `POST /auth/register`
- `POST /auth/refresh`
- `POST /auth/logout`
Uses `JwtModule`, `PassportModule` in the module imports.

---

## Step 4 — Register in AppModule

Open `backend/src/app.module.ts` and add:
```ts
import { <ModuleName>Module } from './<module-name>/<module-name>.module'

// inside @Module imports array:
<ModuleName>Module,
```

---

## Step 5 — Report

```
✅ Module created: <ModuleName>Module [type: <type>]

Files:
  backend/src/<module-name>/
    ├── <module-name>.module.ts
    ├── <module-name>.controller.ts
    ├── <module-name>.service.ts
    ├── <module-name>.service.spec.ts
    └── dto/
        ├── create-<module-name>.dto.ts
        └── update-<module-name>.dto.ts

Registered in: backend/src/app.module.ts

Next:
  - Inject your repository / database provider into the service
  - Add validation pipe globally or per-controller
  - Run tests: npm run test -- <module-name>
```

---

## Senior Dev Rules (ALWAYS apply)

- **DTOs for every request** — never accept raw `any` body
- **`PartialType` for update DTOs** — DRY, automatic partial validation
- **`NotFoundException` / `BadRequestException`** — use NestJS built-in HTTP exceptions
- **Service layer owns business logic** — controllers are thin (only parse + delegate)
- **Always export service** — other modules may need to inject it
- **`class-validator` + `class-transformer`** — validate at the boundary
- **Spec files co-located** — `*.service.spec.ts` next to the service
- **No `any`** — type everything, use generics where needed
- **Strict TypeScript** — tsconfig `strict: true`
