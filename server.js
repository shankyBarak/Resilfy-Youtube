import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors'

dotenv.config();

const app = express()

connectDB();


app.use(cors())
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/v1/auth', authRoutes)



app.get('/', (req, res) => {
    res.send("<h1>Welcome to Resilfy</h1>"
    )
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server Running on ${PORT} `.bgCyan.white);
})