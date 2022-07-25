const express = require('express');
const connectDB = require('./config/connectDB');
const { errorHandler } = require('./config/errorMiddleware');
const app = express();
const goalRouter = require('./routers/goal');


connectDB();

app.use(express.json());
app.use(errorHandler);
app.use('/api/goal', goalRouter);

const port = process.env.DEFAULT_PORT || 5000

app.listen(port, () => {
    console.log(`the server is running on port ${port}...`);
})