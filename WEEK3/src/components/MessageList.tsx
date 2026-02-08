import { useEffect, useRef } from 'react'
import MessageItem from './Message'
import type { Message } from '../types/message'

interface MessageListProps {
  messages: Message[]
  isLoading?: boolean
}

export default function MessageList({ messages, isLoading = false }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    )
  }

  return (
    <div className="p-4 space-y-2">
      {messages.length === 0 && (
        <p className="text-gray-400 text-center mt-10">메시지가 없습니다.</p>
      )}
      {messages.map((m) => (
        <MessageItem key={m.id} message={m} isOwn={m.user === '나'} />
      ))}
      <div ref={bottomRef} />
    </div>
  )
}
