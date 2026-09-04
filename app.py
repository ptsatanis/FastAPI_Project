
import joblib
import pandas as pd

from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from pathlib import Path
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel


# ============================================================
# APP
# ============================================================

app = FastAPI()


app.mount("/static", StaticFiles(directory="."), name="static")


# ============================================================
# LOAD MODEL
# ============================================================

pipeline = joblib.load("xgb_depression_pipeline.joblib")



# ============================================================
# QUESTIONNAIRE FEATURES
# ============================================================

QUESTION_FEATURES = [
    "ENVSAT",
    "POSSAT",
    "FINSTR",
    "DEBT",
    "EATDIS",
    "INSOM",
    "ANXI",
    "DEPRI",
    "ABUSED",
    "CHEAT",
    "THREAT",
    "SUICIDE",
    "INFER",
    "CONFLICT",
    "LOST"
]


# ============================================================
# REQUEST MODEL
# ============================================================

class PredictionRequest(BaseModel):

    ENVSAT: str
    POSSAT: str
    FINSTR: str
    DEBT: str
    EATDIS: str
    INSOM: str
    ANXI: str
    DEPRI: str
    ABUSED: str
    CHEAT: str
    THREAT: str
    SUICIDE: str
    INFER: str
    CONFLICT: str
    LOST: str


# ============================================================
# FRONTEND
# ============================================================

@app.get("/", response_class=HTMLResponse)
def home():

    html_file = Path("index.html")

    if not html_file.exists():

        return """
        <h1>Error</h1>
        <p>index.html was not found.</p>
        """

    return html_file.read_text(
        encoding="utf-8"
    )


# ============================================================
# PREDICTION
# ============================================================

@app.post("/predict")
def predict(data: PredictionRequest):

    try:
        # ----------------------------------------------------
        # 1. Receive answers
        # ----------------------------------------------------

        answers = data.model_dump()

        print("\n==============================")
        print("ANSWERS RECEIVED")
        print("==============================")
        print(answers)


        # ----------------------------------------------------
        # 2. Convert Yes / No to 1 / 0
        # ----------------------------------------------------

        encoded_answers = {
            column: 1 if answers[column] == "Yes" else 0
            for column in QUESTION_FEATURES
        }

        print("\nENCODED ANSWERS:")
        print(encoded_answers)


        # ----------------------------------------------------
        # 3. Create DataFrame
        # ----------------------------------------------------

        input_df = pd.DataFrame([encoded_answers])


        # ----------------------------------------------------
        # 4. Correct feature order
        # ----------------------------------------------------

        input_df = input_df[QUESTION_FEATURES]


        print("\nDATA SENT TO PIPELINE:")
        print(input_df)


        # ----------------------------------------------------
        # 5. Prediction
        # ----------------------------------------------------

        prediction = pipeline.predict(input_df)[0]

        print("\nRAW PREDICTION:")
        print(prediction)


        # ----------------------------------------------------
        # 6. Probability
        # ----------------------------------------------------

        probabilities = pipeline.predict_proba(input_df)[0]

        print("\nRAW PROBABILITIES:")
        print(probabilities)


        probability = float(probabilities[1])


        # ----------------------------------------------------
        # 7. Return result
        # ----------------------------------------------------

        response = {
            "prediction": int(prediction),
            "probability": probability
        }


        print("\nFINAL RESPONSE:")
        print(response)

        print("==============================\n")


        return response


    except Exception as e:

        print("\n==============================")
        print("MODEL ERROR")
        print("==============================")
        print(repr(e))
        print("==============================\n")

        from fastapi import HTTPException

        raise HTTPException(status_code=500,detail=str(e))
