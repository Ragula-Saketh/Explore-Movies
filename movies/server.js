const express = require('express');
const bodyParser=require('body-parser');
const path=require('path');
const jwt=require("jsonwebtoken");
const key="Ragula_Saketh";
const routes= require('./routes/movieroutes');
const mysql = require('mysql2');
const Config = require('./config/config');

const app= express();

app.use(bodyParser.json());
app.use(routes);

const db = mysql.createConnection({
    host: Config.host,
    user: Config.user,
    password: Config.password,
    database: Config.database
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});
const authenticateToken = function (req, res, next) {
    const authHeader = req.headers["authorization"];
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        if (token) {
            jwt.verify(token, key, (err, user) => {
                if (err) {
                    return res.status(403).send("Invalid token");
                }
                req.user = user;   
                next();
            });
        } else {
            return res.status(401).send("Token missing");
        }
    } else {
        return res.status(401).send("Authorization header missing");
    }
};

app.post('/home', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' });
        }
        if (result.length > 0) {
            if (result[0].password === password) {
                const payload = { email, role: "user" };
                const token = jwt.sign(payload, key, { expiresIn: '1h' });
                return res.json({ token }); 
            } else {
                return res.status(401).json({ error: 'Invalid username or password' });
            }
        }
        db.query('SELECT * FROM admins WHERE email = ?', [email], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Database query error' });
            }
            if (result.length > 0) {
                if (result[0].password === password) {
                    const payload = { email, role: "admin" };
                    const token = jwt.sign(payload, key, { expiresIn: '1h' });
                    console.log("Generated token for admin:", token); 
                    return res.json({ token }); 
                } else {
                    return res.status(401).json({ error: 'Invalid username or password' });
                }
            }
            return res.status(401).json({ error: 'Invalid username or password' });
        });
    });
});




app.get("/register", (request, response) => {
    response.sendFile(path.join(__dirname, "public", "register.html"));
});
app.get("/login", (request, response) => {
    response.sendFile(path.join(__dirname, "public", "login.html"));
});
app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/homeuser",authenticateToken, (request, response) => {
    response.json({ message: "user" });
});

app.get("/admin",authenticateToken, (request, response) => {
    response.json({ message: "admin" });
});
app.get("/user", (request, response) => {

    response.sendFile(path.join(__dirname, "public", "user.html"));
});

app.use("/",express.static(path.join(__dirname,"public")));

app.listen(3000,()=>{
    console.log(`App is listening on port ${3000}`);
});

