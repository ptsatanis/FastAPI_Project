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

🖥️ Application Overview

The application allows a user to answer a series of 15 questions. Once the questionnaire is completed, the answers are sent to the FastAPI backend, processed, and passed through the trained machine learning pipeline.

┌──────────────────────────────┐
│          USER                │
│      Answers Questions       │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│          FRONTEND            │
│       HTML / CSS / JS        │
└──────────────┬───────────────┘
               │
               │ POST /predict
               ▼
┌──────────────────────────────┐
│          FASTAPI             │
│           Backend            │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│      INPUT PROCESSING        │
│       Yes → 1 / No → 0       │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│      MACHINE LEARNING        │
│                              │
│       SelectKBest            │
│            ↓                 │
│           SMOTE              │
│            ↓                 │
│       XGBoost Classifier     │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│     PREDICTION + PROBABILITY │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       RESULT DISPLAY         │
└──────────────────────────────┘

🧠 Machine Learning Pipeline

The final model is implemented as a pipeline containing three main stages:

Input Features
      │
      ▼
┌───────────────────┐
│    SelectKBest    │
│   Feature Select. │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│       SMOTE       │
│ Class Balancing   │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│      XGBoost      │
│    Classifier     │
└─────────┬─────────┘
          │
          ▼
     Prediction

The complete trained pipeline is saved as:

xgb_depression_pipeline.joblib

This allows the exact preprocessing and classification pipeline to be loaded by the FastAPI backend.
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

