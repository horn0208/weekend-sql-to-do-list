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

todoRouter.get('/', (req, res)=>{
    console.log('/todoRouter GET');
    let queryString = `SELECT * FROM tasks ORDER BY id ASC;`
    pool.query(queryString).then((results)=>{
        res.send(results.rows);
    }).catch((err)=>{
        console.log(err);
        res.sendStatus(500);
    })
})

todoRouter.put('/', (req, res)=>{
    console.log('/todoRouter PUT', req.query);
    let queryString = `UPDATE tasks SET complete = true WHERE id=$1;`;
    const values = [req.query.id];
    pool.query(queryString, values).then((results)=>{
        res.sendStatus(200);
    }).catch((err)=>{
        console.log(err);
        res.sendStatus(500);
    })
})

todoRouter.delete('/', (req, res)=>{
    console.log('/todoRouter DELETE', req.query);
    let queryString = `DELETE FROM tasks WHERE id=$1;`
    const values = [req.query.id];
    pool.query(queryString, values).then((results)=>{
        res.sendStatus(200);
    }).catch((err)=>{
        console.log(err);
        res.sendStatus(500);
    })
})

module.exports = todoRouter;