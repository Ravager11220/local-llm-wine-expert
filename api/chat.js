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
                    { role: "system", content: "You are an expert wine sommelier." },
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
