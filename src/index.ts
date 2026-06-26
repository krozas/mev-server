import * as config from "@src/modules/ConfiguracionModules";
import swaggerSetup from "@src/Docs/swagget";
import { json } from "body-parser";
import cors from "cors";
import express, { Application } from "express";
import moment from "moment";
import swaggerUi from "swagger-ui-express";
//import serverRoutes from "./modules/ServerRoute/server.routes";
import requireDir from "require-dir";
import dbMev from "./config/knexMev";
import setupAndUseDatabase from "./database/database.config";


const app = express();
app.use(express.json()); //middleware que transforma la req.body a un json

class ServerMev {
  private readonly app: Application;
  private readonly port: string;
  private readonly envRoutes: string;
  private readonly knexDB: any;
  constructor() {
    this.app = express();
    this.port =  "9100";
    this.envRoutes =   "routes.ts";
    this.knexDB = dbMev;
    //incio los Middlewares
    this.middlewares();
    //cargar rutas
    this.routes();

  }

  async listen() {

    await setupAndUseDatabase().then(() => {
      console.log("Base de datos MEV inicializada correctamente", {
        ServerName: "EXPRESS - MEV - SERVER",
        tiempo: moment().format("L-LTS"),
      });
    }).catch((error) => {
      console.log("Error al inicializar la base de datos MEV", {
        ServerName: "EXPRESS - MEV - SERVER",
        tiempo: moment().format("L-LTS"),
      });
      console.error(error);
    }).finally(() => {
      this.app.listen(this.port, () => {
        console.log(`Info message - Servidor Express funcionando, puerto:${this.port}`, {
          ServerName: "EXPRESS - MEV - SERVER",
          port: this.port,
          tiempo: moment().format("L-LTS"),
        }); 
      });
    });
  }

  middlewares() {

    this.app.set("trust proxy", true);
    //cors
    this.app.use(cors());
    // body parser middleware
    app.use(json());
    this.app.use(express.urlencoded({ limit: "50mb", extended: true }));
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerSetup));
    //this.app.use("/api/v1/server", serverRoutes);
    this.app.all(
      "*",      
      (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, Content-Type, Authorization, X-Requested-With,Accept "
        );
        res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS");
 
        if ("OPTIONS" === req.method) {
          res.header("Access-Control-Max-Age", "1728000");
          res.sendStatus(200);
        } else {
          next();
        }
      }
    );
  }

  // lista de rutas
  routes() {
    let pathRoutes = this.envRoutes;
    const regex = new RegExp(`.*${pathRoutes}.*`);
    for (const m in config.modules) {
      if (config.modules[m].active) {
        const routes = requireDir(config.modules[m].path, {
          filter: function (fullPath: string) {
            return new RegExp(regex).exec(fullPath);
          },
        });

        for (const route in routes) {
          console.log(route);
          if (config.modules[m].middleware) {
            this.app.use(
              "/api" + config.modules[m].route,
              config.modules[m].middleware,
              routes[route]
            );
          } else {
            this.app.use("/api" + config.modules[m].route, routes[route]);
          }
        }
      }
    }

  }

}

export default ServerMev;
