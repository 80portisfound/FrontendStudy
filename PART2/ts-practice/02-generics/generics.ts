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

const person = { name: "Alice", age: 30, email: "alice@example.com" }
console.log("5. keyof:", getProperty(person, "name"), getProperty(person, "age"))

// ===== 6. 유틸리티 타입 =====
interface UserProfile {
  id: string
  name: string
  email: string
  bio: string
}

// Partial: 모든 필드를 선택적으로
const partial: Partial<UserProfile> = { name: "Bob" }

// Pick: 특정 필드만 선택
const summary: Pick<UserProfile, "id" | "name"> = { id: "1", name: "Carol" }

// Omit: 특정 필드만 제외
const withoutId: Omit<UserProfile, "id"> = { name: "Dave", email: "d@e.com", bio: "hi" }

// Record: 키-값 맵
const scores: Record<string, number> = { math: 95, english: 88 }

console.log("6. 유틸리티 타입 - Partial:", partial)
console.log("   Pick:", summary)
console.log("   Omit:", withoutId)
console.log("   Record:", scores)
