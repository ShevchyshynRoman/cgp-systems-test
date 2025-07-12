import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/user.route';
import { initDB } from './utils/db';
import { errorMiddleware } from './middlewares/errorMiddleware';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/users', userRouter);

app.use(errorMiddleware);

async function start() {
  try {
    await initDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
  }
}

start();
