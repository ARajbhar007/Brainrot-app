from flask import Flask, render_template, request, jsonify
import json
import random

app = Flask(__name__)

# Load all questions
with open("questions.json") as f:
    QUESTIONS_DB = json.load(f)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/get_questions", methods=["POST"])
def get_questions():
    data = request.get_json()
    category = data["category"]
    level = data["level"]

    all_qs = QUESTIONS_DB.get(category, {}).get(level, [])
    selected = random.sample(all_qs, min(20, len(all_qs)))

    return jsonify(selected)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
