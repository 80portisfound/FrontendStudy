import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import { useSocket } from '../hooks/useSocket'
import type { Message } from '../types/message'

const ROOMS = ['일반', '개발', '디자인', '자유']

let nextId = 1
function createMessage(room: string, user: string, text: string): Message {
  return {
    id: String(nextId++),
    user,
    text,
    timestamp: new Date(),
    room,
  }
}

const INITIAL_MESSAGES: Message[] = [
  createMessage('일반', '김철수', '안녕하세요! 반갑습니다.'),
  createMessage('일반', '이영희', '오늘 날씨가 좋네요.'),
  createMessage('일반', '박지민', '다들 점심 뭐 드셨어요?'),
  createMessage('개발', '김철수', 'React 19 새 기능 확인해보셨나요?'),
  createMessage('개발', '이영희', 'TypeScript 5.7 업데이트 정리해봤습니다.'),
  createMessage('개발', '박지민', 'Tailwind v4 마이그레이션 진행 중입니다.'),
  createMessage('디자인', '이영희', '새 랜딩페이지 시안 공유드립니다.'),
  createMessage('디자인', '박지민', '컬러 팔레트 피드백 부탁드려요.'),
  createMessage('자유', '김철수', '금요일에 번개 모임 어떠세요?'),
  createMessage('자유', '이영희', '추천 맛집 있으면 알려주세요!'),
]

export default function ChatRoom() {
  const [selectedRoom, setSelectedRoom] = useState('일반')
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [isLoading, setIsLoading] = useState(false)
  const { isConnected, sendMessage, incomingMessage } = useSocket()

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [selectedRoom])

  // 수신된 메시지 처리
  useEffect(() => {
    if (incomingMessage) {
      setMessages((prev) => {
        // 중복 방지
        if (prev.some((m) => m.id === incomingMessage.id)) return prev
        return [...prev, incomingMessage]
      })
    }
  }, [incomingMessage])

  const filtered = messages.filter((m) => m.room === selectedRoom)

  const handleSend = (text: string) => {
    const newMessage = createMessage(selectedRoom, '나', text)
    setMessages((prev) => [...prev, newMessage])
    sendMessage(newMessage)
  }

  return (
    <div className="grid grid-cols-[15rem_1fr] grid-rows-[auto_1fr_auto] h-screen w-screen">
      {/* Sidebar — 왼쪽 전체 행 차지 */}
      <div className="row-span-3">
        <Sidebar
          rooms={ROOMS}
          selectedRoom={selectedRoom}
          onSelectRoom={setSelectedRoom}
        />
      </div>

      {/* Header — 1행 */}
      <header className="px-4 py-3 border-b font-semibold text-lg bg-white flex items-center justify-between">
        <span># {selectedRoom}</span>
        <span className={`text-sm ${isConnected ? 'text-green-500' : 'text-red-500'}`}>
          {isConnected ? '● 연결됨' : '○ 연결 끊김'}
        </span>
      </header>

      {/* Message Area — 2행 (남은 공간 전부) */}
      <div className="overflow-y-auto bg-white">
        <MessageList messages={filtered} isLoading={isLoading} />
      </div>

      {/* Input Area — 3행 */}
      <div className="bg-white">
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  )
}
