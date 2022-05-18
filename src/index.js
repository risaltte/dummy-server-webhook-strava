import express from "express";
import cors from 'cors';
import { router } from './routes.js';

try {
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(3333, () => {
    console.log('webhook is listening!!!');
});

} catch (error) {
    console.log("error");
    console.log(error);
}



