# from sqlalchemy import create_engine
# import os
# from dotenv import load_dotenv

# load_dotenv(".env.backend")  # Load environment variables

# DATABASE_URL = os.getenv("DATABASE_URL")

# if not DATABASE_URL:
#     raise ValueError("❌ DATABASE_URL is missing or incorrect")

# try:
#     engine = create_engine(DATABASE_URL)
#     with engine.connect() as connection:
#         print("✅ Connected to PostgreSQL successfully!")
# except Exception as e:
#     print(f"❌ Connection failed: {e}")


import os
print(os.path.exists("./firebase_admin.json"))