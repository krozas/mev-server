import { Router } from "express";

import fueroRouter from "./fueros/fuero.routes";
import ciudadRouter from "./ciudades/ciudad.routes"; 
import organismoRouter from "./organismos/organismo.routes";
import tipoVinculoRouter from "./tiposVinculos/tipoVinculos.routes";
const router = Router();
 router.use("/fueros", fueroRouter);
 router.use("/ciudades", ciudadRouter);  
 router.use("/organismos", organismoRouter);
 router.use("/tiposVinculos", tipoVinculoRouter);

module.exports = router;
