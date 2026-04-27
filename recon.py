import webbrowser
import urllib.parse

def start_recon():
    print("--- JULEKPY RECON ENGINE ---")
    query = 'filetype:env "DB_PASSWORD"'
    url = "https://www.google.com/search?q=" + urllib.parse.quote(query)
    print(f"Szukanie haseł w Google...")
    webbrowser.open(url)

if __name__ == "__main__":
    start_recon()
