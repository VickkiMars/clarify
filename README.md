# Clarify | Clarif.ai

run `view_documentation.py` if you want a more visual feel to this Markdown file.

run `random.html` to see an example of the idea.

# backend/app/main.py

**Description:**

This is the main entry point for the Flask backend application. It initializes the Flask app instance, loads configuration settings, initializes extensions (like CORS for handling cross-origin requests), and registers the API blueprint (`api_bp`) to handle API endpoints under the `/api ` prefix. Running this file directly starts the Flask development server.

# backend/app/config.py

**Description**

This file defines the configuration settings for the Flask application. It's structured as a Python class (`Config`) where you can store various application-level configurations, such as debugging mode, API keys (thought it's recommended to use environment variables for sensitive data in production), database URLs, and other settings that control the behavior of the backend.

# backend/app/extensions.py

**Description:**

This file is dedicted to initializing Flask extensions used in the application. By initializing extensions here and then attaching them to the Flask app instance in `main.py`, it promotes a cleaner separation of concerns and avoids circular dependencies. Currently it initializes the `CORS` extension to handle Cross-Origin Resource Sharing, allowing your React frontend (potentially running on a different domain) to communicate with the backend API.

# backend/app/api/__init__.py

**Description:**

This file makes the `api` directory a Python package and defines the Flask `Blueprint` named `api_bp`. Blueprints are a way to organize a group of  related routes and other code within a Flask application. `api_bp` is used to register the API endpoints defined in `routes.py` and associate them with the `/api` URL prefix. It also import the `routes` and `schemas` modules within the `api` package, making their contents available.

# backend/app/api/routes.py

**Description:**

This file defines the API endpoints for the `Clarify` backend using the `api_bp` Blueprint. Currently, it contains a single POST route `/api/clarify`. This route:
 1. Receives a JSON payload in the request body containing the `topic` to be clarified.
 2. Uses the `ClarifyRequestSchema` to validate the incoming data.
 3. Calls the `generate_explanation` function from the `backend.app.logic.explanation_generator` module to retrieve the explanation for the given topic.
 4. Uses the `ClarifyResponseSchema` to format the explanation into a JSON response.
 5. Returns the JSON response with a 200 OK status code on success.
 6. Handles validation errors (400 Bad Request) and other exceptions (500 Internal Server Error), returning appropriate JSON error messages.

# backend/app/api/schemas.py

**Description:**

This file defines the data schemas for the API using the `marshmallow` library. Schemas are used for:

* **Serialization:** Converting Python objects into JSON for API responses.
* **Deserialization:** Converting incoming JSON data from API requests into Python objects.
* **Validation:** Ensuring that the incoming data conforms to the expected structure and data types.

Currently, it defines two schemas:
* `ClarifyRequestSchema`: Defines the expected structure for the POST request to the `api/clarify` endpoint, which includes a required `topic` field of type string.
* `ClarifyResponseSchema`: Defines the structure of the JSON response sent back by the JSON response sent back by the `api/clarify` endpoint, which includes a required `explanation` field of type string.

**TODO: `backend/app/logic/explanation_generator.py` | `backend/app/logic/main_extractor.py` | `backend/app/logic/term_extractor.py`**

# Integrating with react.js

**To run the Flask server:**
- Install python, go to `https://www.python.org/downloads` and find the version that suits your PC Architecture/OS
**Make sure to check the `Add to PATH` box**
- Clone this repo (hopefully you have git installed already if not get it here: `https://git-scm.com/downloads`)
* for macOS, use `brew install git` or `sudo port install git`
- navigate to root directory: `../clarify`
- Create a venv by running the following commands in your terminal: 
    `python3 -m venv .venv`
    `.venv\Scripts\activate`
- run `pip install -r requirements.txt`
- run `python -m backend.app.main`

**The API endpoint is `/api/clarify`, the backend server's address is `127.0.0.1` (testing only)**
- Create a function to send the request: Create a component where the user enters the topic, createa an async function to make the API call.
- Construct the request body: The API expects a POST request with a JSON body containing the topic, e.g `{"topic": "Quantum Physics"}.
- use `axios.post()` or `fetch()`
- Call the function on User Interaction: Trigger the function when the user clicks the `go` button, or performs any similar action that indicates they want to clarify a topic.
- Handle the API respopnse
- Consider loading states
- Error display.

# Clarity
**React application for clarify**

``` npm run dev``` on local to interact with the UI


