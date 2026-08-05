import os
import time
import subprocess

FILE_TO_WATCH = os.path.join('plataforma', 'src', 'data', 'overrides.json')
POLL_INTERVAL = 3 # seconds

def get_mtime(filepath):
    try:
        return os.path.getmtime(filepath)
    except FileNotFoundError:
        return None

def main():
    print(f"Starting auto-sync watcher for {FILE_TO_WATCH}...")
    # Ensure the directory exists
    os.makedirs(os.path.dirname(FILE_TO_WATCH), exist_ok=True)
    
    # Create the file if it doesn't exist
    if not os.path.exists(FILE_TO_WATCH):
        with open(FILE_TO_WATCH, 'w') as f:
            f.write("{}")
    
    last_mtime = get_mtime(FILE_TO_WATCH)
    
    while True:
        time.sleep(POLL_INTERVAL)
        current_mtime = get_mtime(FILE_TO_WATCH)
        
        if current_mtime != last_mtime:
            print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] Change detected in {FILE_TO_WATCH}. Syncing to GitHub...")
            try:
                subprocess.run(['git', 'add', FILE_TO_WATCH], check=True)
                status = subprocess.run(['git', 'status', '--porcelain', FILE_TO_WATCH], capture_output=True, text=True)
                if status.stdout.strip():
                    subprocess.run(['git', 'commit', '-m', 'chore: auto-sync overrides.json from CMS'], check=True)
                    subprocess.run(['git', 'push', 'origin', 'main'], check=True)
                    print("Successfully pushed to GitHub.")
                else:
                    print("No changes needed to be committed.")
            except subprocess.CalledProcessError as e:
                print(f"Error during sync: {e}")
            
            last_mtime = current_mtime

if __name__ == '__main__':
    main()
