import express, { Request, Response, Router } from "express";
import { client, sessionPath } from "../";
import fs from "fs";

const router: Router = express.Router();

interface authedResponse {
  sessionId: string;
  sessionExp: Date;
  persistentId?: string;
}

router.get(
  "/login",
  (req: Request, res: Response) => {
    let username = req.query.username as string;
    let password = req.query.password as string;
    let rememberMe = req.query.rememberMe as string;

    const saveSession = rememberMe === "true" ? true : false;

    client.agent
      .login(username, password, saveSession)
      .then(() => {
        let session = {
          sessionId: client.agent.sessionId,
          sessionExp: client.agent.sessionExpiration,
        } as authedResponse;

        //It gets saved to the file in /auth/session
        if (saveSession) {
          session.persistentId = client.agent.persistentId;
          client.agent
            .saveSession(sessionPath)
            .then(() => {
              console.log("session was saved to: " + sessionPath);
              res.json(session);
            })
            .catch((err) => {
              throw err;
            });
        }
      })
      .catch((err) => {
        res.json({
            err: err
        });
      });
  }
);

router.get("/retrieveSession", (req: Request, res: Response) => {
  client.agent
    .loginWithSession(sessionPath)
    .then(() => {
      let session = {
        sessionId: client.agent.sessionId,
        sessionExp: client.agent.sessionExpiration,
        persistentId: client.agent.persistentId,
      } as authedResponse;

      res.json(session);
    })
    .catch((err) => {
      res.json({
          err: err
      });
    });
});

router.get("/logout", (req: Request, res: Response) => {
  client.agent
    .logout()
    .then(() => {
      if (fs.existsSync(sessionPath)) fs.unlinkSync(sessionPath);
      res.json({ deleted: "OK" });
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

export { router };
