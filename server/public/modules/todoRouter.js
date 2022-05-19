const express = require('express');
const todoRouter = express.Router();
const pool = require('../modules/pool');

todoRouter.post('/', (req, res)=>{
    console.log('/todoRouter POST', req.body);
    const queryString = `INSERT INTO tasks (description) VALUES ($1);`;
    const values = [req.body.description];
    pool.query(queryString, values).then((result)=>{
        res.sendStatus(201); //CREATED
    }).catch((err)=>{
        console.log(err);
        res.sendStatus(500);
    })
})



module.exports = todoRouter;