import express, {Application} from "express";
import { router } from "./api";
import cors from "cors";

const port = process.env.PORT ? parseInt(process.env.PORT) : 5000;
const app: Application = express();

app.use(cors());

app.use('/api',router);

app.listen(port, () => console.log(`express is listening in port: ${port}`));