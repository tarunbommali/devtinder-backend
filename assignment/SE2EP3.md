
# 03. Creating Our Express Server


---

## 📦 Step 1: Install Express

```bash
npm install express --save
```

- This installs Express.js and adds it to your `dependencies` in `package.json`.
- A `node_modules` folder will be created to store installed packages.

---

## 📁 package.json vs package-lock.json

| File                | Description                                                                 |
|---------------------|-----------------------------------------------------------------------------|
| `package.json`      | Lists your project dependencies, scripts, and metadata                      |
| `package-lock.json` | Locks the exact version of installed packages for consistent environments   |

---

## 🔢 Versioning Explained (Semantic Versioning)

Example: `5.1.3`

| Version Part | Meaning                  |
|--------------|--------------------------|
| `5`          | Major - Breaking changes |
| `1`          | Minor - Backward-compatible features |
| `3`          | Patch - Bug fixes, small updates |

### Symbols:

| Symbol | Meaning                        |
|--------|--------------------------------|
| `^`    | Allows minor and patch updates |
| `~`    | Allows only patch updates      |

---

## ⚙️ Create Basic Express Server

### ✅ Code Example

```js
const express = require('express');
const app = express();

app.use('/test', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

### ⚠️ Common Mistakes
- `expess()` ❌ → should be `express()` ✅
- `app.llisten()` ❌ → should be `app.listen()` ✅

---

## 🔁 Use Nodemon for Auto-Restart

### Step 1: Install nodemon

```bash
npm install nodemon --save-dev
```

### Step 2: Add Scripts in `package.json`

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

### Step 3: Run with Nodemon

```bash
npm run dev
```

---

## 🌐 Output

Visit: [http://localhost:3000/test](http://localhost:3000/test)

You should see the response:

```
Hello World!
```

---

## ✅ Summary

- Installed Express using npm
- Learned versioning and package files
- Built a simple Express server
- Used nodemon for auto-refresh on code change

```
 