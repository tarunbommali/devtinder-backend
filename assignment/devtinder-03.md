# 03. Creating Our Express Server

This episode covers installing Express, understanding package files and versioning, building a basic Express server, and using nodemon for auto-restart during development.

---

## Table of Contents

- [Install Express](#install-express)
- [package.json vs package-lock.json](#packagejson-vs-package-lockjson)
- [Semantic Versioning](#semantic-versioning)
- [Create a Basic Express Server](#create-a-basic-express-server)
- [Common Mistakes](#common-mistakes)
- [Use Nodemon for Auto-Restart](#use-nodemon-for-auto-restart)
- [Output](#output)
- [Summary](#summary)

---

## Install Express

Install Express.js and add it to your project dependencies:

```bash
npm install express --save
```

- This command adds Express to your `dependencies` in `package.json`.
- A `node_modules` folder will be created to store installed packages.

---

## package.json vs package-lock.json

| File                | Description                                                                 |
|---------------------|-----------------------------------------------------------------------------|
| `package.json`      | Lists your project dependencies, scripts, and metadata                      |
| `package-lock.json` | Locks the exact version of installed packages for consistent environments   |

---

## Semantic Versioning

Example version: `5.1.3`

| Version Part | Meaning                                |
|--------------|----------------------------------------|
| `5`          | Major - Breaking changes               |
| `1`          | Minor - Backward-compatible features   |
| `3`          | Patch - Bug fixes, small updates       |

### Symbols

| Symbol | Meaning                        |
|--------|--------------------------------|
| `^`    | Allows minor and patch updates |
| `~`    | Allows only patch updates      |

---

## Create a Basic Express Server

Here’s a minimal Express server example:

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

---

## Common Mistakes

- Typo: `expess()` ❌ → should be `express()` ✅
- Typo: `app.llisten()` ❌ → should be `app.listen()` ✅

---

## Use Nodemon for Auto-Restart

Nodemon restarts your server automatically when you change code.

### 1. Install nodemon

```bash
npm install nodemon --save-dev
```

### 2. Add Scripts in `package.json`

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

### 3. Run with Nodemon

```bash
npm run dev
```

---

## Output

Visit: [http://localhost:3000/test](http://localhost:3000/test)

You should see the response:

```
Hello World!
```

---

## Summary

- Installed Express using npm
- Learned about versioning and package files
- Built a simple Express server
- Used nodemon for auto-refresh on code change

---