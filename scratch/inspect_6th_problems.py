import json
import re

with open('scratch/extracted_mod3_mod4_raw.json', 'r', encoding='utf-8') as f:
    raw_data = json.load(f)

for slug, text in raw_data.items():
    print(f"================== {slug} ==================")
    print(text)
    print("\n")
