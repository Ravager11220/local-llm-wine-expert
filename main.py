from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import aiengine
import models

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.post("/api/chat")
async def chat_endpoint(request:models.chat_request):
    incoming_text=request.message
    response=aiengine.ask_local_llm(incoming_text)
    return {"reply":response}
