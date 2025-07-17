import os

folders = {
    "backend": ["models"],
    "frontend": ["src/components", "src/pages", "public"]
}

files = {
    "backend": ["main.py", "database.py"],
    "backend/models": ["task.py"],
    "frontend": ["tailwind.config.js"],
    "frontend/src": ["App.jsx", "index.js"],
    "": ["README.md", ".gitignore"]
}

# Create folders
for base, subs in folders.items():
    for folder in subs:
        path = os.path.join(base, folder)
        os.makedirs(path, exist_ok=True)

# Create files
for folder, file_list in files.items():
    for file in file_list:
        file_path = os.path.join(folder, file)
        with open(file_path, 'w') as f:
            f.write("")

print("✅ Project structure created successfully!")
