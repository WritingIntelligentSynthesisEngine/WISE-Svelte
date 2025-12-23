cd "../../backend/"
.\.venv\Scripts\python.exe .\scripts\scripts.py exportopenapi
cd "../frontend/"
start cmd /k pnpm run api
