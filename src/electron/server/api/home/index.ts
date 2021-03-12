import express, { Request, Response, Router } from "express";
import { client } from "../";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
    client.getHome().then((home) =>{
        res.json(home);
    }).catch((err) =>{
        res.json({
            err: err
        });
    })
});

export { router };
