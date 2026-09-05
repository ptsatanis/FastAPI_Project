# FastAPI_Project

Depression Prediction — Full-Stack Machine Learning Application

A full-stack machine learning application that uses an XGBoost classification model to generate a depression-related prediction from a 15-question Yes/No questionnaire.

The project combines a machine learning training pipeline with a FastAPI backend and a lightweight HTML/CSS/JavaScript frontend.

    Important: This project is for educational and informational purposes only. The model is not a medical diagnostic tool and its predictions should not be interpreted as a clinical diagnosis or medical advice.


# Project Overview

The application asks the user 15 questions related to different environmental, financial, behavioral, and psychological factors.

The answers are submitted to a FastAPI API, converted into numerical values, and passed through the trained machine learning pipeline.

The pipeline consists of:

Input Data

    ↓
SelectKBest Feature Selection

    ↓
SMOTE Class Balancing

    ↓
XGBoost Classifier

    ↓
Prediction + Probability



# Application Architecture

Input Data

    ↓
SelectKBest Feature Selection

    ↓
SMOTE Class Balancing

    ↓
XGBoost Classifier

    ↓
Prediction + Probability




# Feature descriptions
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

THREAT	Experience of a threatening situation

SUICIDE	Suicidal ideation

INFER	Feelings of inferiority

CONFLICT  Conflict with friends or family

LOST	Loss of a family member or close friend





# Important Limitations

This project has several important limitations.
Dataset limitations

The model's performance depends heavily on the dataset used for training. Results obtained from one dataset and one train/test split may not generalize to other populations or real-world clinical settings.
Model limitations

XGBoost predictions are statistical model outputs. A probability returned by the classifier should not be interpreted as a medically validated probability of having depression.
Evaluation limitations

The reported metrics come from a single 80/20 train/test split. More robust evaluation could include:

    Stratified cross-validation
    Repeated cross-validation
    External validation
    Calibration analysis
    Evaluation on an independent dataset

Clinical limitations

The questionnaire and model have not been presented here as a substitute for professional mental-health assessment.
