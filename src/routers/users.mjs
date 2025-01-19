import { Router } from "express";
import { query, validationResult, checkSchema, matchedData } from "express-validator";
import mockUsers from "../utils/data.mjs";
import {resolveIndexByUserId}  from "../utils/middlewares.mjs";
import { createUserValidationSchema } from "../utils/validationScemas.js";

const router = Router();

router.get('/api/users',
    query('filter')
    .isString().withMessage('fliter should be string')
    .notEmpty().withMessage('Filter should be not empty')
    .isLength({ min: 3, max: 10}).withMessage('Must be at least 3 characters'),
    
     (req, res) => { // Middleware C
        console.log("Guru");
        
        const result = validationResult(req)
        console.log(result);
        const {query: {filter, value}} = req
        if(!filter||!value){
            return res.send(mockUsers)
        }
        const filteredUsers = mockUsers.filter(user => user[filter].toLowerCase().includes(value.toLowerCase()));
        if(!filteredUsers.length) return res.status(404).send("No users found")
        return res.send(filteredUsers)
     }
)

router.get('/api/users/:id', (req, res) => {
    const parseID = parseInt(req.params.id);
    if(isNaN(parseID)){
        return res.status(400).send("Bad request, invalid id")
    }
    let user = mockUsers.filter(user => user.id === parseID);
    if(!user.length) return res.status(404).send("User not found")
    res.send(user)
})

router.post(
    '/api/users', 
    
    checkSchema(createUserValidationSchema),

    (req, res) => {
        const result = validationResult(req)
        if(!result.isEmpty()){
            return res.status(400).json(result.array());
        }
        const data = matchedData(req)
        const newUser = {
            id: mockUsers.length + 1,
            ...data
        }
        mockUsers.push(newUser);
        return res.status(200).send(mockUsers)
    }
)

router.put('/api/users/:id', resolveIndexByUserId, (req, res) => {
    const {userIndex, params, body} = req;
    let id = parseInt(params.id); 
    mockUsers[userIndex] = {id,...body}
    return res.status(200).send(mockUsers[userIndex])
})

router.patch('/api/users/:id', resolveIndexByUserId, (req, res) => {
    let userIndex = req
    mockUsers[userIndex] = {...mockUsers[userIndex],...req.body}
    return res.status(200).send(mockUsers[userIndex])
})

router.delete('/api/users/:id', resolveIndexByUserId, (req, res) => {
    let userIndex = req.userIndex
    mockUsers.splice(userIndex, 1);
    return res.sendStatus(204)
})

export default router;