@AGENTS.md

# Project: Procurement AI Assistant

A Next.js 16 agentic AI web app that helps users with procurement workflows — processing supplier quotes, filling in accounting/shipping details, and answering procurement questions.

## Stack
- **Next.js 16** (App Router, `src/` layout)
- **AI SDK v3** (`ai`, `@ai-sdk/react`, `@ai-sdk/anthropic`) — v3 has breaking changes vs v2:
  - `useChat` returns `{ messages, sendMessage, status }` — no `input`/`handleInputChange`/`handleSubmit`
  - Use `DefaultChatTransport({ api })` to configure the endpoint
  - Messages have `parts` (not `content`) — use `isTextUIPart` to extract text
  - Route must use `result.toUIMessageStreamResponse()` (not `toDataStreamResponse()`)
- **Tailwind CSS v4** + shadcn/ui components in `src/components/ui/`
- **TypeScript**

## Key files
- `src/app/page.tsx` — chat UI (Client Component)
- `src/app/api/chat/route.ts` — streaming chat API route
- `src/components/ui/` — button, card, input components

## Deployment
- GitHub + Vercel Hobby (free tier)
- Set `ANTHROPIC_API_KEY` in Vercel environment variables
