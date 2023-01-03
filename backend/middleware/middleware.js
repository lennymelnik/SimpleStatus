import jwt from "jsonwebtoken";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { redisClient } from "../redis.js";
import User from "../schemas/User.js";
import System from "../schemas/System.js"
export const tokenRequired = (req, res, next) => {
    new Promise((resolve, reject) => {
        resolve(jwt.verify(req.body.token, process.env.SECRET_KEY, {algorithms:["HS256"]}))
    })
    .then((result) => {
        if (result.alg != "HS256") {
            Promise.reject({
                status:401,
                reason:"bad token"
            })
        }
        console.log(result)
        res.locals.payload = result
        return next() 
    })
    .catch((err) => {
        next(err)
    })
}


export const generalErrorHandler = (err, req, res, next) => {

    console.log(err)
    return res.send({
        status: err.status ? err.status : StatusCodes.INTERNAL_SERVER_ERROR,
        reason: err.reason ? err.reason : ReasonPhrases.INTERNAL_SERVER_ERROR,
        note: "see server logs for further information"
    })
}

export function veryifyAndGetUser (req, res, next) {
    const { token } = req.headers 
    new Promise((resolve, reject) => {
        if (!token) {
            reject({
                status:StatusCodes.BAD_REQUEST,
                reason:ReasonPhrases.BAD_REQUEST
            })
        }
        resolve();
    }).then(async function(){
    // Get the email from the user from the token
        var thisUser = await redisClient.get(token)

        //check if user is logged in
        if(thisUser == null){
            return Promise.reject({
                status:StatusCodes.FORBIDDEN,
                reason:"Token not valid"
            })
        }
        return thisUser
    }).then(async function(userEmail){
        //Get the users account from the main data base
         
        req.user = await User.findOne({email : userEmail})
        if(req.user == null){
            return Promise.reject({
                status:StatusCodes.FORBIDDEN,
                reason:"User doesn't exist"
            })
        }
        if(req.user.banned){
            return Promise.reject({
                status:StatusCodes.FORBIDDEN,
                reason:"User is banned"
            })
        }
        next()
    }).catch((err) => {
        next(err)
    })
  }

export function isUserAdmin(req, res, next){
    new Promise((resolve, reject) => {
        if(!req.user.admin){
            return Promise.reject({
                status:StatusCodes.FORBIDDEN,
                reason:"User is not admin"
            })
        }
        resolve();
    }).then(async function(){

        console.log("User is admin")
        next()
    }).catch((err) => {
        next(err)
    })
    
}
export function isUserAdminSystem (req, res, next) {
    const { id } = req.params
    new Promise((resolve, reject) => {
        if (!id) {
            reject({
                status:StatusCodes.BAD_REQUEST,
                reason:ReasonPhrases.BAD_REQUEST
            })
        }
        resolve();
    }).then(async function(){
        // check if user is admin of the view
        req.system = await System.findOne({_id : id, user : req.user._id}).populate('updates')

        //check if user is logged in
        if(req.system == null){
            return Promise.reject({
                status:StatusCodes.FORBIDDEN,
                reason:"User is not admin of system, or view does not exist"
            })
        }
        next()
    }).catch((err) => {
        next(err)
    })
  }
