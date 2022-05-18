import { Router } from "express";

import middlewareJWT from "./app/middlewares/middlewareJWT";
import middlewareCache from "./app/middlewares/middlewareCache";
import middlewareSecret from "./app/middlewares/middlewareSecret";

import SearchCepController from "./app/controllers/SearchCepController";

class Routes {
  constructor() {
    this.routes = Router();
    this.createRoutes();
  }

  createRoutes() {
    this.routes.post("/api/v1/generate-token", middlewareSecret);

    this.routes.post("/api/v1/search-cep", middlewareJWT, middlewareCache, SearchCepController.searchCepController
    );
  }
}

export default new Routes().routes;
