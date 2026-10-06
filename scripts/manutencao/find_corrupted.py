import os

target = '\ufffd'
for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.jsx') or file.endswith('.js'):
            filepath = os.path.join(root, file)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                    if target in content:
                        print(f"FOUND IN: {filepath}")
            except Exception as e:
                pass
