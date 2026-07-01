async function sendData() {
    const userPrompt = document.getElementById('textBox').value;
    console.log(userPrompt);
    const replybox = document.getElementById('replyBox');
    replybox.innerText = "";
    replybox.classList.add('responding');
    
    const controller = new AbortController();
    let timeoutId;
    
    try {
        timeoutId = setTimeout(() => {
            controller.abort(); // Forcefully kills the fetch request if clock hits 0
        }, 60000);
        
        // Swapped the local host URL out for Vercel's relative API route path
        const response = await fetch("/api/chat", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ message: userPrompt }),
            signal: controller.signal,
        });
        
        const data = await response.json();
        clearTimeout(timeoutId);
        replybox.classList.remove('responding');
        replybox.innerText = data.reply;
       
    } catch(error) {
        clearTimeout(timeoutId);
        replybox.classList.remove('responding');
        if (error.name === 'AbortError') {
            replybox.style.border = "1px solid #ff4a4a"; // UI visual change on error
            replybox.innerText = "The expert took too long to answer. Request timed out.";
        } else {
            replybox.innerText = "Error connecting to server.";
        }
    }
}



    
