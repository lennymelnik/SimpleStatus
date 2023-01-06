import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { Router } from "express";
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { nanoid } from 'nanoid'
import uniqid from "uniqid"
import { redisClient } from "../redis.js";
import { LoginRequestValidator, RegisterRequestValidator } from "../validators/validators.js";
import { isUserAdminSystem, tokenRequired, veryifyAndGetUser } from "../middleware/middleware.js";
import System from "../schemas/System.js";
import Update from "../schemas/Update.js";

const route = Router();


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
//Get System
route.get(
    "/",[veryifyAndGetUser],
    (req, res, next) => {
        // validate the request body

        new Promise((resolve, reject) => {
            if (false) {
                reject({
                    status:StatusCodes.BAD_REQUEST,
                    reason:ReasonPhrases.BAD_REQUEST
                })
            }
            resolve();
        }).then(async function (){
            const allSystems = await System.find({user : req.user._id}).populate("lastUpdate")

            res.send({
                status:StatusCodes.OK,
                data:allSystems,

            })


        })
    
        // whatever error is thrown, send it to the error handling middleware 
        .catch((err) => {
            next(err, res, next)
        })
    }
)
//Get System
route.get(
    "/:id",[veryifyAndGetUser,isUserAdminSystem],
    (req, res, next) => {
        // validate the request body

        new Promise((resolve, reject) => {
            if (false) {
                reject({
                    status:StatusCodes.BAD_REQUEST,
                    reason:ReasonPhrases.BAD_REQUEST
                })
            }
            resolve();
        }).then(async function (){

            res.send({
                status:StatusCodes.OK,
                data:req.system,

            })


        })
    
        // whatever error is thrown, send it to the error handling middleware 
        .catch((err) => {
            next(err, res, next)
        })
    }
)

//Create System
route.post(
    "/",[veryifyAndGetUser],
    (req, res, next) => {
        // validate the request body
        const { name } = req.body

        new Promise((resolve, reject) => {
            if (!name) {
                reject({
                    status:StatusCodes.BAD_REQUEST,
                    reason:ReasonPhrases.BAD_REQUEST
                })
            }
            resolve();
        }).then(async function (){

            const other = await System.find({name : name, user : req.user._id})
            if(other.length > 0){
                return Promise.reject({
                    status:StatusCodes.CONFLICT,
                    reason:"You already have system with the same name"
                })

            }
            const newSystem = new System(
                {
                    name : name,
                    user : [req.user._id],
                    updates : []
                    
                }
            )
            let err = newSystem.validateSync();
            if (err) {
                return Promise.reject({
                    status:StatusCodes.BAD_REQUEST,
                    reason:"Invalid JSON Body"
                })
            }

            newSystem.save()

            res.send({
                status:StatusCodes.CREATED,
                message:"System has been created",

            })


        })
    
        // whatever error is thrown, send it to the error handling middleware 
        .catch((err) => {
            next(err, res, next)
        })
    }
)


//Update system status
route.post(
    "/:id",[veryifyAndGetUser, isUserAdminSystem],
    (req, res, next) => {
        // validate the request body
        const ip = req.socket.remoteAddress
        const {status, percent, error, info, task}= req.body

        new Promise((resolve, reject) => {
            if (!status) {
                reject({
                    status:StatusCodes.BAD_REQUEST,
                    reason:ReasonPhrases.BAD_REQUEST
                })
            }
            resolve();
        }).then(async function (){

            const newUpdate = new Update({
                ...req.body, 
                timestamp : new Date().getTime()
            }


            )
            let err = newUpdate.validateSync();
            if (err) {
                return Promise.reject({
                    status:StatusCodes.BAD_REQUEST,
                    reason:"Invalid JSON Body"
                })
            }

            newUpdate.save()


            req.system.updates.push(newUpdate._id)
            req.system.lastUpdate = newUpdate._id
            req.system.save()


            res.send({
                status:StatusCodes.OK,
                message:"System has been updated",

            })


        })
        
        // whatever error is thrown, send it to the error handling middleware 
        .catch((err) => {
            next(err, res, next)
        })
    }
)


export default route;
