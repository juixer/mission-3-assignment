import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/route";
import notFound from "./app/middleware/notFound";
import globalErrHandler from "./app/middleware/globalErrHandler";
import cookieParser from "cookie-parser";

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// application routes
app.use("/api", router);

// default route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// global error handler
app.use(globalErrHandler);

// not found route handler
app.use(notFound);

export default app;
