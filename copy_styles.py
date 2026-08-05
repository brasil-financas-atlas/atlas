import os
import shutil

src_dir = r"C:\Users\User\.gemini\antigravity-cli\brain\64e5ca67-2604-4a9e-8ec2-4a7e246407d5"
styles_dir = r"C:\codigos\bfa-main\plataforma\src\styles"
assets_dir = r"C:\codigos\bfa-main\plataforma\src\assets"

os.makedirs(styles_dir, exist_ok=True)
os.makedirs(assets_dir, exist_ok=True)

css_files = ["globals.css", "typography.css", "components.css", "animations.css", "admin.css"]

for css in css_files:
    sf = os.path.join(src_dir, css)
    df = os.path.join(styles_dir, css)
    if os.path.exists(sf):
        shutil.copy(sf, df)
        print(f"Copied {css} -> {df}")

svg_sf = os.path.join(src_dir, "favicon.svg")
svg_df = os.path.join(assets_dir, "favicon.svg")
if os.path.exists(svg_sf):
    shutil.copy(svg_sf, svg_df)
    print("Copied favicon.svg")

print("All styles & assets copied successfully!")
