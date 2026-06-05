Local LLM Wine Expert

A full-stack, decoupled local AI application that connects a browser interface to a local neural network. The system delivers enthusiastic, highly opinionated, and playful wine advice using a self-hosted pipeline.
Technical Architecture & Concepts Mastered

Transitioning from writing standard algorithmic scripts in C++ to managing an asynchronous, multi-layered web architecture required breaking down and mastering several fundamental core engineering concepts:
1. Data Serialization and Transport Contracts

JavaScript and Python run in completely separate process memories. Because they cannot natively share objects, data must be translated into a universal network text string format (JSON).

    Frontend: Captured user raw input from the DOM and used JSON.stringify({message: userPrompt}) to flatten the active memory object into a transportable text string payload.

    Backend: Leveraged Pydantic (BaseModel) to intercept the raw string payload and enforce a strict type contract, verifying the structural keys before mapping them into native Python data attributes.

2. Cross-Origin Resource Sharing (CORS) Mitigation

Browsers implement strict security policies to prevent scripts on one port from reading data from another. Since the frontend runs locally via the file system/client port and the backend runs on port 8000, explicit communication permissions were required. This was resolved by injecting CORSMiddleware into the FastAPI application stack to append the necessary security access headers to outgoing HTTP responses.
3. Asynchronous Execution Timelines

Network I/O operations are unpredictable and take time. Standard synchronous code would freeze or evaluate immediately as undefined.

    Implemented the async/await paradigm in JavaScript to halt execution on the network thread until the TCP socket returned data.

    Used this non-blocking suspension point to cleanly manipulate DOM class lists (replybox.classList.add('responding')), updating the application layout state smoothly while waiting for the LLM inference generation to complete.

System Requirements

    Ollama API: Core background engine handling model weights and localized inference execution.

    Python 3.10+: Runtime environment for the FastAPI backend gateway.

    Modern Web Browser: Handles layout compilation, DOM rendering, and client-side network scripts.

Installation & Deployment Execution Flow

To execute the application locally, start the independent system layers in structural sequence:
1. Backend Gateway Activation

Navigate to the root directory of your project, initialize your virtual environment, install the compiled dependency footprint, and run the ASGI server application wrapper:
Setup virtual environment and dependencies

python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
Start the network listener

uvicorn main:app --reload
Breakdown of the Uvicorn Command Execution:

    uvicorn: The ASGI web server process that binds the Python runtime engine to the network socket layer.

    main: Directs the runner process to locate the exact source file named main.py.

    :app: Specifies the variable name holding the instantiated FastAPI() application object within that file.

    --reload: Configures hot-reloading development monitoring, causing the server process to instantly recycle and re-map memory whenever files are updated.

2. Frontend Client Launch

Open your system's file manager and launch index.html within your web browser. The client script will automatically target the designated local server endpoint http://localhost:8000/api/chat.
Repository Structure

local-llm-wine-expert/
├── .gitignore          # Prevents environment tracking pollution (.venv/, pycache/)
├── LICENSE             # MIT Permissive open-source distribution contract
├── requirements.txt    # Frozen Python module version blueprints
├── index.html          # Static structural DOM document node layout
├── style.css           # Modular presentation layer and pseudo-element animations
├── app.js              # Event-driven asynchronous network pipeline script
├── main.py             # FastAPI backend routing and middleware gateway configuration
├── models.py           # Pydantic data modeling structural validations
├── aiengine.py         # Ollama Python client abstraction and binding handlers
└── prompts.py          # Isolated system prompt role configuration matrices
and now commiting the README.md

License

This project is open-source software licensed under the MIT License. You are free to copy, modify, distribute, or sub-license the source files provided you include the original copyright notice and liability disclaimer.
