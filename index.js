import serverless from "serverless-http";
import express from "express";
import { RoutesHandler } from "./src/handler/routes-handler.js";
import { signInRoute } from "./src/app/routes/sign-in.route.js";

const app = express();
app.use(express.json());

// router list
const routes = [signInRoute];

// apply routes
new RoutesHandler(app, routes).apply();

export const handler = serverless(app);
