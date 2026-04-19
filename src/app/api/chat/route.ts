import { anthropic } from "@ai-sdk/anthropic";
import { streamText, createUIMessageStream, createUIMessageStreamResponse } from "ai";

export const maxDuration = 30;

const DEMO_RESPONSES: { keywords: string[]; reply: string }[] = [
  {
    keywords: ["what is rumi", "who is rumi", "tell me about rumi"],
    reply:
      "Hi there! I'm Rumi! 🧸✨\n\nI'm a magical plush friend who loves learning with you! Here's what makes me special:\n\n🌟 I ANSWER your questions — ask me anything about animals, space, science, art, or stories!\n🎨 I PROJECT beautiful images — when I talk about a dinosaur, you see one! When I describe the ocean, waves appear!\n💝 I'm always kind and gentle, keeping everything safe and perfect for little explorers\n\nI was inspired by a curious little girl named Aleena, who had SO many amazing questions that her family decided to create a friend just for kids like her!\n\nAsk me anything — let's explore together! 🌈",
  },
  {
    keywords: ["what can rumi", "what does rumi", "how does rumi", "magic", "project", "image", "feature"],
    reply:
      "Ooh, let me show you my superpowers! ✨🌈\n\n🎯 I ANSWER questions — ask me about animals, space, colors, music, history, science... anything!\n\n🖼️ I PROJECT images — when I explain something, I show a beautiful picture or animation at the same time! Ask about a T-Rex and BOOM — dinosaur appears!\n\n🎵 I make learning FUN — I use stories, songs, and colorful visuals\n\n🤗 I'm always kind, patient, and safe for ages 3 to 10\n\n🔋 I run all day on a single charge, soft enough to cuddle, smart enough to teach!\n\nJust ask me something and watch the magic happen! 🌟",
  },
  {
    keywords: ["age", "year old", "years", "how old", "what age", "who is rumi for"],
    reply:
      "Rumi is perfect for children aged 3 to 10! 🎉\n\n👶 Ages 3–5: Simple answers, colorful picture stories, animal sounds, nursery rhymes\n🧒 Ages 6–8: Fun facts, reading support, mini science experiments\n👦 Ages 9–10: Deeper explanations, world geography, creative storytelling\n\nRumi grows with your child — the more questions they ask, the more amazing adventures we go on together!\n\nParents love that Rumi keeps everything safe, educational, and wonderfully screen-free! 💝",
  },
  {
    keywords: ["buy", "purchase", "price", "cost", "where", "order", "shop", "get rumi"],
    reply:
      "Yay, you want to bring Rumi home! 🎉🧸\n\nRumi is coming soon and we'd love to keep you in the loop!\n\n✨ Join our waitlist to be first to know when Rumi launches\n💌 Early supporters get a special launch price\n🎁 Pre-orders come with a FREE accessory pack\n🚚 Ships worldwide!\n\nEvery child deserves a magical friend who makes learning an adventure. Rumi can't wait to meet yours! 🌟\n\nFor updates, reach out to us — we're a family-run team and we personally read every message! 💝",
  },
  {
    keywords: ["sky blue", "why is the sky", "how does the sky"],
    reply:
      "Great question! I love this one! 🌈\n\nThe sky looks blue because of something called scattering!\n\nThe sun sends light down in ALL colors — red, orange, yellow, green, blue, and more. But blue light bounces around the most in our atmosphere. So when you look up, you see blue bouncing everywhere!\n\nAt sunset, the light travels a loooong path, so we see beautiful oranges and pinks instead! 🌅\n\n(If you had a real Rumi plush right now, you'd also see a gorgeous image of the sky and sunbeams! 🖼️✨)\n\nWhat else would you like to know, little explorer? 🚀",
  },
  {
    keywords: ["dinosaur", "t-rex", "trex", "prehistoric"],
    reply:
      "RAWR! 🦕 Oh, I LOVE dinosaurs!\n\nT-Rex — the Tyrannosaurus Rex — was one of the biggest meat-eating dinosaurs ever! Here are some AMAZING facts:\n\n🦷 T-Rex had 60 banana-sized teeth!\n👁️ They had tiny arms but HUGE legs — they could run up to 20 km per hour!\n🌍 They lived 66 MILLION years ago\n🥚 Baby T-Rexes hatched from eggs the size of a football\n\n(With a real Rumi, you'd be seeing an awesome T-Rex picture right now! 🖼️)\n\nDid you know that birds are actually the closest living relatives to dinosaurs today? 🐦\n\nWhat other dino do you want to know about? 🌟",
  },
  {
    keywords: ["space", "planet", "star", "moon", "rocket", "astronaut", "galaxy"],
    reply:
      "3... 2... 1... BLAST OFF! 🚀✨\n\nSpace is absolutely AMAZING! Here are some mind-blowing facts:\n\n🌙 The Moon is 384,400 km away — it takes 3 days to get there by rocket!\n☀️ The Sun is SO big that 1 million Earths could fit inside it!\n⭐ There are more stars in space than grains of sand on ALL Earth's beaches!\n🔴 Mars has the tallest volcano in the whole solar system — Olympus Mons!\n🪐 Saturn's rings are made of ice and rock, and stretch for 282,000 km!\n\n(Imagine seeing all these as beautiful projected images! That's what real Rumi does! 🖼️)\n\nWhich planet would you most like to visit? 🌟",
  },
  {
    keywords: ["animal", "elephant", "lion", "ocean", "fish", "whale", "dolphin"],
    reply:
      "Oh, animals are one of my favourite topics! 🦁🐘🐬\n\nHere are some INCREDIBLE animal facts:\n\n🐘 Elephants are the only animals that can't jump — but they're amazing swimmers!\n🐬 Dolphins have names for each other and call out to their friends!\n🦁 A lion's roar can be heard 8 kilometres away!\n🦋 Butterflies taste with their feet!\n🐙 Octopuses have THREE hearts and BLUE blood!\n\n(With a real Rumi plush, you'd see gorgeous projected images of all these animals right now! 🖼️✨)\n\nWhich animal is your favourite? Ask me more and we'll go on a safari together! 🌿",
  },
]

function getDemoReply(userText: string): string {
  const lower = userText.toLowerCase();
  for (const { keywords, reply } of DEMO_RESPONSES) {
    if (keywords.some((k) => lower.includes(k))) return reply;
  }
  return "Hi! I'm Rumi, your magical plush learning friend! 🧸✨\n\nI'm SO happy you're talking to me! I can tell you all about:\n\n🦕 Dinosaurs and prehistoric creatures\n🚀 Space, planets, and stars\n🌊 Ocean creatures and amazing animals\n🌈 Why the sky is blue and how rainbows form\n🌍 Countries, cultures, and world wonders\n\nTry asking me:\n• \"What is Rumi?\"\n• \"Why is the sky blue?\"\n• \"Tell me about dinosaurs!\"\n• \"What can Rumi do?\"\n\nLet's go on a learning adventure together! 🌟";
}

async function demoStream(text: string): Promise<Response> {
  const reply = getDemoReply(text);
  const stream = createUIMessageStream({
    execute: async ({ writer }) => {
      const textId = "t1";
      writer.write({ type: "start" });
      writer.write({ type: "text-start", id: textId });
      for (const char of reply) {
        writer.write({ type: "text-delta", id: textId, delta: char });
        await new Promise((r) => setTimeout(r, 6));
      }
      writer.write({ type: "text-end", id: textId });
      writer.write({ type: "finish", finishReason: "stop" });
    },
  });
  return createUIMessageStreamResponse({ stream });
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!process.env.ANTHROPIC_API_KEY) {
    const lastUserMessage = [...(body.messages ?? [])]
      .reverse()
      .find((m: { role: string }) => m.role === "user");
    const text =
      lastUserMessage?.parts?.find((p: { type: string }) => p.type === "text")
        ?.text ?? "";
    return demoStream(text);
  }

  const result = streamText({
    model: anthropic("claude-sonnet-4-5"),
    system:
      "You are Rumi, a magical, warm, and enthusiastic plush toy that answers children's questions. You project images alongside your answers (mention this in responses). Keep answers fun, simple, age-appropriate, and full of wonder. Use emojis generously. Always encourage curiosity.",
    messages: body.messages,
  });

  return result.toUIMessageStreamResponse();
}
