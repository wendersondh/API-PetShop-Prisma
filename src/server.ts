import express from 'express';
import cors from 'cors';
import { router } from './routes/routes';

const port = 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
