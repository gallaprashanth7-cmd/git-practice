# Setup & Git Hands-On Exercise

## 0. Where to open this

1. Unzip `git-practice.zip` somewhere simple, e.g. `C:\Users\PRASHANTH\git-practice`
2. Open that folder in **VS Code** (or your editor of choice)
3. Open a terminal *inside that folder* (VS Code: Terminal > New Terminal, or
   just `cd` there in PowerShell)

You need Git installed (`git --version` to check) and, if you want to actually
run the apps: Java 17+ and Maven for the backend, Node.js for the frontend.
None of that is required just to practice Git commands on the files.

## 1. Turn it into a real repo

The zip does NOT include a `.git` folder on purpose — you're going to create
the history yourself so the commands actually mean something.

```powershell
cd git-practice
git init
git config user.name "Prashanth Galla"
git config user.email "you@example.com"

git add .gitignore
git commit -m "Initial commit: add .gitignore"

git add backend
git commit -m "Add backend: hello endpoint"

git add frontend
git commit -m "Add frontend: fetch hello message"

git log --oneline
```

You should see 3 commits.

## 2. Create a feature branch

```powershell
git checkout -b feature/greeting-v2
```

Open `backend/src/main/java/com/practice/HelloController.java` and change:

```java
return "Hello from backend v1";
```

to:

```java
return "Hello from backend v2 - greeting updated";
```

```powershell
git add backend
git commit -m "Update greeting message to v2"
```

## 3. Create a conflicting change on main

```powershell
git checkout main
```

Open the **same file**, same line, and change it differently:

```java
return "Hello from backend, main branch fix";
```

```powershell
git add backend
git commit -m "Fix typo in greeting on main"
```

## 4. Merge and resolve the conflict

```powershell
git merge feature/greeting-v2
```

Git will stop and tell you there's a conflict. Open the file — you'll see:

```java
<<<<<<< HEAD
return "Hello from backend, main branch fix";
=======
return "Hello from backend v2 - greeting updated";
>>>>>>> feature/greeting-v2
```

Delete the `<<<<<<<`, `=======`, `>>>>>>>` markers, keep the line(s) you
actually want, save the file, then:

```powershell
git add backend/src/main/java/com/practice/HelloController.java
git commit -m "Merge feature/greeting-v2, resolve greeting conflict"
git log --oneline --graph --all
```

The graph output is what shows the branch diverging and rejoining.

## 5. Push to GitHub

1. On github.com, create a new **empty** repo (no README, no .gitignore -
   you already have one) called `git-practice`
2. Back in your terminal:

```powershell
git remote add origin https://github.com/<your-username>/git-practice.git
git branch -M main
git push -u origin main
```

## 6. Practice a pull request

```powershell
git checkout -b feature/add-endpoint
```

Add this method inside `HelloController.java`, alongside `hello()`:

```java
@GetMapping("/status")
public String status() {
    return "OK";
}
```

```powershell
git add backend
git commit -m "Add /api/status endpoint"
git push -u origin feature/add-endpoint
```

Go to GitHub, open a Pull Request from `feature/add-endpoint` into `main`,
review the diff, merge it. Then locally:

```powershell
git checkout main
git pull
git branch -d feature/add-endpoint
```

## 7. (Bonus) Interactive rebase / squashing commits

```powershell
git checkout -b feature/cleanup
```

Make 2-3 small separate commits (any tiny edits, e.g. add a comment, tweak a
string, add a blank line - separate commits each time), then:

```powershell
git rebase -i HEAD~3
```

An editor opens listing your 3 commits with `pick` next to each. Change the
2nd and 3rd `pick` to `squash` (or `s`), save, then edit the combined commit
message when prompted. This is how you clean up messy history before opening
a PR.

## Optional: actually run the apps

Backend:
```powershell
cd backend
mvn spring-boot:run
```

Frontend (separate terminal):
```powershell
cd frontend
npm install
npm start
```

Frontend runs on http://localhost:3000 and proxies `/api/*` calls to the
backend on http://localhost:8080.
