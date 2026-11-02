export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Import OpenAI dynamically
    const { default: OpenAI } = await import("openai")

    const openai = new OpenAI({
      apiKey:
        "YOUR_API_KEY",
    })

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are Token Eye Assistant, an expert in blockchain security, cryptocurrency compliance, and threat detection. You specialize in:

1. Smart Contract Security:
   - Vulnerability assessment and auditing
   - Common attack vectors (reentrancy, overflow, etc.)
   - Best practices for secure smart contract development
   - Gas optimization and security trade-offs

2. Blockchain Compliance:
   - KYC (Know Your Customer) procedures
   - KYB (Know Your Business) requirements  
   - AML (Anti-Money Laundering) regulations
   - Transaction monitoring and reporting

3. Threat Detection:
   - Real-time blockchain threat analysis
   - Suspicious transaction patterns
   - DeFi protocol risks
   - Cross-chain security considerations

4. Regulatory Guidance:
   - Global cryptocurrency regulations
   - Compliance frameworks
   - Risk assessment methodologies
   - Reporting requirements

Always provide practical, actionable advice. Use technical terminology when appropriate but explain complex concepts clearly. Focus on security best practices and regulatory compliance. If asked about specific vulnerabilities, provide both the technical explanation and mitigation strategies.

Keep responses concise but comprehensive. Use examples when helpful.

Respond in Russian if the user writes in Russian, otherwise respond in English.`,
        },
        ...messages,
      ],
      stream: true,
      temperature: 0.7,
      max_tokens: 2000,
    })

    // Create streaming response
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content
            if (content) {
              const streamChunk = encoder.encode(`0:${JSON.stringify({ type: "text-delta", textDelta: content })}\n`)
              controller.enqueue(streamChunk)
            }
          }
          controller.close()
        } catch (error) {
          console.error("Streaming error:", error)
          controller.error(error)
        }
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    })
  } catch (error) {
    console.error("Chat API Error:", error)

    // Handle specific OpenAI errors
    let errorMessage = "Произошла техническая ошибка. Попробуйте еще раз."

    if (error instanceof Error) {
      if (error.message.includes("429")) {
        errorMessage = "Превышен лимит запросов к AI. Попробуйте через несколько минут."
      } else if (error.message.includes("401")) {
        errorMessage = "Ошибка авторизации API ключа. Проверьте настройки."
      } else if (error.message.includes("quota")) {
        errorMessage = "Исчерпан лимит API. Проверьте баланс аккаунта OpenAI."
      } else {
        errorMessage = `Ошибка: ${error.message}`
      }
    }

    // Create streaming error response
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      start(controller) {
        let index = 0
        const interval = setInterval(() => {
          if (index < errorMessage.length) {
            const char = errorMessage[index]
            const chunk = encoder.encode(`0:${JSON.stringify({ type: "text-delta", textDelta: char })}\n`)
            controller.enqueue(chunk)
            index++
          } else {
            clearInterval(interval)
            controller.close()
          }
        }, 30)
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    })
  }
}
