import os

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace export const XYZ = ... with window.XYZ = ...
    content = content.replace("export const ", "window.")
    content = content.replace("export default ", "// ")
    
    # Replace export function ABC with function ABC
    content = content.replace("export function ", "function ")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

files_to_fix = [
    r"C:\codigos\bfa-main\plataforma\src\data\contentData.js",
    r"C:\codigos\bfa-main\plataforma\src\data\financasData.js",
    r"C:\codigos\bfa-main\plataforma\src\data\matematicaData.js",
    r"C:\codigos\bfa-main\plataforma\src\data\noticiasData.js",
    r"C:\codigos\bfa-main\plataforma\src\data\brhsicData.js",
    r"C:\codigos\bfa-main\plataforma\src\data\sobreData.js",
    r"C:\codigos\bfa-main\plataforma\src\utils\helpers.js"
]

for fp in files_to_fix:
    if os.path.exists(fp):
        fix_file(fp)
        print(f"Fixed exports in {os.path.basename(fp)}")

print("Export cleanup completed!")
