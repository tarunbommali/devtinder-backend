# 04. Routing and Request Handlers in Express.js

In this episode, we cover Git initialization, setting up routes, testing APIs with Postman, and understanding advanced routing patterns in Express.js.

---

## 🗂️ Git Setup

```bash
git init
```

- Initialize a new Git repository in your project folder.

### 📁 Create `.gitignore`

Add the following to `.gitignore` to ignore unnecessary files:

```
node_modules/
.env
```

### ⬆️ Push Code to GitHub

1. Create a new remote repository on GitHub
2. Run the following commands:

```bash
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/your-repo-name.git
git push -u origin main
```

---

## 🚀 Playing with Routes

In Express.js, routes define how your app responds to client requests.

### Example Routes:

```js
app.get('/xyz', (req, res) => {
  res.send('XYZ GET');
});

app.post('/test', (req, res) => {
  res.send('POST to /test');
});
```

📝 **Note:** Order of routes matters! Define specific routes before wildcard routes.

---

## 📬 HTTP Methods in Express

| Method | Description       |
|--------|-------------------|
| GET    | Fetch data        |
| POST   | Create data       |
| PATCH  | Update partially  |
| DELETE | Remove data       |

### Example:

```js
app.get('/user', (req, res) => res.send('GET user'));
app.post('/user', (req, res) => res.send('POST user'));
app.patch('/user', (req, res) => res.send('PATCH user'));
app.delete('/user', (req, res) => res.send('DELETE user'));
```

---

## 🧪 Test Using Postman

1. Download and install [Postman](https://www.postman.com/downloads/)
2. Create a workspace
3. Test your routes using GET, POST, PATCH, DELETE requests

---

## 🌐 Wildcard & Flexible Routes

### General Middleware (Wildcard Route)

```js
app.use('/test', (req, res) => {
  res.send('Wildcard match for /test with any method');
});
```

### Specific Method

```js
app.get('/user', (req, res) => {
  res.send('GET user route');
});
```

---

## 🎯 Advanced Routing Techniques

| Pattern            | Matches Example           | Description                                |
|--------------------|---------------------------|--------------------------------------------|
| `/ab+c`            | `/abc`, `/abbc`, `/abbbc` | One or more `b`                            |
| `/ab?c`            | `/abc`, `/ac`             | Optional `b`                               |
| `/ab*cd`           | `/abcd`, `/ab123cd`       | Anything between `ab` and `cd`             |
| `/a(bc)d`          | `/ad`, `/abcd`            | Optional `bc`                              |
| `/a(bc)+d`         | `/abcd`, `/abcbcd`        | One or more `bc`                           |
| Regex `/a/`        | Matches route using regex | Useful for more advanced matching          |

---

## ✅ Summary

- Initialized Git & pushed code to GitHub
- Learned basic and advanced routing in Express.js
- Used Postman to test various API methods
- Explored wildcard and pattern-based routes

> 🧠 Routing is core to building APIs — understanding order and pattern matching will save you from big bugs!
``` 