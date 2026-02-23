  import { useState } from 'react'

  interface NicknameModalProps {
    onSubmit: (nickname: string) => void
  }

  export default function NicknameModal({ onSubmit }: NicknameModalProps) {
    const [nickname, setNickname] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (nickname.trim()) {
        onSubmit(nickname.trim())
      }
    }

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-80 shadow-xl">
          <h2 className="text-xl font-bold mb-4">닉네임 입력</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <button
              type="submit"
              disabled={!nickname.trim()}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              입장하기
            </button>
          </form>
        </div>
      </div>
    )
  }
