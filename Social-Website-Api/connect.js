import mysql from 'mysql2';
export const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"sunpreet",
    database:"socialmedia"
});

db.connect((error) => {
    if (error) {
        console.error('Error connecting to database:', error);
    } else {
        console.log('Connected to database!');
    }
});