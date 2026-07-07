import os
import joblib
import numpy as np
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

MODEL_PATH = os.path.join(os.path.dirname(__file__), "career_cert_recommender_v2.pkl")
bundle        = joblib.load(MODEL_PATH)
model         = bundle["model"]
label_encoder = bundle["label_encoder"]
feature_names = bundle["feature_names"]

SKILL_COLUMNS = [
    "Database Fundamentals", "Computer Architecture", "Distributed Computing Systems",
    "Cyber Security", "Networking", "Software Development", "Programming Skills",
    "Project Management", "Computer Forensics Fundamentals", "Technical Communication",
    "AI ML", "Software Engineering", "Business Analysis", "Communication skills",
    "Data Science", "Troubleshooting skills", "Graphics Designing",
]

BASELINE = 4


def build_feature_vector(skill_features):
    row = {}
    for skill in SKILL_COLUMNS:
        row[skill] = BASELINE
    for skill, score in skill_features.items():
        if skill in SKILL_COLUMNS:
            row[skill] = int(score)
    df_row = pd.DataFrame([row])[feature_names]
    print("\n[PREDICT] Skills received: " + str(skill_features))
    return df_row


@app.route("/", methods=["GET"])
def health_check():
    return jsonify({
        "status": "ok",
        "message": "CareerMap API v2 - skills only model - 100% confidence",
        "model_classes": label_encoder.classes_.tolist(),
    })


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json(force=True)
    except Exception:
        return jsonify({"error": "Invalid JSON."}), 400

    if not data:
        return jsonify({"error": "Empty body."}), 400

    skill_features = data.get("skillFeatures", {})

    if not skill_features:
        return jsonify({"error": "No skills provided."}), 400

    df_row   = build_feature_vector(skill_features)
    probs    = model.predict_proba(df_row)[0]
    top3_idx = np.argsort(probs)[::-1][:3]
    pred_role = label_encoder.classes_[top3_idx[0]]

    top3 = [
        {
            "role": label_encoder.classes_[i],
            "confidence": round(float(probs[i]), 4),
        }
        for i in top3_idx
    ]

    print("[PREDICT] -> Role: " + pred_role + " (" + str(round(probs[top3_idx[0]] * 100, 1)) + "%)")

    return jsonify({"recommended_role": pred_role, "top_3": top3})


@app.route("/skills", methods=["GET"])
def get_skills():
    return jsonify({"skills": SKILL_COLUMNS})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
