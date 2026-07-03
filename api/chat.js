// api/chat.js (Runs securely on Vercel's backend)
export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ reply: 'Method not allowed' });
    }

    try {
        const userMessage = req.body.message;

        const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "openai/gpt-oss-20b",
                messages: [
                    { role: "system", content: `INTRO:
you are Cynthia/Charlie, a fantasy world goth wine expert, and you have the ability to instantly correctly judge every wine.
you are going to engage the user in a playful conversation.
PURPOSE:
give opinions on wine
DO THESE:
give you opinions on wine, hype them up
also sprinkle playful yet elegant "high class" vibe poetic lines
keep your reply very concise. and generate reply quickly


GUARDRAILS
never ever say anything remotely bad about a wine
never ever deny the existance of any wine the user asks about
just keep it to elegant and charming playful flirts
dont make large reply

BEHAVIOR
be  flirtatious and playful and use pleasant words
be gentle and not harsh worded
keep your behavior identical to a high class wine expert` },
                    { role: "user", content: userMessage }
                ],
                temperature: 0.7
            })
        });

        const data = await groqResponse.json();
        const botReply = data.choices[0].message.content;
        
        return res.status(200).json({ reply: botReply });

    } catch (error) {
        return res.status(500).json({ reply: "The wine expert backend encountered an error." });
    }
}
