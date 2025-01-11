const mysql = require('mysql2');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

connection
    .promise()
    .query('SELECT * FROM users')
    .then(([rows, fields]) => {
        console.log(rows);
    });
    
    const firstName = 'bk';
    const lastName = 'kk';
    const email = 'akabk@no.no';
    const password = 'bk123';
    
function addUser(firstName, lastName, email, password) {
    // Check if email already exists
        // query the db for the email
        // if the email already exists, return an error
    
    // Otherwise, hash the password and insert the user into the db
    bcrypt.hash(password,10)
    .then((hashedPassword) => {return connection.promise().query('INSERT into users (first_name, last_name, email, password) VALUES (?,?,?,?)', [firstName, lastName, email, hashedPassword])})
    .then(([result]) => {console.log(result)});
}
addUser(firstName, lastName, email, password);

// function getUserByEmail(email) {
//     connection.promise().query('SELECT * FROM users WHERE email = ?', [email])
//     .then(([rows, fields]) => {
//         console.log(rows);
//     });
// }

// function userLogin(email, enteredPassword) {
//     connection.promise().query('SELECT * FROM users WHERE email = ?', [email])
//     .then(([rows, fields]) => {
//         // if the email doesn't exist, return an error
        
//         // otherwise, compare the entered password with the hashed password
//         bcrypt.compare(enteredPassword, rows[0].password)
//         .then((isMatch) => {
//             if (isMatch) {
//                 // log the user in, whatever that means
//                 // jwt token, session, etc. 
//                 console.log('Logged in');
//             } else {
//                 console.log('Incorrect password');
//             }
//         })
//     });
// }

// // getUserByEmail('pizza@no.no');
// userLogin('pizza@no.no', 'pizzisnice1234');
