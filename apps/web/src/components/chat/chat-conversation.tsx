"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, MoreHorizontal, Paperclip, Send, Play } from "lucide-react"

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

interface ChatConversationProps {
  chat: Chat
  onBack: () => void
  showBackButton?: boolean
  className?: string
}

export function ChatConversation({ chat, onBack, showBackButton = true, className = "" }: ChatConversationProps) {
  const [message, setMessage] = useState("")

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message
      setMessage("")
    }
  }

  return (
    <div className={`w-full bg-white min-h-full flex flex-col ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-100">
        {showBackButton && (
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-xl md:hidden">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}

        <div className="relative">
          <Avatar className="h-10 w-10">
            <AvatarImage src={chat.avatar || "/placeholder.svg"} alt={chat.name} />
            <AvatarFallback className={`${chat.avatarColor} text-white font-medium`}>{chat.initials}</AvatarFallback>
          </Avatar>
          {chat.isOnline && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          )}
        </div>

        <div className="flex-1">
          <h2 className="font-semibold text-gray-900">{chat.name}</h2>
          <p className="text-sm text-green-500">Online</p>
        </div>

        <Button variant="ghost" size="icon" className="rounded-xl">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {/* Timestamp */}
        <div className="text-center">
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">05:23 PM ✓✓</span>
        </div>

        {/* Video Message */}
        <div className="flex justify-end">
          <div className="relative max-w-xs">
            <div className="relative bg-gray-800 rounded-2xl overflow-hidden">
              <img
                src="/people-sitting-at-table-meeting.jpg"
                alt="Video message"
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button size="icon" className="bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm">
                  <Play className="h-6 w-6 text-white ml-1" />
                </Button>
              </div>
              <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">5:42</div>
            </div>
            <div className="text-right mt-1">
              <span className="text-xs text-gray-500">05:23 PM ✓✓</span>
            </div>
          </div>
        </div>

        {/* Image Grid Message */}
        <div className="flex justify-start">
          <div className="max-w-xs">
            <div className="bg-gray-100 rounded-2xl p-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="aspect-square bg-black rounded-lg overflow-hidden">
                  <img src="/laptop-technology.jpg" alt="Tech image 1" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square bg-black rounded-lg overflow-hidden">
                  <img src="/vr-headset-gaming.jpg" alt="Tech image 2" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square bg-purple-600 rounded-lg overflow-hidden">
                  <img
                    src="/person-vr-headset-blue-lighting.jpg"
                    alt="VR image"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square bg-gray-600 rounded-lg overflow-hidden relative">
                  <img src="/abstract-tech-pattern.png" alt="Tech pattern" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-xl font-bold">+2</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-1">
              <span className="text-xs text-gray-500">05:23 PM ✓✓</span>
            </div>
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Input
              placeholder="Enter message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="pr-12 rounded-full border-gray-200"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={handleSendMessage} size="icon" className="rounded-full bg-blue-500 hover:bg-blue-600">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
