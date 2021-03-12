import express, { Request, Response, Router } from "express";
import { client } from "..";

const router: Router = express.Router();

router.get("/getChaptersOfManga", (req: Request, res: Response) => {
  const id = req.query.id as string;

  try {
    const ID = Number(id);

    client.manga
      .getMangaChapters(ID)
      .then((chapters) => {
        res.json(chapters);
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    res.json({ err: err });
  }
});

router.get("/chapter", (req: Request, res: Response) => {
  const id = req.query.id as string;

  try {
    const ID = Number(id);

    client.chapter
      .getChapter(ID)
      .then((chapter) => {
        res.json(chapter);
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    res.json({ err: err });
  }
});

export { router };
