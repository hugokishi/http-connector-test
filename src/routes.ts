import { Request, Response, Router } from "express";

class Routes {
  readonly router: Router;

  constructor() {
    this.router = Router();

    this.healthRoutes();
    this.mountRoutes();
  }

  healthRoutes() {
    this.router.get("/health", async (_, res: Response) => {
      return res.status(200).json({ message: "Server is running!" });
    });
  }

  mountRoutes() {
    this.router.get("/steps/first", async (_, res: Response) => {
      return res
        .status(200)
        .json({ token: "authorization-token", bodyValidation: "random-name" });
    });
    this.router.post("/steps/second", async (req: Request, res: Response) => {
      const { authorization } = req.headers;
      const { bodyValidation } = req.body;
      if (
        authorization !== "authorization-token" ||
        bodyValidation !== "random-name"
      ) {
        return res
          .status(400)
          .json({ message: "Authorization token is not provided" });
      }
      return res.status(200).json({ uid: "my-uid" });
    });
    this.router.post(
      "/steps/third/:uid",
      async (req: Request, res: Response) => {
        const uid = req.params.uid;
        if (uid !== "my-uid") {
          return res.status(400).json({ message: "Invalid UID" });
        }
        return res.status(200).json({ message: "Finished http flow!" });
      }
    );
  }
}

export default new Routes().router;
