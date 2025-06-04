require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT;

// Enable CORS
app.use(cors({ origin: '*' }));
// Body parser
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: false }));

connectDB();


app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.send('Welcome To Task Manager API Application');
});

// setting error path
app.use((req, res, next) => {
    const err = new Error(`${req.url} not found in this server`);
    err.status = 404;
    next(err);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
