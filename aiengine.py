import ollama
import prompts

def ask_local_llm(useir):
    print("--- Firing up local model stream ---")
    
    # 1. Trigger the text generation request
    response = ollama.generate(
        model='llama3.2', 
        prompt=prompts.SYSTEM_PROMPTS+"\nUser message: "+useir
    )
    
    # 2. Extract and print the text payload from the response object
    return (response['response'])

