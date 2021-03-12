import express, { Request, Response, Router } from "express";

const router: Router = express.Router();

interface Route {
  name: string;
  description: string;
  url: string;
  params?: param[];
}

interface param {
  name: string;
  description?: string;
}

var routes: Route[] = [
  {
    name: "Docs",
    description: "Fetch the available routes.",
    url: `/api`,
  },
  {
    name: "Mangadex Home",
    description:
      "Fetch what shows in the homepage. (announcements, top mangas, top chapters, latest chapters)",
    url: `/api/home`,
  },
  {
    name: "Login",
    description:
      "Authorize the user (required for searching manga and of course for fetching data regarding the user.)",
    url: `/api/auth/login`,
    params: [
      {
        name: "username",
      },
      {
        name: "password",
      },
      {
        name: "rememberMe",
        description: "(Optional) Wheter or not to save user session, defaults to true",
      },
    ],
  },
  {
    name: "Get Manga",
    description: "Get data of a manga.",
    url: `/api/manga/manga`,
    params: [
      { name: "id" }
    ],
  },
  {
    name: "Get chapters of manga",
    description:
      "Get all the chapters available of a manga.",
    url: `/api/chapters/getChaptersOfManga`,
    params: [{ name: "id", description: "The id of the manga" }],
  },
  {
    name: "Get chapter",
    description:
      "Get everything from a chapter (title, chapter number, volume, pages | link ...).",
    url: `/api/chapters/chapter`,
    params: [{ name: "id", description: "The id of the chapter" }],
  },
  {
    name: "Search manga",
    description: "Fetch all the mangas that match with a query string.",
    url: `/api/manga/search`,
    params: [
      { name: "query", description: "The string to search for" },
      {
        name: "with_hentai",
        description:
          "(Optional) Include mangas with the hentai tag, defaults to true.",
      },
    ],
  },
  {
    name: "Retrieve saved session",
    description:
      "Use if the session was saved previously (rememberMe) logs in automatically.",
    url: `/api/auth/retrieveSession`,
  },
  {
    name: "Log out",
    description: "Delete the saved session",
    url: `/api/auth/logout`,
  },
];
const getApiRoutes = (currentUrl: string): Route[] => {
  var formattedroutes = [] as Route[];

  routes.forEach((route) => {
    formattedroutes.push({
      name: route.name,
      description: route.description,
      url: `${currentUrl}${route.url}`,
      params: route.params,
    });
  });
  return formattedroutes;
};

router.get("/", (req: Request, res: Response) => {
  const currentUrl = `${req.protocol}://${req.get("host")}`;
  res.json(getApiRoutes(currentUrl));
});

export { router };
