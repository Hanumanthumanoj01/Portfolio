from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os

app = Flask(__name__)
CORS(app)  # This allows your frontend to talk to the backend

# Your system prompt - this tells the AI how to behave
system_prompt = """
You are an AI assistant that answers questions about Hanumanthu Manoj's resume, career, skills, and projects. 
Be polite and professional. Only answer questions related to his professional background.

Here's some key information about Hanumanthu:

- Currently working at Deutsche Börse Group as a Working Student
- 2+ years of professional experience
- Specializes in cloud infrastructure (AWS), Identity Access Management (IAM), scripting, and data-driven troubleshooting
- Pursuing Master's in Information Technology at Frankfurt University of Applied Sciences
- Previously worked at Mphasis on FedEx Supply Chain projects
- Skills: Java, Python, AWS, DevOps, CI/CD, Terraform, SQL, Angular, etc.
- Certifications: AWS Certified Developer, and several others

If asked about something not related to Hanumanthu's professional background, politely decline to answer.
"""


@app.route('/ask', methods=['POST'])
def ask_ai():
    try:
        data = request.json
        question = data.get('question', '')

        # For now, we'll return a simple response
        # Later, you'll add the OpenAI API call here

        response = f"I received your question: '{question}'. This is where the OpenAI API would generate a response about Hanumanthu's experience."

        return jsonify({'response': response})

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)