from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from routers import router

app = FastAPI()

static_dir = Path(__file__).resolve().parent / "static"

if not static_dir.exists():
    raise RuntimeError(f"Directory '{static_dir}' does not exist")

app.mount("/static", StaticFiles(directory=static_dir), name="static")

origins = [
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

