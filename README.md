🧠 Depression Prediction — Full-Stack ML Application

A full-stack machine learning web application that uses an XGBoost classifier to generate a depression-related prediction from a 15-question questionnaire.

The project combines machine learning, FastAPI, JavaScript, HTML, and CSS into a complete end-to-end application.

    ⚠️ Disclaimer: This project is for educational and informational purposes only. It is not a medical diagnostic tool and should not be used as a substitute for professional medical advice, evaluation, or treatment.

✨ Features

    📝 15-question interactive questionnaire
    ✅ Simple Yes / No interface
    📊 Real-time progress indicator
    🤖 XGBoost machine learning classifier
    🎯 SelectKBest feature selection
    ⚖️ SMOTE class balancing
    📈 Prediction probability
    🔬 Model evaluation with multiple metrics
    🚀 FastAPI REST API
    💻 HTML, CSS & JavaScript frontend
    🔄 Restart questionnaire functionality
    📦 Serialized model pipeline using Joblib

🖥️ Application Architecture

The application follows a simple client-server architecture. Users interact with the questionnaire through the frontend, while the FastAPI backend handles preprocessing and model inference.

POST /predict👤 User🌐 Web Interface⚡ FastAPI🔢 Encode Answers🤖 ML Pipeline📊 Prediction
Request Flow
The user answers the 15 questionnaire questions.
The JavaScript frontend collects the responses.
The responses are sent to the /predict endpoint.
FastAPI converts Yes/No answers into numerical values.
The processed data is passed to the trained machine learning pipeline.
The model returns a prediction and probability.
The result is displayed on the frontend.
🧠 Machine Learning Pipeline

The trained model is packaged as a single pipeline containing feature selection, class balancing, and XGBoost classification.

flowchart TD
    A[📥 Questionnaire Features] --> B[🎯 SelectKBest]
    B --> C[⚖️ SMOTE]
    C --> D[🌳 XGBoost Classifier]
    D --> E[📊 Prediction + Probability]

    B:::blue
    C:::orange
    D:::green
    E:::purple

    classDef blue fill:#dbeafe,stroke:#2563eb,color:#1e3a8a
    classDef orange fill:#ffedd5,stroke:#ea580c,color:#9a3412
    classDef green fill:#dcfce7,stroke:#16a34a,color:#166534
    classDef purple fill:#f3e8ff,stroke:#9333ea,color:#6b21a8

Pipeline Components
Stage	Purpose
SelectKBest	Selects the most relevant features using the ANOVA F-test
SMOTE	Balances the training classes using synthetic oversampling
XGBoost	Performs the final binary classification
Prediction	Returns the predicted class and probability

The complete pipeline is serialized with Joblib:

xgb_depression_pipeline.joblib


This allows the same preprocessing and model steps used during training to be loaded directly by the FastAPI backend.
📋 Questionnaire Features

The model uses the following 15 features:
Feature	Description
ENVSAT	Satisfaction with living conditions
POSSAT	Satisfaction with working conditions
FINSTR	Financial struggles
DEBT	Debt
EATDIS	Eating disorder
INSOM	Insomnia
ANXI	Anxiety
DEPRI	Feelings of deprivation
ABUSED	Experience of abuse
CHEAT	Being cheated on
THREAT	Threatening situation
SUICIDE	Suicidal ideation
INFER	Feelings of inferiority
CONFLICT	Conflict with friends or family
LOST	Loss of a family member or close friend

The web application accepts:

Yes → 1
No  → 0

🤖 XGBoost Configuration

The classifier was configured with:

XGBClassifier(
    random_state=42,
    eval_metric="logloss",
    n_estimators=200,
    max_depth=4,
    learning_rate=0.05,
    subsample=0.8,
    colsample_bytree=0.8
)

Parameter	Value
Algorithm	XGBoost
Estimators	200
Max Depth	4
Learning Rate	0.05
Subsample	0.8
Column Subsample	0.8
Evaluation Metric	Log Loss
Random State	42
⚙️ Data Processing
Feature Selection

The model uses:

SelectKBest(
    score_func=f_classif,
    k=15
)

The ANOVA F-test is used to select features based on their relationship with the target variable.

In the final implementation, all 15 questionnaire features were retained.
Class Balancing

The training pipeline uses SMOTE to address class imbalance:

SMOTE(random_state=42)

SMOTE is applied during training rather than to the held-out test data.
Train/Test Split

The dataset was split using:

train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

This resulted in:

    80% training data
    20% testing data
    121 test samples
    Random state: 42

📊 Model Performance

The model was evaluated on the held-out test set.
Results
Metric	Score
🎯 Accuracy	88.43%
🔍 Precision	97.01%
📈 Recall / Sensitivity	84.42%
🛡️ Specificity	95.45%
⭐ F1-Score	90.28%
Confusion Matrix
	Predicted Negative	Predicted Positive
Actual Negative	42	2
Actual Positive	12	65

True Negatives  : 42
False Positives : 2
False Negatives : 12
True Positives  : 65

Classification Report

              precision    recall  f1-score   support

           0       0.78      0.95      0.86        44
           1       0.97      0.84      0.90        77

    accuracy                           0.88       121
   macro avg       0.87      0.90      0.88       121
weighted avg       0.90      0.88      0.89       121

    These results come from a single held-out test split and should not be interpreted as evidence of clinical effectiveness or generalization to other populations.

🔌 API

The FastAPI backend exposes two main endpoints.
GET /

Loads the questionnaire frontend.
POST /predict

Receives questionnaire responses and returns the model prediction.
Example Request

{
  "ENVSAT": "Yes",
  "POSSAT": "No",
  "FINSTR": "Yes",
  "DEBT": "No",
  "EATDIS": "No",
  "INSOM": "Yes",
  "ANXI": "Yes",
  "DEPRI": "No",
  "ABUSED": "No",
  "CHEAT": "No",
  "THREAT": "No",
  "SUICIDE": "No",
  "INFER": "Yes",
  "CONFLICT": "No",
  "LOST": "No"
}

Example Response

{
  "prediction": 1,
  "probability": 0.82
}

The frontend converts the prediction into:

0 → Negative
1 → Positive

The probability is displayed as a percentage.
🗂️ Project Structure

depression-prediction/
│
├── 📄 main.py
├── 🌐 index.html
├── 🎨 style.css
├── ⚡ script.js
│
├── 🤖 xgb_depression_pipeline.joblib
├── 📊 Depression Dataset.csv
├── 📓 model_training.ipynb
│
└── 📖 README.md

