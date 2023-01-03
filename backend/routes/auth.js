import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { Router } from "express";
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { nanoid } from 'nanoid'
import uniqid from "uniqid"
import { redisClient } from "../redis.js";
import User from "../schemas/User.js";
import { LoginRequestValidator, RegisterRequestValidator } from "../validators/validators.js";
import { tokenRequired } from "../middleware/middleware.js";

const route = Router();

route.get(
    "/",
    (req, res) => {
        res.send("authentication API is active");
    }
);

// print out the contents of a token, or display any errors for the token verification
route.post(
    "/token_debug",
    (req, res) => {
        redisClient.set(req.body.key, req.body.value)
        .then(() => {
            res.send("inserted into the db")
        })
        .catch(((err) => {
            console.log(err)
        }))

    }
)


route.post(
    "/login",
    (req, res, next) => {
        // validate the request body
        req.body.email = req.body.email.toLowerCase()
        const {email, password} = req.body;

        new Promise((resolve, reject) => {
            if (!email || !password) {
                reject({
                    status:StatusCodes.BAD_REQUEST,
                    reason:ReasonPhrases.BAD_REQUEST
                })
            }
            resolve();
        })
        .then(() => {
            // find the database entry for the requested email, error if not found
            return User.findOne({email:email})
        })
        .then((data) => {
            if (data == null)
            {
                return Promise.reject({
                    status:StatusCodes.FORBIDDEN,
                    reason:"Email or password are invalid"
                })
            }
            
            res.locals.user = data
            // bcrypt stores the salt alongside the hashed_password
            return bcrypt.compare(password, data.password)
        })
        .then((result) => {
            // if bcrypt compare returned false, the password was incorrect
            if (!result) {
                return Promise.reject({
                    status:StatusCodes.FORBIDDEN,
                    reason:"Incorrect Password"
                })
            }
            
            // generate session id
            let sessionID = nanoid(50)
            redisClient.set(sessionID, email)
            res.send({
                status:StatusCodes.OK,
                type:"refresh",
                token:sessionID
            })
        })
        
        // whatever error is thrown, send it to the error handling middleware 
        .catch((err) => {
            next(err, res, next)
        })
    }
)
route.post(
    "/register",
    (req, res, next) => {
    
        // while this line may seem slightly unsafe, we immediately validate afterwards 
        // and throw the reject if there's anything undefined
        const {email, password} = req.body;
        

        // if req.body isn't a valid JSON for a POST to /auth/register, return an error
        new Promise((resolve, reject) => {
            if (!email || !password)
            {
                reject({
                    status:StatusCodes.BAD_REQUEST,
                    reason:ReasonPhrases.BAD_REQUEST
                })
            }
            resolve()
        })
        // we could couple the query and the validation in one promise, but seperating
        // out functions by duty is more aesthetic
        .then(() => {
            return User.findOne({email:email})
        })

        // check to see if the registering email already exists, throw error if it does        
        .then((data)=>{
            if (data != null) {
                return Promise.reject({
                    status:StatusCodes.FORBIDDEN,
                    reason:"User already exists with email"
                })
            }

            // if this is a new unique user, calculate their password hash and pass it to the next promise
            return bcrypt.hash(password, 10)
        })

        // validate the User object, save it to the database, and send a CREATED response
        .then(async function(hash){
            const newUser = new User({
                email:email,
                password:hash,
            })

          



            let err = newUser.validateSync();
            if (err) {
                return Promise.reject({
                    status:StatusCodes.BAD_REQUEST,
                    reason:"Invalid JSON Body"
                })
            }

            newUser.save()


            
            let sessionID = nanoid(50)
            redisClient.set(sessionID, email)
            

        
            res.send({
                status:StatusCodes.CREATED,
                message:"User Account Has been Created",
                token:sessionID

            })
        })

        .catch((err) => {
            next(err, res, next)
        })

    }

)

export default route;
