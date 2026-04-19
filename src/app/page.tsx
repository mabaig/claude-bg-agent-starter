'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, isTextUIPart } from 'ai'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { SendIcon, BotIcon, UserIcon } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'

const transport = new DefaultChatTransport({ api: '/api/chat' })

const SUGGESTIONS = [
  'Help me process this supplier quote',
  'What GL account should I use for lab equipment?',
  'Explain cost center vs. GL account',
  'Draft a purchase justification',
]

export default function Home() {
  const { messages, sendMessage, status } = useChat({ transport })
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const isLoading = status === 'streaming' || status === 'submitted'

  function submit(text: string) {
    if (!text.trim() || isLoading) return
    setInput('')
    sendMessage({ text })
  }

  return (
    <div className="flex flex-col h-full bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="border-b bg-white dark:bg-zinc-900 px-6 py-4 flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
          <BotIcon className="size-4 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Aleena&apos;s Lumi Assistant
          </h1>
          <p className="text-xs text-zinc-500">
            Paste a quote or ask about procurement tasks
          </p>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 gap-4 text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10">
                <BotIcon className="size-6 text-primary" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-200">
                  How can I help with procurement?
                </h2>
                <p className="text-sm text-zinc-500 mt-1 max-w-sm">
                  Paste a supplier quote, ask about accounting codes, shipping
                  details, or any procurement workflow question.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md mt-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => submit(s)}
                    className="text-left text-xs px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => {
            const text = message.parts
              .filter(isTextUIPart)
              .map((p) => p.text)
              .join('')

            return (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 shrink-0 mt-0.5">
                    <BotIcon className="size-3.5 text-primary" />
                  </div>
                )}
                <Card
                  className={`max-w-[80%] ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground ring-0'
                      : 'bg-white dark:bg-zinc-800'
                  }`}
                  size="sm"
                >
                  <CardContent className="py-2">
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">
                      {text}
                    </p>
                  </CardContent>
                </Card>
                {message.role === 'user' && (
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-zinc-200 dark:bg-zinc-700 shrink-0 mt-0.5">
                    <UserIcon className="size-3.5 text-zinc-600 dark:text-zinc-300" />
                  </div>
                )}
              </div>
            )
          })}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 shrink-0 mt-0.5">
                <BotIcon className="size-3.5 text-primary" />
              </div>
              <Card className="bg-white dark:bg-zinc-800" size="sm">
                <CardContent className="py-2">
                  <div className="flex gap-1 items-center h-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:300ms]" />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </main>

      {/* Input */}
      <footer className="border-t bg-white dark:bg-zinc-900 px-4 py-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            submit(input)
          }}
          className="max-w-3xl mx-auto flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about procurement, paste a quote..."
            className="flex-1 h-10 text-sm"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            size="icon"
            className="h-10 w-10 shrink-0"
          >
            <SendIcon className="size-4" />
          </Button>
        </form>
      </footer>
    </div>
  )
}
