import pandas as pd

from sklearn.model_selection import train_test_split

from sklearn.linear_model import LogisticRegression

from sklearn.ensemble import RandomForestClassifier

from sklearn.metrics import accuracy_score

import joblib


# Load Dataset

data = pd.read_csv("dataset.csv")


# Features

X = data[
    [
        'study_hours',
        'attendance',
        'assignment_score',
        'internal_marks'
    ]
]


# Target

y = data['result']


# Split Dataset

X_train, X_test, y_train, y_test = train_test_split(

    X,
    y,

    test_size=0.2,

    random_state=42

)


# =====================================
# Logistic Regression
# =====================================

lr_model = LogisticRegression()

lr_model.fit(X_train, y_train)

lr_prediction = lr_model.predict(X_test)

lr_accuracy = accuracy_score(

    y_test,
    lr_prediction

)


# =====================================
# Random Forest
# =====================================

rf_model = RandomForestClassifier()

rf_model.fit(X_train, y_train)

rf_prediction = rf_model.predict(X_test)

rf_accuracy = accuracy_score(

    y_test,
    rf_prediction

)


# Save Models

joblib.dump(

    lr_model,

    'logistic_model.pkl'

)

joblib.dump(

    rf_model,

    'rf_model.pkl'

)


# Print Accuracy

print("\n==============================")

print(

    f"Logistic Regression Accuracy: {lr_accuracy * 100:.2f}%"

)

print(

    f"Random Forest Accuracy: {rf_accuracy * 100:.2f}%"

)

print("==============================")