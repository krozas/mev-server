import { asyncHandler } from "@src/middlewares/asyncHandler";
import { NextFunction, Request, Response, Router } from "express";
import * as service from "./tipoVinculos.service";

const MODULO = "tipoVinculos";
const router = Router();

router.post(
  "/",
  asyncHandler(MODULO, async (req: Request, res: Response) => {
    const params: TipoVinculo = req.body;
    return await service.getByFiltros(params);
  })
);

 router.post(
   "/save", 
  asyncHandler(MODULO, async (req: Request, res: Response) => {  
     const params: InputTipoVinculo = req.body;
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
