import re

with open('src/pages/AulaPage.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Wrap main content in a centered div
target_main = r"""      <main style=\{\{ flex: 1, minWidth: 0, padding: '3rem 4rem', backgroundColor: 'var\(--bg-app\)', height: '100vh', overflowY: 'auto' \}\}>"""
replacement_main = r"""      <main style={{ flex: 1, minWidth: 0, padding: '3rem 4rem', backgroundColor: 'var(--bg-app)', height: '100vh', overflowY: 'auto' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>"""

content = re.sub(target_main, replacement_main, content)

# Remove the inner maxWidth from article to let it inherit naturally
content = content.replace(
    """<article className="bfa-lesson-article" style={{ maxWidth: '860px', margin: '0 auto' }}>""",
    """<article className="bfa-lesson-article">"""
)

# And add the closing div at the end of the main tag
# The end of main tag is:
#         </div>
#       </main>
#
#       {/* Floating In-Context Admin Quick Edit Toggle */}

content = re.sub(r'        </div>\n      </main>', r'        </div>\n        </div>\n      </main>', content)

with open('src/pages/AulaPage.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
