require("dotenv").config();
const express= require("express")
const app=express()
const morgan= require("morgan")
const userRouter= require("./routes/userRouter.js")
const db= require("./config/db.js")
const cors= require("cors");
const errorhandler = require("./middlewares/errorhandler.js");

db.connect()
app.use(cors(
  {
  origin:process.env.FRONTEND_URL,
  methods:["GET","POST","PATCH","DELETE","PUT"],
  credentials:true,
  }
))
// app.use(authenticateToken)
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(morgan("dev"))
app.use("/api",userRouter)
app.get("/",(req,res)=>{
  res.json(process.env.databaseurl)
})
app.use(errorhandler)
app.listen(5000, () => {
    console.log("server connected");
  });

  