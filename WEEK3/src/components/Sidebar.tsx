interface SidebarProps {
  rooms: string[]
  selectedRoom: string
  onSelectRoom: (room: string) => void
}

export default function Sidebar({ rooms, selectedRoom, onSelectRoom }: SidebarProps) {
  return (
    <aside className="h-full bg-gray-900 text-white flex flex-col">
      <h2 className="text-lg font-bold p-4 border-b border-gray-700">채팅방</h2>
      <ul className="flex-1 overflow-y-auto">
        {rooms.map((room) => (
          <li
            key={room}
            onClick={() => onSelectRoom(room)}
            className={`px-4 py-3 cursor-pointer hover:bg-gray-700 ${
              selectedRoom === room ? 'bg-gray-700' : ''
            }`}
          >
            # {room}
          </li>
        ))}
      </ul>
    </aside>
  )
}
