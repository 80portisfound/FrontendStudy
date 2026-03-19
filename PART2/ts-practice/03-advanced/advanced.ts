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
// config.port = 4000  // 오류: readonly 속성은 수정 불가

const partialConfig: MyOptional<Config> = { host: "localhost" }
const nullableConfig: Nullable<Config> = { host: null, port: null, debug: null }

console.log("2. Mapped 타입 - MyReadonly:", config)
console.log("   MyOptional:", partialConfig)
console.log("   Nullable:", nullableConfig)

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
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never

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
