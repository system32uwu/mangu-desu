import express, { Request, Response, Router } from "express";
import { SearchQuery } from "mangadex-api";
import { client } from "../";

const router: Router = express.Router();

router.get("/manga", (req: Request, res: Response) => {
  const id = req.query.id as string;

  try {
    const ID = Number(id);

    client.manga
      .getManga(ID)
      .then((manga) => {
        res.json(manga);
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    res.json({ err: err });
  }
});

router.get("/search", (req: Request, res: Response) => {
  const {
    title,
    author,
    demos,
    artist,
    withHentai,
    statuses,
    langId,
    tags,
    tagModeExc,
    tagModeIncAll,
  } = req.query;

  let DEMOS = [] as number[];

  try {
    parseToList(demos as string, DEMOS);
    if (DEMOS.length < 1) DEMOS = undefined;
  } catch (err) {
    res.json({ err: verboseErr(err, "demos") });
  }

  let WH = withHentai === "false" ? false : true;

  let STATUSES = [] as number[];

  try {
    parseToList(statuses as string, STATUSES);
    if (STATUSES.length < 1) STATUSES = undefined;
  } catch (err) {
    res.json({ err: verboseErr(err, "statuses") });
  }

  let LANGID;
  if (langId) {
    try {
      if (!isNaN(parseInt(langId.toString()))) {
        LANGID = parseInt(langId.toString());
      } else {
        throw errIntType;
      }
    } catch (err) {
      res.json({ err: verboseErr(err, "langId") });
    }
  }
  let TAGS = [] as number[] | undefined;

  try {
    parseToList(tags as string, TAGS);
    if (TAGS.length < 1) TAGS = undefined;
  } catch (err) {
    res.json({ err: verboseErr(err, "tag") });
  }

  let TGDMX = tagModeExc as string;
  let TAGMODEEXC: "all" | "any";

  if (TGDMX === "any") {
    TAGMODEEXC = "any";
  } else if (TGDMX === "all") {
    TAGMODEEXC = "all";
  } else {
    TAGMODEEXC = undefined;
  }

  let TGDIA = tagModeIncAll as string;
  let TAGMODEINCLUDEALL: "all" | "any";

  if (TGDIA === "any") {
    TAGMODEINCLUDEALL = "any";
  } else if (TGDIA === "all") {
    TAGMODEINCLUDEALL = "all";
  } else {
    TAGMODEEXC = undefined;
  }

  let opts = {
    title: title && (title as string),
    author: author && (author as string),
    demos: DEMOS && DEMOS,
    artist: artist && (artist as string),
    with_hentai: WH,
    statuses: STATUSES && STATUSES,
    lang_id: LANGID && LANGID,
    tags: TAGS && TAGS,
    tag_mode_exc: TAGMODEEXC && TAGMODEEXC,
    tag_mode_inc_all: TAGMODEEXC && TAGMODEINCLUDEALL,
  } as SearchQuery;

  client
    .search(opts)
    .then((data) => {
      res.json({ params: opts, data: data });
     })
    .catch((err) => {
      res.status(403).json({ err: err.toString() });
    });
});

const parseToList = (str: string, list: number[]): void => {
  str
    ? str
        .toString()
        .split(",")
        .forEach((str) => {
          if (!isNaN(parseInt(str))) {
            list.push(parseInt(str));
          } else {
            throw errIntType;
          }
        })
    : (list = undefined);
};

const errIntType = "Type of variable must be integer";

const verboseErr = (errString: string, param: string): string => {
  return errString.replace("variable", param);
};

export { router };
