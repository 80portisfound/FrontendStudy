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
    ├── .gitignore          # node_modules 제외
    ├── package.json        # tsx devDependency, 실행 스크립트
    ├── tsconfig.json       # strict 모드, CommonJS, 독립 설정
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

각 주제 폴더에는 예제 파일 외에 학습자가 자유롭게 `.ts` 파일을 추가할 수 있다.
새 주제 추가 시: 폴더 번호를 이어서 만들고 (`04-decorators/` 등), `package.json`의 scripts에 실행 커맨드를 추가한다.

## 설정 상세

### package.json

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

- `"type"` 필드 미포함 → CommonJS 기본값 사용 (module resolution 오류 방지)
- tsx 버전은 `^4.19.0`으로 고정하여 스터디 멤버 간 일관성 보장

### tsconfig.json

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

- `module: CommonJS` + `moduleResolution: Node` — tsx 단독 실행 환경에 적합, import 시 확장자 불필요
- `noEmit: true` — tsx가 emit 없이 실행하므로 명시적으로 선언
- `include: ["**/*.ts"]` — ts-practice 폴더 내 파일만 포함, PART2 루트 tsconfig와 완전히 독립

### .gitignore

```
node_modules/
```

## console.log 정책

PART2의 CLAUDE.md에서 프로덕션 코드에 `console.log`를 금지한다.
이 규칙은 Next.js 애플리케이션 코드에만 적용되며, `ts-practice/`는 학습용 스크립트이므로 `console.log` 사용이 허용된다.
`ts-practice/`는 PART2 루트의 ESLint 설정 적용 대상에서 제외한다 (`.eslintignore` 또는 ESLint `ignorePatterns`에 `ts-practice/` 추가).

## 실행 방법

```bash
cd PART2/ts-practice
npm install
npm run basic      # 01-basic/types.ts 실행
npm run generics   # 02-generics/generics.ts 실행
npm run advanced   # 03-advanced/advanced.ts 실행

# 또는 특정 파일 직접 실행
npx tsx 01-basic/types.ts
```

## 각 실습 파일 구성

각 `.ts` 파일은 다음 패턴으로 작성된다:

1. 개념 설명 주석
2. 예제 코드
3. `console.log`로 결과 출력

## 각 README.md 구성 템플릿

```
# 주제명

## 개념 설명
(무엇인지, 언제 쓰는지)

## 예제 파일
- `types.ts` — 예제 설명

## 실습
(직접 해볼 것들)
```

## 범위 외

- 테스트 코드 (vitest 등) 미포함
- 브라우저/UI 없음
- PART2 Next.js 코드와 import 연결 없음
