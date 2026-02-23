import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import NicknameModal from './NicknameModal'
import { useSocket } from '../hooks/useSocket'
import type { Message } from '../types/message'

const ROOMS = ['일반', '개발', '디자인', '자유']

let nextId = 1
function createMessage(room: string, user: string, text: string, type: 'chat' | 'system' = 'chat'): Message {
  return {
    id: String(nextId++),
    user,
    text,
    timestamp: new Date(),
    room,
    type,
  }
}

function createSystemMessage(text: string): Message {
  return createMessage('', 'system', text, 'system')
}

export default function ChatRoom() {
  const [selectedRoom, setSelectedRoom] = useState('일반')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [nickname, setNickname] = useState<string | null>(null)
  const { isConnected, sendMessage, incomingMessage, users, join, userJoined, userLeft } = useSocket()

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

  // 사용자 입장 알림
  useEffect(() => {
    if (userJoined) {
      setMessages((prev) => [...prev, createSystemMessage(`${userJoined}님이 입장했습니다`)])
    }
  }, [userJoined])

  // 사용자 퇴장 알림
  useEffect(() => {
    if (userLeft) {
      setMessages((prev) => [...prev, createSystemMessage(`${userLeft}님이 퇴장했습니다`)])
    }
  }, [userLeft])

  const filtered = messages.filter((m) => m.room === selectedRoom || m.type === 'system')

  const handleSend = (text: string) => {
    if (!nickname) return
    const newMessage = createMessage(selectedRoom, nickname, text)
    // 로컬 상태에 직접 추가하지 않고 서버로만 전송
    // 서버에서 브로드캐스트된 메시지가 receiveMessage로 돌아옴
    sendMessage(newMessage)
  }

  const handleJoin = (name: string) => {
    setNickname(name)
    join(name)
  }

  // 닉네임 미입력 시 모달 표시
  if (!nickname) {
    return <NicknameModal onSubmit={handleJoin} />
  }

  return (
    <div className="grid grid-cols-[15rem_1fr_12rem] grid-rows-[auto_1fr_auto] h-screen w-screen">
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

      {/* User List Header */}
      <div className="px-4 py-3 border-b border-l font-semibold bg-white">
        접속자 ({users.length})
      </div>

      {/* Message Area — 2행 (남은 공간 전부) */}
      <div className="overflow-y-auto bg-white">
        <MessageList messages={filtered} isLoading={isLoading} />
      </div>

      {/* User List */}
      <div className="overflow-y-auto bg-gray-50 border-l p-2">
        {users.map((user) => (
          <div
            key={user.id}
            className={`px-2 py-1 rounded text-sm ${user.name === nickname ? 'font-bold text-blue-600' : ''}`}
          >
            {user.name === nickname ? `${user.name} (나)` : user.name}
          </div>
        ))}
      </div>

      {/* Input Area — 3행 */}
      <div className="bg-white">
        <MessageInput onSend={handleSend} />
      </div>

      {/* Empty cell for grid alignment */}
      <div className="bg-gray-50 border-l"></div>
    </div>
  )
}
