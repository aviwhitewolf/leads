"use client"

import { useState } from "react"
import { ChatList } from "./chat-list"
import { ChatConversation } from "./chat-conversation"

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

const mockChats: Chat[] = [
  {
    id: "1",
    name: "Jacquenetta Slowgrave",
    avatar: "/woman-brown-hair.png",
    lastMessage: "Great! Looking forward to it. ...",
    timestamp: "10 minutes",
    unreadCount: 8,
    isOnline: true,
    initials: "JS",
    avatarColor: "bg-blue-500",
  },
  {
    id: "2",
    name: "Nickola Peever",
    avatar: "/dark-haired-man.png",
    lastMessage: "Sounds perfect! I've been w...",
    timestamp: "40 minutes",
    unreadCount: 2,
    isOnline: true,
    initials: "NP",
    avatarColor: "bg-purple-500",
  },
  {
    id: "3",
    name: "Farand Hume",
    avatar: "",
    lastMessage: "How about 7 PM at the new Italia...",
    timestamp: "Yesterday",
    unreadCount: 0,
    initials: "🐻",
    avatarColor: "bg-green-500",
  },
  {
    id: "4",
    name: "Ossie Peasey",
    avatar: "/blonde-woman-portrait.png",
    lastMessage: "Hey Bonnie, yes, definitely! What ...",
    timestamp: "13 days",
    unreadCount: 0,
    initials: "OP",
    avatarColor: "bg-pink-500",
  },
  {
    id: "5",
    name: "Hall Negri",
    avatar: "/man-with-baseball-cap.png",
    lastMessage: "No worries at all! I'll grab a table ...",
    timestamp: "2 days",
    unreadCount: 0,
    initials: "HN",
    avatarColor: "bg-indigo-500",
  },
  {
    id: "6",
    name: "Elyssa Segot",
    avatar: "/light-haired-woman.png",
    lastMessage: "She just told me today.",
    timestamp: "Yesterday",
    unreadCount: 0,
    initials: "ES",
    avatarColor: "bg-teal-500",
  },
  {
    id: "7",
    name: "Elyssa Segot",
    avatar: "/light-haired-woman.png",
    lastMessage: "She just told me today.",
    timestamp: "Yesterday",
    unreadCount: 0,
    initials: "ES",
    avatarColor: "bg-teal-500",
  },
  {
    id: "8",
    name: "Elyssa Segot",
    avatar: "/light-haired-woman.png",
    lastMessage: "She just told me today.",
    timestamp: "Yesterday",
    unreadCount: 0,
    initials: "ES",
    avatarColor: "bg-teal-500",
  },
  {
    id: "9",
    name: "Elyssa Segot",
    avatar: "/light-haired-woman.png",
    lastMessage: "She just told me today.",
    timestamp: "Yesterday",
    unreadCount: 0,
    initials: "ES",
    avatarColor: "bg-teal-500",
  },
  {
    id: "10",
    name: "Elyssa Segot",
    avatar: "/light-haired-woman.png",
    lastMessage: "She just told me today.",
    timestamp: "Yesterday",
    unreadCount: 0,
    initials: "ES",
    avatarColor: "bg-teal-500",
  },
  {
    id: "11",
    name: "Elyssa Segot",
    avatar: "/light-haired-woman.png",
    lastMessage: "She just told me today.",
    timestamp: "Yesterday",
    unreadCount: 0,
    initials: "ES",
    avatarColor: "bg-teal-500",
  },
]

export function ChatLayout() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)

  const selectedChatData = selectedChat ? mockChats.find((c) => c.id === selectedChat) : null

  return (
    <div className="flex h-[calc(100vh-3.5rem)] w-full mx-auto">
      {/* Chat List - Always visible on desktop/tablet, hidden on mobile when chat is selected */}
      <div className={`${selectedChat ? "hidden md:flex" : "flex"} md:w-96 w-full flex-shrink-0`}>
        <ChatList chats={mockChats} selectedChatId={selectedChat} onChatSelect={setSelectedChat} />
      </div>

      {/* Chat Conversation - Only visible when chat is selected */}
      {selectedChat && selectedChatData && (
        <div className={`${selectedChat ? "flex" : "hidden"} w-full flex-1 md:border-l border-gray-200 bg-background `}>
          <ChatConversation
            chat={selectedChatData}
            onBack={() => setSelectedChat(null)}
            showBackButton={true}
            className="md:rounded-none"
          />
        </div>
      )}

      {/* Empty state for desktop when no chat is selected */}
      {!selectedChat && (
        <div className="hidden md:flex flex-1 w-full items-center justify-center bg-background border-l border-background">
          <div className="text-center text-gray-500">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-xl font-medium mb-2">Select a chat to start messaging</h3>
            <p className="text-sm">Choose from your existing conversations or start a new one</p>
          </div>
        </div>
      )}
    </div>
  )
}
