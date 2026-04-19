'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, isTextUIPart } from 'ai'
import { SendIcon } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'

const transport = new DefaultChatTransport({ api: '/api/chat' })

const SUGGESTIONS = [
  { label: 'What is Rumi? 🧸', query: 'What is Rumi?' },
  { label: 'What can Rumi do? ✨', query: 'What can Rumi do?' },
  { label: 'What age is Rumi for? 👶', query: 'What age is Rumi for?' },
  { label: 'Why is the sky blue? 🌈', query: 'Why is the sky blue?' },
  { label: 'Where can I buy Rumi? 🛍️', query: 'Where can I buy Rumi?' },
]

export default function Home() {
  const { messages, sendMessage, status } = useChat({ transport })
  const [input, setInput] = useState('')
  const chatRef = useRef<HTMLDivElement>(null)
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

  function scrollToChat() {
    chatRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-full bg-white overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧸</span>
            <span className="text-xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Rumi
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a href="#benefits" className="text-sm text-gray-500 hover:text-pink-500 transition-colors hidden sm:block font-medium">Benefits</a>
            <a href="#how" className="text-sm text-gray-500 hover:text-pink-500 transition-colors hidden sm:block font-medium">How it Works</a>
            <a href="#team" className="text-sm text-gray-500 hover:text-pink-500 transition-colors hidden sm:block font-medium">Our Team</a>
            <button
              onClick={scrollToChat}
              className="text-sm text-white px-5 py-2 rounded-full font-bold transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #FF69B4, #DA70D6)', boxShadow: '0 0 16px #FF69B450' }}
            >
              Chat with Rumi 💬
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background blobs */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-pink-50 to-purple-50" />
        <div className="absolute top-24 left-8 w-80 h-80 bg-pink-200 rounded-full blur-3xl opacity-40 animate-pulse" />
        <div className="absolute bottom-16 right-8 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-30 animate-pulse [animation-delay:1.5s]" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-yellow-100 rounded-full blur-3xl opacity-35 animate-pulse [animation-delay:3s]" />

        {/* Floating sparkles */}
        <span className="absolute top-28 left-[20%] text-4xl" style={{ animation: 'rumiSparkle 2s ease-in-out infinite' }}>✨</span>
        <span className="absolute top-40 right-[18%] text-3xl" style={{ animation: 'rumiSparkle 2.5s ease-in-out infinite 0.5s' }}>⭐</span>
        <span className="absolute bottom-36 left-[28%] text-3xl" style={{ animation: 'rumiSparkle 3s ease-in-out infinite 1s' }}>🌟</span>
        <span className="absolute top-1/2 right-[12%] text-2xl" style={{ animation: 'rumiSparkle 2s ease-in-out infinite 1.5s' }}>💫</span>
        <span className="absolute bottom-52 right-[30%] text-2xl" style={{ animation: 'rumiSparkle 2.5s ease-in-out infinite 0.8s' }}>✨</span>
        <span className="absolute top-36 left-[10%] text-xl" style={{ animation: 'rumiSparkle 3s ease-in-out infinite 2s' }}>🌸</span>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Mascot */}
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-300 to-purple-300 blur-3xl opacity-60 scale-125 animate-pulse" />
            <div
              className="relative text-[8rem] sm:text-[11rem] leading-none select-none"
              style={{ animation: 'rumiFloat 3s ease-in-out infinite', filter: 'drop-shadow(0 0 40px #FF69B470)' }}
            >
              🧸
            </div>
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold mb-3 leading-tight">
            <span className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
              Meet Rumi!
            </span>
          </h1>
          <p className="text-lg sm:text-2xl text-gray-600 mb-3 font-semibold max-w-2xl mx-auto leading-relaxed">
            The magical plush friend that{' '}
            <span className="text-pink-500">answers your questions</span>
            {' '}and{' '}
            <span className="text-purple-500">projects beautiful images</span>! 🌈
          </p>
          <p className="text-base text-gray-400 mb-10 max-w-xl mx-auto">
            Soft, cuddly, and full of wonder — Rumi makes every question a magical adventure for children ages 3–10 ✨
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={scrollToChat}
              className="group relative px-8 py-4 text-lg font-extrabold text-white rounded-full transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #FF69B4, #DA70D6, #9370DB)',
                boxShadow: '0 0 30px #FF69B460, 0 8px 24px rgba(0,0,0,0.15)',
                animation: 'rumiGlow 3s ease-in-out infinite',
              }}
            >
              Chat with Rumi 💬
            </button>
            <a
              href="#benefits"
              className="px-8 py-4 text-lg font-bold text-pink-500 rounded-full border-2 border-pink-300 hover:bg-pink-50 hover:border-pink-400 transition-all duration-300 hover:scale-105"
            >
              Explore the Magic ✨
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-pink-400 animate-bounce">
          <span className="text-xs font-medium tracking-wide uppercase">Scroll</span>
          <span className="text-lg">↓</span>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section id="benefits" className="py-24 px-6 bg-gradient-to-b from-white to-pink-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-pink-400 font-bold uppercase tracking-widest text-sm mb-2">Why Children Love Rumi</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold">
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                More Than a Toy
              </span>
            </h2>
            <p className="text-gray-400 mt-3 text-lg max-w-md mx-auto">A lifelong learning companion that grows with your child 💝</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                emoji: '🎯',
                title: 'Answers Every Question',
                desc: 'From "Why is the sky blue?" to "How big are dinosaurs?" — Rumi gives fun, kind, age-perfect answers that spark a love of learning!',
                gradient: 'from-pink-400 to-rose-400',
                bg: 'bg-gradient-to-br from-pink-50 to-rose-50',
                border: 'border-pink-100',
              },
              {
                emoji: '🌈',
                title: 'Projects Beautiful Images',
                desc: 'Watch stories come alive! Rumi projects vivid animations that match every answer — turning learning into a magical visual show.',
                gradient: 'from-purple-400 to-indigo-400',
                bg: 'bg-gradient-to-br from-purple-50 to-indigo-50',
                border: 'border-purple-100',
              },
              {
                emoji: '💝',
                title: 'Grows with Your Child',
                desc: "Rumi adapts to your child's age and curiosity. From nursery rhymes at 3 to deeper science at 10 — always perfectly matched!",
                gradient: 'from-amber-400 to-orange-400',
                bg: 'bg-gradient-to-br from-amber-50 to-orange-50',
                border: 'border-amber-100',
              },
            ].map((card) => (
              <div
                key={card.title}
                className={`group ${card.bg} rounded-3xl p-8 border ${card.border} shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-default`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                >
                  {card.emoji}
                </div>
                <h3 className="text-xl font-extrabold text-gray-800 mb-3">{card.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { num: '3–10', label: 'Age Range', emoji: '🎂' },
              { num: '1000+', label: 'Fun Topics', emoji: '📚' },
              { num: '100%', label: 'Child Safe', emoji: '🛡️' },
              { num: '∞', label: 'Curiosity Unlocked', emoji: '🚀' },
            ].map((s) => (
              <div key={s.label} className="text-center bg-white rounded-2xl p-6 shadow-sm border border-pink-100 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-2">{s.emoji}</div>
                <div className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  {s.num}
                </div>
                <div className="text-xs text-gray-400 mt-1 font-semibold uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="py-24 px-6 bg-gradient-to-b from-pink-50 to-purple-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-purple-400 font-bold uppercase tracking-widest text-sm mb-2">Simple & Magical</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                How Rumi Works
              </span>
            </h2>
            <p className="text-gray-400 mt-3 text-lg">Three magical steps to wonder ✨</p>
          </div>

          <div className="space-y-6">
            {[
              {
                step: '1', emoji: '💬',
                title: 'Ask Rumi Anything',
                desc: 'Your child asks any question — about animals, space, stories, colors, or anything that sparks their curiosity!',
                grad: 'from-pink-400 to-rose-400',
              },
              {
                step: '2', emoji: '🤔',
                title: 'Rumi Thinks & Answers',
                desc: "Rumi listens and gives a friendly, fun answer that's just right for your child's age and learning level.",
                grad: 'from-purple-400 to-indigo-400',
              },
              {
                step: '3', emoji: '🖼️',
                title: 'See Images Come Alive!',
                desc: 'Rumi projects a beautiful image or animation that matches the answer — turning every question into a visual adventure!',
                grad: 'from-amber-400 to-pink-400',
              },
            ].map((s) => (
              <div key={s.step} className="flex gap-5 items-start group">
                <div
                  className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${s.grad} flex items-center justify-center text-white text-2xl font-black shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {s.step}
                </div>
                <div className="bg-white rounded-3xl p-6 flex-1 shadow-sm border border-pink-100 hover:shadow-md transition-shadow duration-300">
                  <h3 className="text-lg font-extrabold text-gray-800 mb-1 flex items-center gap-2">
                    <span>{s.emoji}</span> {s.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section id="team" className="py-24 px-6 bg-gradient-to-b from-purple-50 to-pink-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-pink-400 font-bold uppercase tracking-widest text-sm mb-2">The Dreamers Behind Rumi</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold">
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Meet Our Team
              </span>
            </h2>
            <p className="text-gray-400 mt-3 text-lg max-w-md mx-auto">
              A family on a mission to make every child&apos;s curiosity magical 🌟
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-3xl mx-auto">
            {/* Aleena */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-pink-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative h-72 overflow-hidden bg-gradient-to-br from-pink-100 to-rose-100">
                <img
                  src="/aleena.jpg"
                  alt="Aleena"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-8xl hidden" id="aleena-fallback">🧒</div>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-pink-900/20 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-extrabold text-gray-800">Aleena</h3>
                  <span className="text-lg">✨</span>
                </div>
                <p className="text-pink-500 font-bold text-sm mb-3 uppercase tracking-wide">Chief Inspiration Officer</p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  The bright, curious mind who inspired Rumi! Aleena&apos;s endless questions and love of learning sparked the idea for a magical toy that answers kids just like her.
                </p>
                <div className="mt-4 flex gap-2">
                  <span className="text-xs bg-pink-50 text-pink-500 px-3 py-1 rounded-full font-semibold border border-pink-100">💡 Big Ideas</span>
                  <span className="text-xs bg-purple-50 text-purple-500 px-3 py-1 rounded-full font-semibold border border-purple-100">❓ Endless Questions</span>
                </div>
              </div>
            </div>

            {/* Founders */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-purple-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative h-72 overflow-hidden bg-gradient-to-br from-purple-100 to-indigo-100">
                <img
                  src="/team.jpg"
                  alt="Founding Team"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-extrabold text-gray-800">The Founding Team</h3>
                  <span className="text-lg">🚀</span>
                </div>
                <p className="text-purple-500 font-bold text-sm mb-3 uppercase tracking-wide">Builders of Dreams</p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  A passionate team turning a child&apos;s curiosity into reality — combining a love of technology, storytelling, and childhood wonder to build something truly magical.
                </p>
                <div className="mt-4 flex gap-2">
                  <span className="text-xs bg-purple-50 text-purple-500 px-3 py-1 rounded-full font-semibold border border-purple-100">🛠️ Builders</span>
                  <span className="text-xs bg-pink-50 text-pink-500 px-3 py-1 rounded-full font-semibold border border-pink-100">💝 Family First</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAT ── */}
      <section
        id="chat"
        ref={chatRef}
        className="py-24 px-6 bg-gradient-to-b from-pink-50 to-white"
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div
              className="text-6xl mb-4 inline-block"
              style={{ animation: 'rumiFloat 3s ease-in-out infinite', filter: 'drop-shadow(0 0 20px #FF69B450)' }}
            >
              🧸
            </div>
            <p className="text-pink-400 font-bold uppercase tracking-widest text-sm mb-2">Try it now!</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-3">
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Ask Rumi Anything!
              </span>
            </h2>
            <p className="text-gray-400 text-base">Type a question and watch the magic happen ✨</p>
          </div>

          {/* Chat box */}
          <div
            className="bg-white rounded-3xl overflow-hidden border border-pink-100"
            style={{ boxShadow: '0 0 60px #FF69B418, 0 20px 60px rgba(0,0,0,0.08)' }}
          >
            {/* Chat header */}
            <div
              className="px-6 py-4 flex items-center gap-3"
              style={{ background: 'linear-gradient(135deg, #FF69B4, #DA70D6, #9370DB)' }}
            >
              <div className="text-2xl" style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.3))' }}>🧸</div>
              <div>
                <div className="text-white font-bold text-sm">Rumi</div>
                <div className="text-pink-100 text-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-300 rounded-full inline-block animate-pulse" />
                  Ready to answer!
                </div>
              </div>
            </div>

            {/* Messages area */}
            <div className="h-96 overflow-y-auto px-4 py-6 space-y-4 bg-gradient-to-b from-pink-50/40 to-white">
              {messages.length === 0 && (
                <div className="text-center py-6">
                  <p className="text-gray-400 text-sm mb-5">Hi there! What would you like to know? 💭</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s.query}
                        onClick={() => submit(s.query)}
                        className="text-xs px-3 py-2 bg-white border-2 border-pink-200 rounded-full text-pink-500 hover:bg-pink-50 hover:border-pink-400 transition-all duration-200 hover:scale-105 font-semibold shadow-sm"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message) => {
                const text = message.parts.filter(isTextUIPart).map((p) => p.text).join('')
                const isUser = message.role === 'user'
                return (
                  <div key={message.id} className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
                    {!isUser && (
                      <div
                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-base shadow-md"
                        style={{ background: 'linear-gradient(135deg, #FF69B4, #DA70D6)' }}
                      >
                        🧸
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                        isUser
                          ? 'text-white rounded-br-sm'
                          : 'bg-white border border-pink-100 text-gray-700 rounded-bl-sm'
                      }`}
                      style={isUser ? { background: 'linear-gradient(135deg, #DA70D6, #9370DB)' } : {}}
                    >
                      <p className="whitespace-pre-wrap">{text}</p>
                    </div>
                    {isUser && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 flex items-center justify-center text-sm font-bold text-white shadow-md">
                        👤
                      </div>
                    )}
                  </div>
                )
              })}

              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-base shadow-md"
                    style={{ background: 'linear-gradient(135deg, #FF69B4, #DA70D6)' }}
                  >
                    🧸
                  </div>
                  <div className="bg-white border border-pink-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                    <div className="flex gap-1 items-center h-4">
                      <span className="w-2 h-2 rounded-full bg-pink-400 animate-bounce [animation-delay:0ms]" />
                      <span className="w-2 h-2 rounded-full bg-pink-400 animate-bounce [animation-delay:150ms]" />
                      <span className="w-2 h-2 rounded-full bg-pink-400 animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input bar */}
            <div className="px-4 py-4 border-t border-pink-100 bg-white">
              <form
                onSubmit={(e) => { e.preventDefault(); submit(input) }}
                className="flex gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Rumi anything... 💭"
                  disabled={isLoading}
                  className="flex-1 rounded-full px-5 py-3 text-sm border-2 border-pink-200 focus:border-pink-400 focus:outline-none bg-pink-50/50 placeholder:text-pink-300 text-gray-700 transition-colors font-medium"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-300 disabled:opacity-40 hover:scale-110 flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #FF69B4, #DA70D6)', boxShadow: '0 0 16px #FF69B450' }}
                >
                  <SendIcon className="size-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="py-14 px-6 text-white text-center"
        style={{ background: 'linear-gradient(135deg, #FF69B4, #DA70D6, #9370DB)' }}
      >
        <div
          className="text-5xl mb-3 inline-block"
          style={{ animation: 'rumiFloat 3s ease-in-out infinite', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.25))' }}
        >
          🧸
        </div>
        <div className="text-3xl font-extrabold mb-2 tracking-tight">Rumi</div>
        <p className="text-pink-100 text-sm max-w-sm mx-auto mb-6 leading-relaxed">
          Making learning magical, one question at a time. For curious minds everywhere. ✨
        </p>
        <div className="flex justify-center gap-6 mb-8">
          {['🦕 Dinosaurs', '🚀 Space', '🌊 Ocean', '🎨 Art', '🌍 World'].map((t) => (
            <span key={t} className="text-xs text-pink-200 font-medium hidden sm:inline">{t}</span>
          ))}
        </div>
        <p className="text-pink-200 text-xs">© 2025 Rumi. Made with 💝 for little explorers everywhere.</p>
      </footer>
    </div>
  )
}
