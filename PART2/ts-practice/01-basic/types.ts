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
