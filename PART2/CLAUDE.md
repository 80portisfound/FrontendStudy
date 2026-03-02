# E-commerce Platform

## 스택
Frontend: Next.js 14, TypeScript, Tailwind
Backend: Prisma, PostgreSQL
Auth: NextAuth.js

## 구조
```
app/
├── (auth)/      # 로그인/회원가입
├── (shop)/      # 쇼핑몰
└── api/         # API
```

## 코딩 스타일
- 서버 컴포넌트 기본
- 클라이언트: 'use client'
- Props는 interface로
- 에러 처리 필수

## 상태 관리
- URL: useSearchParams
- 서버: React Query
- 클라이언트: Zustand

## 금지
- any 타입
- 200줄 넘는 컴포넌트
- console.log (프로덕션)
