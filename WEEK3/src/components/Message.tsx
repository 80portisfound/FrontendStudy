import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import relativeTime from 'dayjs/plugin/relativeTime'
import type { Message } from '../types/message'

dayjs.extend(relativeTime)
dayjs.locale('ko')

interface MessageProps {
  message: Message
  isOwn?: boolean
}

function formatTime(date: Date): string {
  const now = dayjs()
  const messageTime = dayjs(date)

  if (now.diff(messageTime, 'day') === 0) {
    return messageTime.format('A h:mm')
  }
  if (now.diff(messageTime, 'day') === 1) {
    return `어제 ${messageTime.format('A h:mm')}`
  }
  return messageTime.format('M월 D일 A h:mm')
}

export default function Message({ message, isOwn = false }: MessageProps) {
  const time = formatTime(message.timestamp)

  if (isOwn) {
    return (
      <div className="flex justify-end">
        <div className="bg-blue-500 text-white rounded-lg px-3 py-2 max-w-xl">
          <div className="flex items-center gap-2 justify-end">
            <span className="text-xs text-blue-100">{time}</span>
          </div>
          <p className="mt-1 whitespace-pre-wrap">{message.text}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-2">
      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold text-gray-600">
        {message.user[0]}
      </div>
      <div className="bg-gray-100 rounded-lg px-3 py-2 max-w-xl">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-blue-600">{message.user}</span>
          <span className="text-xs text-gray-400">{time}</span>
        </div>
        <p className="mt-1 whitespace-pre-wrap">{message.text}</p>
      </div>
    </div>
  )
}
