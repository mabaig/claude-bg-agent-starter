import { anthropic } from "@ai-sdk/anthropic";
import { streamText, createUIMessageStream, createUIMessageStreamResponse } from "ai";

export const maxDuration = 30;

const DEMO_RESPONSES: { keywords: string[]; reply: string }[] = [
  {
    keywords: ["quote", "supplier", "process"],
    reply:
      "I can help you process that supplier quote! Here's what I'd do:\n\n1. **Verify supplier details** — confirm the supplier name, address, and contact match your vendor master\n2. **Check line items** — validate quantities, unit prices, and discount amounts\n3. **Review payment terms** — note the due date and any early payment discounts\n4. **Select accounting codes** — assign the correct Cost Center and GL Account for each line item\n5. **Submit for approval** — route to the appropriate approver based on spend thresholds\n\nPaste the quote details and I'll walk through each step with you!",
  },
  {
    keywords: ["gl account", "lab", "equipment", "laboratory"],
    reply:
      "For lab equipment purchases, the typical GL accounts are:\n\n- **6510000** — Lab Equipment & Instruments (capital items over $5,000)\n- **6520000** — Lab Supplies & Consumables (reagents, disposables)\n- **6530000** — Lab Equipment Maintenance & Repair\n- **7110000** — R&D Equipment (if used for research projects)\n\nThe right account depends on whether the item is expensed or capitalized. Items over your company's capitalization threshold (often $2,500–$5,000) go to a capital account; below that, use the supplies/consumables account.",
  },
  {
    keywords: ["cost center", "gl", "difference", "explain", "vs"],
    reply:
      "Great question! Here's the difference:\n\n**Cost Center**\n- Represents *who* is spending (a department or team)\n- Examples: Marketing (CC-1001), Engineering (CC-2005), Finance (CC-3010)\n- Used to track spending by organizational unit\n\n**GL Account**\n- Represents *what* is being purchased (the type of expense)\n- Examples: Office Supplies (7001), Travel (7200), Software Licenses (7350)\n- Used to categorize expenses by type\n\nEvery purchase needs both — the Cost Center tells finance which budget to charge, and the GL Account tells them what was bought.",
  },
  {
    keywords: ["justification", "purchase", "draft", "write"],
    reply:
      "Here's a purchase justification template you can adapt:\n\n---\n**Purchase Justification**\n\n**Item:** [Product/Service Name]\n**Supplier:** [Vendor Name]\n**Total Cost:** $[Amount]\n\n**Business Need:**\nThis purchase is required to [describe the business purpose — e.g., support ongoing lab operations, fulfill project X requirements, replace end-of-life equipment].\n\n**Impact if Not Approved:**\n[Describe consequence — e.g., project delays, compliance risk, operational downtime]\n\n**Alternatives Considered:**\n[List 1–2 alternatives evaluated and why this option was chosen — cost, quality, lead time]\n\n**Budget:**\nThis spend is [within / above] the approved budget for [department] in FY[Year].\n\n---\nReplace the bracketed sections with your specifics and you're ready to submit!",
  },
  {
    keywords: ["shipping", "deliver", "plant", "warehouse"],
    reply:
      "For shipping details in a purchase requisition, you'll typically need:\n\n- **Ship-to (Plant)** — the receiving location code (e.g., J1E2 - Bayer Whippany). Select from your plant master list.\n- **Deliver to** — the specific desk, room, or dock number within the plant (e.g., Desk 12345 or Loading Dock B)\n- **Need-by date** — the date you need the goods to arrive. Factor in supplier lead time (check the quote) plus internal processing time (usually 2–3 business days)\n\nTip: Always add a few days buffer to the need-by date to account for shipping delays!",
  },
];

function getDemoReply(userText: string): string {
  const lower = userText.toLowerCase();
  for (const { keywords, reply } of DEMO_RESPONSES) {
    if (keywords.some((k) => lower.includes(k))) return reply;
  }
  return "I'm running in demo mode (no API key configured). I have sample answers for:\n\n• Processing a supplier quote\n• GL accounts for lab equipment\n• Cost center vs GL account\n• Writing a purchase justification\n• Shipping & delivery details\n\nTry asking about one of those topics, or add an Anthropic API key to enable full AI responses!";
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
        await new Promise((r) => setTimeout(r, 8));
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
      "You are Lumi, a helpful AI assistant specializing in procurement workflows. Help users process supplier quotes, select accounting codes, fill in shipping details, and navigate purchasing processes.",
    messages: body.messages,
  });

  return result.toUIMessageStreamResponse();
}
