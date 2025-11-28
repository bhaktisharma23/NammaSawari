from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# Dummy buses data (used for delay prediction)
buses = [
    {"id": 1, "route": "Koramangala → Majestic", "time": "10:00", "delay": 5},
    {"id": 2, "route": "Whitefield → MG Road", "time": "10:15", "delay": 0}
]

# Path of data.json
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, "data.json")

@app.route('/')
def home():
    return jsonify({"message": "SmartCommute API running"})

# ✅ Get buses
@app.route('/buses')
def get_buses():
    try:
        with open(DATA_FILE, 'r') as f:
            data = json.load(f)
        return jsonify(data.get("buses", []))
    except FileNotFoundError:
        return jsonify({"error": "data.json not found"}), 404

# ✅ Get stops
@app.route('/stops')
def get_stops():
    try:
        with open(DATA_FILE, 'r') as f:
            data = json.load(f)
        return jsonify(data.get("stops", []))
    except FileNotFoundError:
        return jsonify({"error": "data.json not found"}), 404

# ✅ Delay prediction
@app.route('/delay-prediction')
def delay_prediction():
    predictions = []
    for bus in buses:
        expected_delay = bus["delay"] + 3
        predictions.append({
            "route": bus["route"],
            "expected_delay": expected_delay
        })
    return jsonify(predictions)

# ✅ Feedback API
@app.route('/feedback', methods=['POST'])
def feedback():
    data = request.json
    return jsonify({"status": "Feedback received", "data": data})

# ✅ Connection test
@app.route('/test')
def test():
    return jsonify({"message": "Backend connected successfully!"})

if __name__ == "__main__":
    app.run(debug=True)
