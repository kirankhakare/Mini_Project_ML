from flask import Flask, request, jsonify

from flask_cors import CORS

import joblib


app = Flask(__name__)

CORS(app)


# Load Models

lr_model = joblib.load('logistic_model.pkl')

rf_model = joblib.load('rf_model.pkl')


@app.route('/predict', methods=['POST'])

def predict():

    data = request.json

    study_hours = float(data['study_hours'])

    attendance = float(data['attendance'])

    assignment_score = float(data['assignment_score'])

    internal_marks = float(data['internal_marks'])


    features = [[

        study_hours,

        attendance,

        assignment_score,

        internal_marks

    ]]


    # Predictions

    logistic_prediction = lr_model.predict(features)[0]

    rf_prediction = rf_model.predict(features)[0]


    # Final Prediction

    final_prediction = rf_prediction


    # Recommendation Logic

    recommendation = ""


    if attendance < 75:

        recommendation += "Improve attendance. "


    if study_hours < 3:

        recommendation += "Increase study hours. "


    if assignment_score < 50:

        recommendation += "Focus on assignments. "


    if recommendation == "":

        recommendation = "Excellent Performance. Keep it up!"


    return jsonify({

        "logistic_prediction": logistic_prediction,

        "random_forest_prediction": rf_prediction,

        "final_prediction": final_prediction,

        "recommendation": recommendation

    })


if __name__ == '__main__':

    app.run(port=5001,debug=True)