const express = require('express');
const app = express();
const db = require('./db');
const cors = require('cors')
const router = require('./routes/employee.route');
const userRouter = require('./routes/user.route')
const employeeRouter = require('./routes/employee.route')
app.use(cors());
app.use(express.json());
app.use('/api', userRouter)
app.use('/api', employeeRouter)
async function start() {
    try {
        const result = await db.query('SELECT NOW()');

        console.log('Database connected!');
        console.log(result.rows[0]);
        app.listen(3000, () => {
            console.log('Server running on port 3000');
        });
    } catch (err) {
        console.error('Database connection failed!');
        console.error(err.message);
    }
}

start();