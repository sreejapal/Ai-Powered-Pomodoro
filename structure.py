import os

folders = {
    "backend": ["models", "routes", "utils"],
    "frontend": ["src/components", "src/pages", "public"]
}

files = {
    "backend": ["main.py", "database.py"],
    "backend/models": ["session.py"],
    "backend/routes": ["session_routes.py"],
    "backend/utils": ["helpers.py"],
    "frontend": ["tailwind.config.js"],
    "frontend/src": ["App.jsx", "index.js"],
    "frontend/src/components": ["Timer.jsx", "TodoList.jsx"],
    "": ["README.md", ".gitignore"]
}

# Create folders
for base, subs in folders.items():
    for subfolder in subs:
        path = os.path.join(base, subfolder)
        os.makedirs(path, exist_ok=True)

# Create files if they don't already exist
for folder, file_list in files.items():
    for filename in file_list:
        file_path = os.path.join(folder, filename)
        if not os.path.exists(file_path):
            with open(file_path, "w") as f:
                f.write("")  # Empty file for now

print("✅ Structure created successfully (no overwrite if exists).")
