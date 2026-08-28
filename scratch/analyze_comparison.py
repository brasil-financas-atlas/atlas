import json

with open('scratch/deep_comparison_report.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

unmatched = [p for p in data['lessons_comparison'] if not p['matched']]
matched = [p for p in data['lessons_comparison'] if p['matched']]

print(f"Total Pages Checked: {len(data['lessons_comparison'])}")
print(f"Matched Pages: {len(matched)}")
print(f"Unmatched Pages: {len(unmatched)}")

if unmatched:
    print("\nUnmatched Pages:")
    for u in unmatched:
        print("  -", u['path'])

print("\nSample Matched Lengths (GH Pages HTML text vs Local Markdown):")
for m in matched[:10]:
    print(f"  {m['path']}: GH={m['gh_pages_length']} chars, Local={m['local_length']} chars")
