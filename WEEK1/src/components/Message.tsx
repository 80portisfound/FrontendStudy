interface MessageProps {
  text: string
}

export default function Message({ text }: MessageProps) {
  return (
    <div className="bg-gray-100 rounded px-3 py-2 w-fit max-w-xl">
      {text}
    </div>
  )
}
