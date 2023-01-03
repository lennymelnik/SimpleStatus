import {createClient} from "redis"
import {promisify} from "util"

const redisClient = createClient({
    socket: {
        url: 'redis://localhost:6379'
    }
})


const redisGet = promisify(redisClient.get).bind(redisClient);
const redisSet = promisify(redisClient.set).bind(redisClient);

redisClient.on("ready", (data) => {
    console.log(`🔒[session database][${new Date().toLocaleTimeString()}]: connected to redis`)
})

redisClient.on("error", (err) => {
    console.log(err)
    console.log("something bad happened with redis")
})

export {redisGet, redisSet, redisClient}
