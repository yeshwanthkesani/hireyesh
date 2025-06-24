import os
from fastapi import Request, HTTPException
from firebase_admin import credentials, auth, initialize_app
from dotenv import load_dotenv

load_dotenv(".env.backend")
cred = credentials.Certificate(os.getenv("FIREBASE_CREDENTIALS_PATH"))
initialize_app(cred)

def verify_firebase_token(request: Request):
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        raise HTTPException(status_code=401, detail="Authorization header missing")
    token =  auth_header.replace("Bearer ", "")
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token['uid']
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")