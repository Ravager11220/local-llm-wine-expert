# Local LLM Wine Expert

A full-stack, decoupled local AI application that connects a native browser interface to a self-hosted neural network. The system delivers responsive, highly opinionated, and playful wine advice using a localized inference pipeline.

## Engineering Highlight: Zero-Framework, Zero-Dependency Implementation

Every single line of this project—across the entire stack—was written by hand.

* **Frontend:** Built entirely using native HTML5, vanilla CSS3, and raw JavaScript without reliance on React, Tailwind, or external UI libraries. This ensures an exceptionally lightweight footprint with zero third-party client dependencies.
* **Backend:** Built directly on top of the native Python ASGI ecosystem using FastAPI and Uvicorn to manage asynchronous execution and data streaming.

---

## Technical Architecture & Core Concepts Mastered

Transitioning from standard algorithmic C++ development to an asynchronous, multi-layered web architecture required mastering several core systems-level engineering concepts:

### 1. Data Serialization and Transport Contracts

Because JavaScript (browser client) and Python (server) run in isolated process memories and cannot share native objects, data is translated into a universal string format (JSON).

* **Client Side:** Captures raw input from the DOM and utilizes `JSON.stringify()` to flatten active memory objects into transportable network payloads.
* **Server Side:** Leverages Pydantic data models to intercept incoming payloads, enforcing a strict type contract to validate structural keys before mapping them into native Python attributes.

### 2. Cross-Origin Resource Sharing (CORS) Mitigation

Browsers restrict scripts running on a local file system or a client-side origin from reading data from a distinct port. To allow communication with the backend on port 8000, explicit permissions were handled by injecting CORS middleware directly into the FastAPI application stack, appending the necessary access-control headers to outgoing HTTP responses.

### 3. Asynchronous Execution Timelines

Network I/O operations and model inference are inherently unpredictable. To prevent the single-threaded browser interface from freezing during computation, the system implements the `async/await` paradigm in JavaScript. This halts execution on the network thread until the TCP socket returns data, while cleanly manipulating DOM class lists to update the visual interface state dynamically.

---

## System Requirements

* **Ollama API:** Core local engine handling model weights and localized inference execution.
* **Python 3.10+:** Runtime environment for the FastAPI backend gateway.
* **Modern Web Browser:** Handles layout compilation, DOM rendering, and client-side network scripts.

---

## Installation & Deployment

To execute the application locally, start the independent system layers in structural sequence:

### 1. Backend Gateway Activation

Navigate to the root directory, initialize a virtual environment, install the dependencies, and run the ASGI server:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload

```

* **`uvicorn main:app`**: Binds the Python runtime engine to the network socket layer, directing the runner process to locate the `app` instance inside `main.py`.
* **`--reload`**: Configures hot-reloading to instantly re-map memory whenever backend files are modified.

### 2. Frontend Client Launch

Launch `index.html` within any modern web browser. The native client script automatically points to the local server endpoint at `http://localhost:8000/api/chat`.

---

## Repository Structure

```
local-llm-wine-expert/
├── requirements.txt    # Frozen Python module version blueprints
├── index.html          # Static structural DOM document node layout
├── style.css           # Custom presentation layer and layout animations
├── app.js              # Event-driven asynchronous network pipeline script
├── main.py             # FastAPI backend routing and middleware configuration
├── models.py           # Pydantic data modeling and structural validation
├── aiengine.py         # Ollama Python client abstraction and binding handlers
└── prompts.py          # Isolated system prompt role configuration matrices

```

---

## License

This project is licensed under the MIT License.
