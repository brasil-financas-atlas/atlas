import re

with open('src/pages/DisciplinaOverview.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace <main ...> with the centered wrapper inside
target = r"""<main style={{ flex: 1, minWidth: 0, padding: '3rem 4rem', backgroundColor: 'var(--bg-app)', height: '100vh', overflowY: 'auto' }}>"""
replacement = r"""<main style={{ flex: 1, minWidth: 0, padding: '3rem 4rem', backgroundColor: 'var(--bg-app)', height: '100vh', overflowY: 'auto' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>"""

content = content.replace(target, replacement)

# We need to close the div at the end of ModuloIntroPage
# The ModuloIntroPage ends like this:
#             </div>
#           </div>
#         </main>
#       </div>
#     );
#   }

content = content.replace("</main>\n      </div>\n    );\n  }", "</div>\n        </main>\n      </div>\n    );\n  }")

# Also replace maxWidth: '800px' on article so it can fill the centered container nicely
content = content.replace("<article style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--text-primary)', maxWidth: '800px' }}>",
                          "<article style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--text-primary)' }}>")

# Also on the card <p>
content = content.replace("<p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6, maxWidth: '800px' }}>",
                          "<p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>")


with open('src/pages/DisciplinaOverview.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
