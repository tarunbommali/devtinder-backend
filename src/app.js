 const app = require('express')();

app.use("/test",(req,res) => {
   res.send('Hello World');
})

app.use("/",(req,res) => {
   res.send('from dashboard hello');    })  



 app.listen(3000, () => {
   console.log('Server is running on port 3000');
 });