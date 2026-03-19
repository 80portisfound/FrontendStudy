# TypeScript 실습 환경 설계

## 개요

PART2 프로젝트 내에 순수 TypeScript 문법 학습을 위한 독립 실습 환경을 구성한다.
UI 없이 `.ts` 파일을 작성하고 `tsx`로 바로 실행하여 결과를 확인하는 방식이다.

## 목표

- TypeScript 문법을 단계별로 실습할 수 있는 환경 제공
- PART2(Next.js) 프로젝트에 영향 없이 독립적으로 동작
- 설정 최소화, 즉시 실습 가능

## 폴더 구조

```
PART2/
└── ts-practice/
    ├── package.json        # tsx devDependency, 실행 스크립트
    ├── tsconfig.json       # strict 모드, ES2022, 독립 설정
    ├── 01-basic/
    │   ├── types.ts        # type, interface, union, intersection 예제
    │   └── README.md       # 주제 설명 및 실습 가이드
    ├── 02-generics/
    │   ├── generics.ts     # Generic 함수, 클래스, 유틸리티 타입 예제
    │   └── README.md
    └── 03-advanced/
        ├── advanced.ts     # Conditional, Mapped, Template literal type 예제
        └── README.md
```

## 설정 상세

### package.json

- `tsx`를 devDependency로 설치
- scripts: 주제별 실행 커맨드 (`npm run basic`, `npm run generics`, `npm run advanced`)

### tsconfig.json

- `strict: true` — any 타입 금지 포함 엄격 모드
- `target: ES2022`
- `module: NodeNext`
- PART2 루트 tsconfig와 완전히 독립

## 실행 방법

```bash
cd PART2/ts-practice
npm install
npx tsx 01-basic/types.ts
# 또는
npm run basic
```

## 각 실습 파일 구성

각 `.ts` 파일은 다음 패턴으로 작성된다:

1. 개념 설명 주석
2. 예제 코드
3. `console.log`로 결과 출력

## 범위 외

- 테스트 코드 (vitest 등) 미포함
- 브라우저/UI 없음
- PART2 Next.js 코드와 import 연결 없음
