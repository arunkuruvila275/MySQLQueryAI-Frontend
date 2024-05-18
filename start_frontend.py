import subprocess

def main():
    subprocess.run(["npm", "install"])
    subprocess.run(["npm", "start"])

if __name__ == "__main__":
    main()