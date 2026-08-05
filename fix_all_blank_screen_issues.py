import os
import re

base_dir = r"C:\codigos\bfa-main\plataforma\src"

# 1. Fix contentData.js
content_data_path = os.path.join(base_dir, "data", "contentData.js")
if os.path.exists(content_data_path):
    with open(content_data_path, "r", encoding="utf-8") as f:
        txt = f.read()
    txt = txt.replace("export const EXACT_CONTENT =", "window.EXACT_CONTENT =")
    with open(content_data_path, "w", encoding="utf-8") as f:
        f.write(txt)
    print("Fixed contentData.js")

# 2. Fix helpers.js
helpers_path = os.path.join(base_dir, "utils", "helpers.js")
if os.path.exists(helpers_path):
    with open(helpers_path, "r", encoding="utf-8") as f:
        txt = f.read()
    txt = txt.replace("export function slugify", "function slugify")
    txt = txt.replace("export function formatTime", "function formatTime")
    txt = txt.replace("export function generateSchedule", "function generateSchedule")
    txt += "\nwindow.slugify = slugify;\nwindow.formatTime = formatTime;\nwindow.generateSchedule = generateSchedule;\n"
    with open(helpers_path, "w", encoding="utf-8") as f:
        f.write(txt)
    print("Fixed helpers.js")

# 3. Fix main.jsx
main_path = os.path.join(base_dir, "main.jsx")
if os.path.exists(main_path):
    with open(main_path, "r", encoding="utf-8") as f:
        lines = f.readlines()
    filtered = [l for l in lines if not ("window.generateSchedule =" in l or "window.formatTime =" in l or "window.slugify =" in l)]
    with open(main_path, "w", encoding="utf-8") as f:
        f.writelines(filtered)
    print("Fixed main.jsx")

# 4. Add React hooks destructuring at the top of all component and page files
react_hooks_header = "const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;\n"

component_files = [
    os.path.join(base_dir, "components", "NavbarFooter.jsx"),
    os.path.join(base_dir, "components", "LessonContent.jsx"),
    os.path.join(base_dir, "components", "VideoAndForum.jsx"),
    os.path.join(base_dir, "components", "QuizEngine.jsx"),
    os.path.join(base_dir, "pages", "Home.jsx"),
    os.path.join(base_dir, "pages", "DisciplinaOverview.jsx"),
    os.path.join(base_dir, "pages", "AulaPage.jsx"),
    os.path.join(base_dir, "pages", "ExtraPages.jsx"),
    os.path.join(base_dir, "pages", "AdminPages.jsx"),
]

for cf in component_files:
    if os.path.exists(cf):
        with open(cf, "r", encoding="utf-8") as f:
            content = f.read()
        if "const { useState" not in content and "const {useState" not in content:
            content = react_hooks_header + content
            with open(cf, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"Added React hooks header to {os.path.basename(cf)}")

print("All fixes applied successfully!")
