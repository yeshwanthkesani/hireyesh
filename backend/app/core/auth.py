import os
from fastapi import Request, HTTPException
from firebase_admin import credentials, auth, initialize_app
from dotenv import load_dotenv
from typing import Annotated

load_dotenv(".env.backend")
cred = credentials.Certificate(os.getenv("FIREBASE_CREDENTIALS_PATH"))
initialize_app(cred)

def verify_firebase_token(request: Request) -> str:
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer"):
        raise HTTPException(status_code=401, detail="Authorization header missing")
    token =  auth_header.replace("Bearer ")[1].strip()
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token['uid']
    except Exception as e:
        print("Token Verification failed: ", e)
        raise HTTPException(status_code=401, detail="Invalid or expired token")