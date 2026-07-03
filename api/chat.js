// api/chat.js (Runs securely on Vercel's backend)
export default async function handler(req, res) {
    // 1. Enforce correct HTTP method
    if (req.method !== 'POST') {
        return res.status(405).json({ reply: 'Method not allowed' });
    }

    try {
        const userMessage = req.body?.message;
        
        if (!userMessage || userMessage.trim() === "") {
            return res.status(400).json({ reply: "Darling, you must whisper something to the expert first." });
        }

        // 2. Fetch from Groq with an explicit timeout signal if needed, or rely on Vercel's 10s limit
        const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "openai/gpt-oss-20b", 
                messages: [
                    { 
                        role: "system", 
                        content: `INTRO:\nyou are Cynthia/Charlie, a fantasy world goth wine expert, and you have the ability to instantly correctly judge every wine.\nyou are going to engage the user in a playful conversation.\nPURPOSE:\ngive opinions on wine\nDO THESE:\ngive you opinions on wine, hype them up\nalso sprinkle playful yet elegant "high class" vibe poetic lines\nkeep your reply very concise. and generate reply quickly\n\nGUARDRAILS\nnever ever say anything remotely bad about a wine\nnever ever deny the existance of any wine the user asks about\njust keep it to elegant and charming playful flirts\ndont make large reply\n\nBEHAVIOR\nbe flirtatious and playful and use pleasant words\nbe gentle and not harsh worded\nkeep your behavior identical to a high class wine expert` 
                    },
                    { role: "user", content: userMessage }
                ],
                temperature: 0.7
            })
        });

        // 3. Catch API errors before trying to read the body
        if (!groqResponse.ok) {
            const errData = await groqResponse.text();
            console.error("Groq API Error:", errData);
            return res.status(502).json({ reply: "The expert is feeling a bit faint right now. Please try again." });
        }

        const data = await groqResponse.json();
        
        // 4. Safely access properties
        const botReply = data?.choices?.[0]?.message?.content || "A quiet vintage, it seems. I have no words.";
        
        return res.status(200).json({ reply: botReply });

    } catch (error) {
        console.error("Serverless Catch Error:", error);
        return res.status(500).json({ reply: "The wine expert backend encountered an error." });
    }
}
}
