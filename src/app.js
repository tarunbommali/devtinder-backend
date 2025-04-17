const app = require("express")();

app.get("/user", (req, res) => {
  // Route handler 
  res.send("route handler 1");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
