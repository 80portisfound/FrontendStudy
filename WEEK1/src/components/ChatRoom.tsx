import { useState } from 'react'
import Sidebar from './Sidebar'
import MessageList from './MessageList'
import MessageInput from './MessageInput'

const ROOMS = ['일반', '개발', '디자인', '자유']

const INITIAL_MESSAGES = [
  { room: '일반', text: '안녕하세요! 반갑습니다.' },
  { room: '일반', text: '오늘 날씨가 좋네요.' },
  { room: '일반', text: '다들 점심 뭐 드셨어요?' },
  { room: '개발', text: 'React 19 새 기능 확인해보셨나요?' },
  { room: '개발', text: 'TypeScript 5.7 업데이트 정리해봤습니다.' },
  { room: '개발', text: 'Tailwind v4 마이그레이션 진행 중입니다.' },
  { room: '디자인', text: '새 랜딩페이지 시안 공유드립니다.' },
  { room: '디자인', text: '컬러 팔레트 피드백 부탁드려요.' },
  { room: '자유', text: '금요일에 번개 모임 어떠세요?' },
  { room: '자유', text: '추천 맛집 있으면 알려주세요!' },
]

export default function ChatRoom() {
  const [selectedRoom, setSelectedRoom] = useState('일반')
  const [messages, setMessages] = useState<{ room: string; text: string }[]>(INITIAL_MESSAGES)

  const filtered = messages.filter((m) => m.room === selectedRoom)

  const handleSend = (text: string) => {
    setMessages((prev) => [...prev, { room: selectedRoom, text }])
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
      <header className="px-4 py-3 border-b font-semibold text-lg bg-white">
        # {selectedRoom}
      </header>

      {/* Message Area — 2행 (남은 공간 전부) */}
      <div className="overflow-y-auto bg-white">
        <MessageList messages={filtered} />
      </div>

      {/* Input Area — 3행 */}
      <div className="bg-white">
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  )
}
