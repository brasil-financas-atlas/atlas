import re
from html.parser import HTMLParser

with open(r'C:\Users\User\.gemini\antigravity-cli\brain\83a27f3b-0f11-40ba-ae31-d92bcf98c536\.system_generated\steps\1547\content.md', 'r', encoding='utf-8', errors='ignore') as f:
    raw = f.read()

# Let's find <article ...> ... </article>
m = re.search(r'<article[^>]*>([\s\S]*?)</article>', raw)
if m:
    article_html = m.group(1)
    # Strip HTML tags
    text = re.sub(r'<[^>]+>', ' ', article_html)
    text = re.sub(r'\s+', ' ', text)
    print("=== ARTICLE TEXT (first 2000 chars) ===")
    print(text[:2000])
    
    # Extract headers
    headers = re.findall(r'<h[1-6][^>]*>([\s\S]*?)</h[1-6]>', article_html)
    print("\n=== HEADERS ===")
    for h in headers:
        clean_h = re.sub(r'<[^>]+>', '', h).strip()
        print("-", clean_h)
else:
    print("No article tag found")
