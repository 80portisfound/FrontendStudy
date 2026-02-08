# Week 3 - 실시간 채팅 애플리케이션

React + TypeScript + Socket.io를 활용한 실시간 채팅 애플리케이션입니다.

## 프로젝트 구조

```
week3/
├── src/                    # 클라이언트 (React + Vite)
│   ├── components/
│   │   ├── ChatRoom.tsx    # 메인 채팅방 컴포넌트
│   │   ├── MessageList.tsx # 메시지 목록
│   │   ├── MessageInput.tsx# 메시지 입력
│   │   └── Sidebar.tsx     # 채팅방 사이드바
│   ├── hooks/
│   │   └── useSocket.ts    # Socket.io 연결 관리 훅
│   └── types/
│       └── message.ts      # 메시지 타입 정의
│
└── server/                 # 서버 (Express + Socket.io)
    └── src/
        └── index.ts        # 메인 서버 파일
```

## 기술 스택

### 클라이언트
- React 19
- TypeScript
- Vite
- Socket.io-client
- Tailwind CSS

### 서버
- Node.js
- Express
- TypeScript
- Socket.io

## 실행 방법

### 1. 의존성 설치

```bash
# 클라이언트
npm install

# 서버
cd server && npm install
```

### 2. 서버 실행

```bash
cd server
npm run dev
```

서버가 `http://localhost:3000`에서 실행됩니다.

### 3. 클라이언트 실행

```bash
npm run dev
```

클라이언트가 `http://localhost:5173`에서 실행됩니다.

## 주요 기능

### 실시간 메시지 송수신
- Socket.io를 통한 실시간 양방향 통신
- 메시지 전송 시 모든 연결된 클라이언트에 브로드캐스트

### 연결 상태 표시
- 헤더에 Socket 연결 상태 실시간 표시
- 연결됨: 녹색 (● 연결됨)
- 연결 끊김: 빨간색 (○ 연결 끊김)

### 채팅방
- 일반, 개발, 디자인, 자유 4개 채팅방
- 채팅방별 메시지 필터링

## 핵심 코드

### useSocket 훅

```typescript
import { useSocket } from './hooks/useSocket';

function Component() {
  const { isConnected, sendMessage, incomingMessage } = useSocket();

  // 메시지 전송
  sendMessage({ id: '1', user: '나', text: 'Hello!', room: '일반' });
}
```

### Socket 이벤트

| 이벤트 | 방향 | 설명 |
|--------|------|------|
| `connect` | 서버 → 클라이언트 | 연결 성공 |
| `disconnect` | 서버 → 클라이언트 | 연결 해제 |
| `message` | 양방향 | 메시지 송수신 |

## API 엔드포인트

| Method | Path | 설명 |
|--------|------|------|
| GET | `/` | 서버 상태 메시지 |
| GET | `/api/health` | 헬스 체크 |

## 테스트

1. 브라우저 2개 탭에서 `http://localhost:5173` 접속
2. 헤더에서 "● 연결됨" 상태 확인
3. 한 탭에서 메시지 전송
4. 다른 탭에서 메시지 수신 확인
