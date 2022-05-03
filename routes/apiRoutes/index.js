const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

//view all departments
router.get('/departments', (req, res) => {
    const sql = `SELECT * FROM department`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });

router.post('/departments', ({ body }, res) => {
    const sql = `INSERT INTO department (department_name)
  VALUES (?)`;
    const params = [body.department_name];

    db.query(sql, params, (err, result) => {
    if (err) {
        res.status(400).json({ error: err.message });
        return;
    }
    res.json({
        message: 'success',
        data: body
        });
    });
})

//view all roles
router.get('/roles', (req, res) => {
    const sql = `SELECT * FROM roles`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json ({
            message: 'success',
            data: rows
        });
    });
});

router.post('/roles', ({ body }, res) => {
    const sql = `INSERT INTO roles (title, salary, department_id)
  VALUES (?, ?, ?)`;
    const params = [body.title, body.salary, body.department_id];

    db.query(sql, params, (err, result) => {
    if (err) {
        res.status(400).json({ error: err.message });
        return;
    }
    res.json({
        message: 'success',
        data: body
        });
    });
})

//view all employees
router.get('/employee', (req, res) => {
    const sql = `SELECT * FROM employee`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json ({
            message: 'success',
            data: rows
        });
    });
});

module.exports = router;