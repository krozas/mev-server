declare global {
    namespace Express {
      interface Request {
        reqContext: any;
      }
    }
  }
  
  export {};
  