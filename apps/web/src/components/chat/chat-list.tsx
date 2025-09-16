"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search } from "lucide-react"

interface Chat {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  isOnline?: boolean
  initials: string
  avatarColor: string
}

interface ChatListProps {
  chats: Chat[]
  selectedChatId: string | null
  onChatSelect: (chatId: string) => void
}

export function ChatList({ chats, selectedChatId, onChatSelect }: ChatListProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="w-full overflow-hidden h-full flex flex-col">

      {/* Search */}
      <div className="px-6 py-4 flex-shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Chats search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-50 border-gray-200 rounded-2xl"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="px-4 flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onChatSelect(chat.id)}
            className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-colors ${
              selectedChatId === chat.id ? "bg-blue-50 border-l-4 border-blue-500" : "hover:bg-gray-50"
            }`}
          >
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarImage src={chat.avatar || "/placeholder.svg"} alt={chat.name} />
                <AvatarFallback className={`${chat.avatarColor} text-white font-medium`}>
                  {chat.initials}
                </AvatarFallback>
              </Avatar>
              {chat.isOnline && (
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
                <span className="text-sm text-gray-500 flex-shrink-0">{chat.timestamp}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 truncate flex-1 mr-2">
                  {chat.lastMessage.startsWith("Great!") && <span className="text-green-600 mr-1">✓</span>}
                  {chat.lastMessage.startsWith("Sounds") && <span className="text-green-600 mr-1">✓✓</span>}
                  {chat.lastMessage.startsWith("How about") && <span className="text-green-600 mr-1">✓✓</span>}
                  {chat.lastMessage.startsWith("Hey Bonnie") && <span className="text-gray-400 mr-1">✓</span>}
                  {chat.lastMessage.startsWith("No worries") && <span className="text-green-600 mr-1">✓✓</span>}
                  {chat.lastMessage.startsWith("She just") && <span className="text-green-600 mr-1">✓</span>}
                  {chat.lastMessage}
                </p>
                {chat.unreadCount > 0 && (
                  <Badge className="bg-green-500 hover:bg-green-600 text-white rounded-full min-w-[20px] h-5 text-xs flex items-center justify-center">
                    {chat.unreadCount}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
