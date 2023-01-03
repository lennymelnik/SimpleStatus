import app from "./app.js";
import mongoose from "mongoose"
import dotenv from 'dotenv'
import { redisClient } from "./redis.js"
dotenv.config()


let mongoURI;
switch (process.env.NODE_ENV){
    case "dev":
        mongoURI = process.env.MONGODB_URL_DEV;
        break;
    case "test":
        mongoURI = process.env.MONGODB_URL_DEV
        break;
}


mongoose.connect(mongoURI).then(() => {
  redisClient.connect()
  console.log(`🤖[database][${new Date().toLocaleTimeString()}]: remote ${process.env.NODE_ENV.toUpperCase()} database is connected`)
  app.listen(3010, () => {
    console.log(
      `⚡[server][${new Date().toLocaleTimeString()}]:`,
      `running on http://localhost:3010`
    );
  })
},
(err) => {
  console.log(process.env.MONGODB_URL_DEV)
  console.log("database error")
})
