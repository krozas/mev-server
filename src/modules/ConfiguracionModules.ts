interface ModuleConfig {
  active: boolean;
  path: string;
  route: string;
  middleware?: any[];
}


export const modules: { [key: string]: ModuleConfig } = {
  serv: {
    active: false,
    path: "./modules/ServerRoute",
    route: "/srv",
    //middleware:
  },
  personas: {
    active: true,
    path: "./modules/personas",
    route: "/persona",
    //middleware:
  },
  configuracion: {
    active: true,
    path: "./modules/configuracion",
    route: "/configuracion",
    middleware: [],
  },
  inmuebles: {
    active: true,
    path: "./modules/expedientes",
    route: "/expediente",
    middleware: [],
  },
  
};

export const defaultLimit = 50;
export const maxLimit = 1000;
