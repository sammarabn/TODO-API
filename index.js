const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'tododb',
    multipleStatements: true
});

mysqlConnection.connect((err) =>{
    if(!err)
    console.log('DB connection succeded.');
    else
    console.log('DB connection failed \n Erro: ' + JSON.stringify(err, undefined, 2));
});

app.listen(3000, () => console.log('Express server is running at port number 3000'));

app.get('/users', (req, res) =>{
    mysqlConnection.query('SELECT * FROM user', (err, rows, fields) =>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

app.get('/users/:UserID', (req, res) =>{
    mysqlConnection.query('SELECT * FROM user WHERE UserID = ?', [req.params.UserID], (err, rows, fields) =>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

app.delete('/users/:UserID', (req, res) =>{
    mysqlConnection.query('DELETE FROM user WHERE UserID = ?', [req.params.UserID], (err, rows, fields) =>{
        if(!err)
        res.send('Deleted successfully!');
        else
        console.log(err);
    })
});

app.post('/users', (req, res) =>{
    let user = req.body
    var sql = "SET @UserID = ?; SET @Email = ?; SET @Name = ?; SET @Password = ?; CALL  UserAddOrEdit (@UserID,@Email,@Name,@Password);";
    mysqlConnection.query(sql,[user.UserID, user.Email, user.Name, user.Password], (err, rows, fields) =>{
        if(!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted user id: ' + element[0].UserID);
            });
        else
        console.log(err);
    })
});

app.put('/users', (req, res) =>{
    let user = req.body
    var sql = "SET @UserID = ?; SET @Email = ?; SET @Name = ?; SET @Password = ?; CALL  UserAddOrEdit (@UserID,@Email,@Name,@Password);";
    mysqlConnection.query(sql,[user.UserID, user.Email, user.Name, user.Password], (err, rows, fields) =>{
        if(!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted user id: ' + element[0].UserID);
            });
        else
        console.log(err);
    })
});
