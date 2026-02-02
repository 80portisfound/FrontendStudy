import Message from './Message'

interface MessageListProps {
  messages: { text: string }[]
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div className="p-4 space-y-2">
      {messages.length === 0 && (
        <p className="text-gray-400 text-center mt-10">메시지가 없습니다.</p>
      )}
      {messages.map((m, i) => (
        <Message key={i} text={m.text} />
      ))}
    </div>
  )
}
