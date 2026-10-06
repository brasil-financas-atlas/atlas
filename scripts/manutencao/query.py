import os
import requests
import json

url = 'https://wvcjjwvauibsculmqhxi.supabase.co/rest/v1/profiles?select=*'
headers = {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2Y2pqd3ZhdWlic2N1bG1xaHhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyMTUyMjQsImV4cCI6MjEwMTc5MTIyNH0.xz3GQidAn0T2_SkkvygmOvsHW9em_YgMHpfukXTmCHw',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2Y2pqd3ZhdWlic2N1bG1xaHhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyMTUyMjQsImV4cCI6MjEwMTc5MTIyNH0.xz3GQidAn0T2_SkkvygmOvsHW9em_YgMHpfukXTmCHw'
}

response = requests.get(url, headers=headers)
print("PROFILES:", response.text)

url_admin = 'https://wvcjjwvauibsculmqhxi.supabase.co/rest/v1/admin_roles?select=*'
response_admin = requests.get(url_admin, headers=headers)
print("ADMIN ROLES:", response_admin.text)
