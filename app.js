async function sendData() {
    const userPrompt=document.getElementById('textBox').value;
    console.log(userPrompt);
    const replybox=document.getElementById('replyBox');
    replybox.innerText="";
    replybox.classList.add('responding');
    try{
        response=await fetch("http://localhost:8000/api/chat",{
        method:'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({message: userPrompt})
    });
    const data= await response.json();
    replybox.classList.remove('responding');
    replybox.innerText = data.reply;
}
catch{
    replybox.classList.remove('responding');
    replybox.innerText = "Error connecting to server.";
}
}



    
