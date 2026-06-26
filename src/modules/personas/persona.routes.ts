import { asyncHandler } from "@src/middlewares/asyncHandler";
import { NextFunction, Request, Response, Router } from "express";
import * as service from "./persona.service";
const router = Router();

const MODULO = "persona";

router.post(
  "/",
  asyncHandler(MODULO, async (req: Request, res: Response) => { 
    const params: FiltrosPersona = req.body;
    return await service.getByFiltros(params);
  })
);

 router.post(
   "/save", 
  asyncHandler(MODULO, async (req: Request, res: Response) => {  
     const params: InputPersona = req.body;
     return await service.save(params);
   })
 );
 
router.post(
  "/delete",
  asyncHandler(MODULO, async (req: Request, res: Response, next: NextFunction) => {
    const params: any = req.body;
    return await service.remove(params);
  })
);

module.exports = router;