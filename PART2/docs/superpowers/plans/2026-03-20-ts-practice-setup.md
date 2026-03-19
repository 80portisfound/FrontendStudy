# TypeScript 실습 환경 구성 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** PART2/ 안에 tsx로 바로 실행 가능한 TypeScript 문법 실습 환경을 구성한다.

**Architecture:** `PART2/ts-practice/`에 독립 package.json과 tsconfig.json을 두고, 주제별 폴더(01-basic, 02-generics, 03-advanced)에 예제 `.ts` 파일과 README를 배치한다. tsx로 파일을 실행하며 결과를 console.log로 확인한다.

**Tech Stack:** TypeScript 5.7, tsx 4.19, Node.js (CommonJS)

---

### Task 1: 프로젝트 설정 파일 생성

**Files:**
- Create: `PART2/ts-practice/.gitignore`
- Create: `PART2/ts-practice/package.json`
- Create: `PART2/ts-practice/tsconfig.json`

- [ ] **Step 1: .gitignore 생성**

`PART2/ts-practice/.gitignore`:
```
node_modules/
```

- [ ] **Step 2: package.json 생성**

`PART2/ts-practice/package.json`:
```json
{
  "name": "ts-practice",
  "version": "1.0.0",
  "scripts": {
    "basic": "tsx 01-basic/types.ts",
    "generics": "tsx 02-generics/generics.ts",
    "advanced": "tsx 03-advanced/advanced.ts"
  },
  "devDependencies": {
    "tsx": "^4.19.0",
    "typescript": "^5.7.0"
  }
}
```

- [ ] **Step 3: tsconfig.json 생성**

`PART2/ts-practice/tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "CommonJS",
    "moduleResolution": "Node",
    "strict": true,
    "noEmit": true,
    "skipLibCheck": true,
    "lib": ["ES2022"],
    "include": ["**/*.ts"]
  }
}
```

- [ ] **Step 4: 의존성 설치**

```bash
cd PART2/ts-practice
npm install
```

Expected: `node_modules/` 생성, `package-lock.json` 생성

- [ ] **Step 5: 커밋**

```bash
git add PART2/ts-practice/.gitignore PART2/ts-practice/package.json PART2/ts-practice/tsconfig.json PART2/ts-practice/package-lock.json
git commit -m "chore: add ts-practice project config"
```

---

### Task 2: 01-basic — 기본 타입 & 인터페이스 예제

**Files:**
- Create: `PART2/ts-practice/01-basic/types.ts`
- Create: `PART2/ts-practice/01-basic/README.md`

- [ ] **Step 1: types.ts 생성**

`PART2/ts-practice/01-basic/types.ts`:
```typescript
// ===== 1. 기본 타입 =====
const name: string = "Alice"
const age: number = 30
const isActive: boolean = true

console.log("1. 기본 타입:", name, age, isActive)

// ===== 2. type 별칭 =====
type ID = string | number

const userId: ID = "user-123"
const productId: ID = 42

console.log("2. type 별칭:", userId, productId)

// ===== 3. interface =====
interface User {
  id: ID
  name: string
  email: string
  age?: number  // 선택적 프로퍼티
}

const user: User = {
  id: "u-1",
  name: "Bob",
  email: "bob@example.com",
}

console.log("3. interface:", user)

// ===== 4. interface 확장 =====
interface Admin extends User {
  role: "admin" | "superadmin"
}

const admin: Admin = {
  id: "a-1",
  name: "Carol",
  email: "carol@example.com",
  role: "admin",
}

console.log("4. interface 확장:", admin)

// ===== 5. Union 타입 =====
type Status = "pending" | "active" | "inactive"

function printStatus(status: Status): void {
  console.log("5. Union:", status)
}

printStatus("active")

// ===== 6. Intersection 타입 =====
type Timestamps = {
  createdAt: Date
  updatedAt: Date
}

type UserWithTimestamps = User & Timestamps

const userWithDates: UserWithTimestamps = {
  id: "u-2",
  name: "Dave",
  email: "dave@example.com",
  createdAt: new Date(),
  updatedAt: new Date(),
}

console.log("6. Intersection:", userWithDates.name, userWithDates.createdAt)

// ===== 7. 타입 가드 =====
function isString(value: unknown): value is string {
  return typeof value === "string"
}

const val: unknown = "hello"
if (isString(val)) {
  console.log("7. 타입 가드:", val.toUpperCase())
}
```

- [ ] **Step 2: 실행하여 오류 없는지 확인**

```bash
cd PART2/ts-practice
npm run basic
```

Expected 출력:
```
1. 기본 타입: Alice 30 true
2. type 별칭: user-123 42
3. interface: { id: 'u-1', name: 'Bob', email: 'bob@example.com' }
4. interface 확장: { id: 'a-1', name: 'Carol', email: 'carol@example.com', role: 'admin' }
5. Union: active
6. Intersection: Dave [현재 날짜]
7. 타입 가드: HELLO
```

- [ ] **Step 3: README.md 생성**

`PART2/ts-practice/01-basic/README.md`:
```markdown
# 01. 기본 타입 & 인터페이스

## 개념 설명

TypeScript의 핵심 타입 시스템. 변수에 타입을 명시해 런타임 전에 오류를 잡는다.

- `type`: 타입 별칭. 원시값, 유니온, 인터섹션 등 모든 타입에 이름을 붙임
- `interface`: 객체 구조를 정의. `extends`로 확장 가능
- Union (`|`): 여러 타입 중 하나
- Intersection (`&`): 여러 타입을 모두 만족
- 타입 가드: 런타임에 타입을 좁히는 함수

## 예제 파일

- `types.ts` — 기본 타입, type/interface 선언, union, intersection, 타입 가드

## 실행

```bash
npm run basic
```

## 실습

1. `User` interface에 `phone?: string` 필드를 추가해보자
2. `Status`에 `"deleted"` 값을 추가하고 `printStatus("deleted")`를 호출해보자
3. `User & Timestamps` 대신 `interface UserWithTimestamps extends User, Timestamps`로 바꿔보자
```

- [ ] **Step 4: 커밋**

```bash
git add PART2/ts-practice/01-basic/
git commit -m "feat: add 01-basic TypeScript examples"
```

---

### Task 3: 02-generics — 제네릭 예제

**Files:**
- Create: `PART2/ts-practice/02-generics/generics.ts`
- Create: `PART2/ts-practice/02-generics/README.md`

- [ ] **Step 1: generics.ts 생성**

`PART2/ts-practice/02-generics/generics.ts`:
```typescript
// ===== 1. 제네릭 함수 =====
function identity<T>(value: T): T {
  return value
}

console.log("1. 제네릭 함수:", identity<string>("hello"), identity<number>(42))

// ===== 2. 제네릭 배열 =====
function firstItem<T>(arr: T[]): T | undefined {
  return arr[0]
}

console.log("2. 제네릭 배열:", firstItem([1, 2, 3]), firstItem(["a", "b"]))

// ===== 3. 제네릭 인터페이스 =====
interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

interface Product {
  id: number
  name: string
  price: number
}

const response: ApiResponse<Product> = {
  data: { id: 1, name: "Keyboard", price: 99000 },
  status: 200,
  message: "OK",
}

console.log("3. 제네릭 인터페이스:", response.data.name, response.status)

// ===== 4. 제네릭 제약 (extends) =====
function getLength<T extends { length: number }>(value: T): number {
  return value.length
}

console.log("4. 제네릭 제약:", getLength("hello"), getLength([1, 2, 3]))

// ===== 5. keyof 제약 =====
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

const user = { name: "Alice", age: 30, email: "alice@example.com" }
console.log("5. keyof:", getProperty(user, "name"), getProperty(user, "age"))

// ===== 6. 유틸리티 타입 =====
interface UserProfile {
  id: string
  name: string
  email: string
  bio: string
}

// Partial: 모든 필드를 선택적으로
type PartialUser = Partial<UserProfile>

// Required: 모든 필드를 필수로
type RequiredUser = Required<UserProfile>

// Pick: 특정 필드만 선택
type UserSummary = Pick<UserProfile, "id" | "name">

// Omit: 특정 필드만 제외
type UserWithoutId = Omit<UserProfile, "id">

const partial: PartialUser = { name: "Bob" }
const summary: UserSummary = { id: "1", name: "Carol" }

console.log("6. 유틸리티 타입:", partial, summary)
```

- [ ] **Step 2: 실행하여 오류 없는지 확인**

```bash
npm run generics
```

Expected: 각 줄에 해당 출력이 나오고 타입 오류 없음

- [ ] **Step 3: README.md 생성**

`PART2/ts-practice/02-generics/README.md`:
```markdown
# 02. 제네릭

## 개념 설명

타입을 매개변수처럼 받아 재사용 가능한 코드를 작성하는 방법.
`any`를 쓰지 않고 타입 안전성을 유지하면서 유연한 함수/인터페이스를 만든다.

- `<T>`: 타입 매개변수. 호출 시 구체적인 타입으로 교체됨
- `extends`: 제네릭에 제약을 걸어 특정 구조를 보장
- `keyof`: 객체 타입의 키를 유니온으로 추출
- 유틸리티 타입: `Partial`, `Required`, `Pick`, `Omit` 등 내장 제네릭 타입

## 예제 파일

- `generics.ts` — 제네릭 함수, 인터페이스, 제약, keyof, 유틸리티 타입

## 실행

```bash
npm run generics
```

## 실습

1. `ApiResponse<T[]>`로 배열 응답을 표현해보자
2. `Readonly<UserProfile>`을 만들고 필드를 수정하면 어떤 오류가 나는지 확인해보자
3. `Record<string, number>` 타입의 변수를 만들어보자
```

- [ ] **Step 4: 커밋**

```bash
git add PART2/ts-practice/02-generics/
git commit -m "feat: add 02-generics TypeScript examples"
```

---

### Task 4: 03-advanced — 고급 타입 예제

**Files:**
- Create: `PART2/ts-practice/03-advanced/advanced.ts`
- Create: `PART2/ts-practice/03-advanced/README.md`

- [ ] **Step 1: advanced.ts 생성**

`PART2/ts-practice/03-advanced/advanced.ts`:
```typescript
// ===== 1. Conditional 타입 =====
type IsString<T> = T extends string ? "yes" : "no"

type A = IsString<string>  // "yes"
type B = IsString<number>  // "no"

const a: A = "yes"
const b: B = "no"
console.log("1. Conditional 타입:", a, b)

// NonNullable: null/undefined 제거 (내장 conditional 타입)
type MaybeString = string | null | undefined
type DefiniteString = NonNullable<MaybeString>  // string

const s: DefiniteString = "hello"
console.log("   NonNullable:", s)

// ===== 2. Mapped 타입 =====
// 주의: Readonly, Partial 등은 TypeScript 내장 유틸리티 타입이므로
// 직접 구현 시 이름 충돌을 피해 My 접두사를 붙인다
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K]
}

type MyOptional<T> = {
  [K in keyof T]?: T[K]
}

type Nullable<T> = {
  [K in keyof T]: T[K] | null
}

interface Config {
  host: string
  port: number
  debug: boolean
}

const config: MyReadonly<Config> = { host: "localhost", port: 3000, debug: true }
// config.port = 4000  // 오류: readonly

const partialConfig: MyOptional<Config> = { host: "localhost" }
console.log("2. Mapped 타입:", config, partialConfig)

// ===== 3. Template Literal 타입 =====
type EventName = "click" | "focus" | "blur"
type Handler = `on${Capitalize<EventName>}`  // "onClick" | "onFocus" | "onBlur"

const handler: Handler = "onClick"
console.log("3. Template Literal:", handler)

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE"
type ApiRoute = `/api/${string}`

const route: ApiRoute = "/api/users"
console.log("   ApiRoute:", route)

// ===== 4. infer 키워드 =====
// ReturnType은 내장 타입이므로 MyReturnType으로 직접 구현해본다
type MyReturnType<T> = T extends (...args: unknown[]) => infer R ? R : never

function greet(name: string): string {
  return `Hello, ${name}`
}

type GreetReturn = MyReturnType<typeof greet>  // string

const greeting: GreetReturn = "Hello, World"
console.log("4. infer:", greeting)

// ===== 5. 분산 Conditional 타입 =====
type ToArray<T> = T extends unknown ? T[] : never

type StrOrNumArr = ToArray<string | number>  // string[] | number[]

const arr: StrOrNumArr = ["a", "b"]
console.log("5. 분산 Conditional:", arr)
```

- [ ] **Step 2: 실행하여 오류 없는지 확인**

```bash
npm run advanced
```

Expected: 각 줄 출력, 타입 오류 없음

- [ ] **Step 3: README.md 생성**

`PART2/ts-practice/03-advanced/README.md`:
```markdown
# 03. 고급 타입

## 개념 설명

TypeScript의 타입 수준 프로그래밍. 타입을 조건문, 반복문으로 변환한다.

- Conditional 타입: `T extends U ? X : Y` — 타입에 따라 다른 타입 반환
- Mapped 타입: `[K in keyof T]` — 객체 타입의 모든 키를 변환
- Template Literal 타입: 문자열 리터럴 타입을 조합해 새 타입 생성
- `infer`: Conditional 타입 안에서 타입을 추론·추출
- 분산 Conditional: 유니온 타입에 Conditional이 자동으로 분산 적용

## 예제 파일

- `advanced.ts` — Conditional, Mapped, Template Literal, infer, 분산 처리

## 실행

```bash
npm run advanced
```

## 실습

1. `type Flatten<T> = T extends Array<infer Item> ? Item : T`를 작성하고 `Flatten<string[]>`의 타입을 확인해보자
2. `type Getters<T> = { [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K] }`를 만들어보자
3. `Config`의 모든 값 타입을 `string`으로 바꾸는 Mapped 타입을 작성해보자
```

- [ ] **Step 4: 커밋**

```bash
git add PART2/ts-practice/03-advanced/
git commit -m "feat: add 03-advanced TypeScript examples"
```

---

### Task 5: ESLint 제외 설정 (해당 시)

**Note:** 현재 PART2에는 ESLint 설정이 없으므로 이 Task는 스킵해도 된다.
향후 PART2에 Next.js 프로젝트를 세팅할 때 ESLint를 추가하면 `ts-practice/`를 제외해야 한다.

**Files:**
- Modify: `PART2/eslint.config.js` (생성 시) 또는 `PART2/.eslintignore`

- [ ] **Step 1: PART2에 ESLint 설정이 생겼을 때 ts-practice/ 제외**

`PART2/.eslintignore`에 추가:
```
ts-practice/
```

또는 `eslint.config.js`의 `ignores` 배열에 추가:
```js
ignores: ["ts-practice/**"]
```

- [ ] **Step 2: 현재는 ts-practice/.gitignore에 메모 추가**

`PART2/ts-practice/.gitignore`에 주석 추가:
```
node_modules/

# PART2에 ESLint 추가 시 루트 eslint.config.js의 ignores에 "ts-practice/**" 추가 필요
```

---

### Task 6: 최종 검증

- [ ] **Step 1: 전체 실행 확인**

```bash
cd PART2/ts-practice
npm run basic
npm run generics
npm run advanced
```

Expected: 세 파일 모두 오류 없이 실행, console.log 출력 정상

- [ ] **Step 2: 타입 검사 확인**

```bash
npx tsc --noEmit
```

Expected: 출력 없음 (오류 없음)

- [ ] **Step 3: 최종 커밋**

```bash
# 레포 루트에서 실행
git add PART2/ts-practice/
git status  # 누락된 파일 없는지 확인
git commit -m "chore: finalize ts-practice setup"
```
