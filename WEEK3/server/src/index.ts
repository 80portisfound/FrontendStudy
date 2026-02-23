import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from Express + Socket.io Server!' });
});

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 사용자 관리
const users = new Map<string, string>();

// Socket.io
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // 사용자 입장
  socket.on('join', (username: string) => {
    users.set(socket.id, username);
    console.log(`User joined: ${username} (${socket.id})`);
    // 모든 클라이언트에게 접속자 목록 전송
    io.emit('userList', Array.from(users.entries()).map(([id, name]) => ({ id, name })));
    // 입장 알림
    io.emit('userJoined', username);
  });

  socket.on('sendMessage', (data) => {
    console.log('Received message:', data);
    // 모든 클라이언트에게 브로드캐스트 (발신자 포함)
    io.emit('receiveMessage', data);
  });

  socket.on('disconnect', () => {
    const username = users.get(socket.id);
    users.delete(socket.id);
    console.log(`Client disconnected: ${username || socket.id}`);
    // 퇴장 알림 (join한 사용자만)
    if (username) {
      io.emit('userLeft', username);
    }
    // 접속자 목록 업데이트
    io.emit('userList', Array.from(users.entries()).map(([id, name]) => ({ id, name })));
  });
});

// Start server
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
