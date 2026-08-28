import subprocess
import json

# List all files on origin/gh-pages
res = subprocess.run(['git', 'ls-tree', '-r', 'origin/gh-pages', '--name-only'], capture_output=True, text=True, encoding='utf-8')
gh_pages_files = res.stdout.splitlines()

html_pages = [f for f in gh_pages_files if f.endswith('.html')]
css_files = [f for f in gh_pages_files if f.endswith('.css')]
js_files = [f for f in gh_pages_files if f.endswith('.js')]
asset_files = [f for f in gh_pages_files if any(f.endswith(ext) for ext in ['.png', '.jpg', '.svg', '.json', '.pdf'])]

print(f"Total files on gh-pages: {len(gh_pages_files)}")
print(f"Total HTML pages: {len(html_pages)}")
print(f"Total CSS files: {len(css_files)}")
print(f"Total JS files: {len(js_files)}")
print(f"Total Asset files: {len(asset_files)}")

with open('scratch/gh_pages_html_list.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(html_pages))

print("\nHTML Pages Summary:")
for p in html_pages:
    print("  -", p)
