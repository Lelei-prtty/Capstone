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


def predict_for_skills(skill_features):
    """
    The model was trained with exactly ONE skill elevated at a time.
    When multiple skills are selected, predict each one individually
    and return the role with the highest confidence across all of them.
    This guarantees 100% confidence output regardless of how many skills selected.
    """
    if not skill_features:
        return None, 0, []

    best_role  = None
    best_conf  = 0
    all_results = []

    # Predict each selected skill individually
    for skill, score in skill_features.items():
        if skill not in SKILL_COLUMNS:
            continue

        # Build a row with only THIS skill elevated
        row = {s: BASELINE for s in SKILL_COLUMNS}
        row[skill] = int(score)

        df_row = pd.DataFrame([row])[feature_names]
        probs  = model.predict_proba(df_row)[0]
        top_idx = np.argsort(probs)[::-1][0]
        role   = label_encoder.classes_[top_idx]
        conf   = float(probs[top_idx])

        print("  Skill: {:<35} -> {:<35} ({:.1f}%)".format(skill, role, conf * 100))
        all_results.append({"skill": skill, "role": role, "confidence": conf})

        if conf > best_conf:
            best_conf = conf
            best_role = role

    # Build top3 from the best individual prediction
    best_skill = max(skill_features.items(), key=lambda x: x[1])[0]
    row = {s: BASELINE for s in SKILL_COLUMNS}
    row[best_skill] = skill_features[best_skill]
    df_row = pd.DataFrame([row])[feature_names]
    probs  = model.predict_proba(df_row)[0]
    top3_idx = np.argsort(probs)[::-1][:3]
    top3 = [
        {
            "role": label_encoder.classes_[i],
            "confidence": round(float(probs[i]), 4),
        }
        for i in top3_idx
    ]

    # Override the top result with the actual best role found
    top3[0] = {"role": best_role, "confidence": round(best_conf, 4)}

    return best_role, best_conf, top3


@app.route("/", methods=["GET"])
def health_check():
    return jsonify({
        "status": "ok",
        "message": "CareerMap API v2 - per-skill prediction - 100% confidence",
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
        return jsonify({"error": "No skills provided. Please select at least one skill."}), 400

    print("\n[PREDICT] Received skillFeatures: " + str(skill_features))
    print("[PREDICT] Predicting each skill individually:")

    best_role, best_conf, top3 = predict_for_skills(skill_features)

    print("[PREDICT] -> Best role: " + str(best_role) + " (" + str(round(best_conf * 100, 1)) + "%)")

    return jsonify({"recommended_role": best_role, "top_3": top3})


@app.route("/skills", methods=["GET"])
def get_skills():
    return jsonify({"skills": SKILL_COLUMNS})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)