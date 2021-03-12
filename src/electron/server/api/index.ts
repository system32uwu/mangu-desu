import express,{Router} from "express";
import { router as mangu } from "./mangu"
import { router as home } from "./home"
import { router as auth } from "./auth"
import { router as manga } from "./manga"
import { router as chapters } from "./chapters"
import { Mangadex } from "mangadex-api";
import path from "path";

const router: Router = express.Router();

router.use("/", mangu);
router.use("/home", home);
router.use("/auth", auth);
router.use("/manga", manga);
router.use("/chapters", chapters);

export {router};

//every other endpoint will use this instance.
export const client = new Mangadex();

export const sessionPath = path.join(__dirname, "auth", "session");