import { asyncHandler } from "@src/middlewares/asyncHandler";
import { NextFunction, Request, Response, Router } from "express";
import * as service from "./fuero.service";
const router = Router();

const MODULO = "fueros";

router.post(
  "/",
  asyncHandler(MODULO, async (req: Request, res: Response) => { 
    const params: any = req.body;
    return await service.getByFiltros(params);
  })
);
 
 router.post(
   "/save", 
  asyncHandler(MODULO, async (req: Request, res: Response) => {  
     const params: InputFuero = req.body;
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


export default router;