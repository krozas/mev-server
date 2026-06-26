import knexMev from "@src/config/knexMev"; 
import * as utils from "@src/utils/utils";
import moment from "moment";

export const getByFiltros = async (
  params: FiltrosPersona
) => { 
  let query = knexMev(`personas as pe`)
    .select()
    .whereNull("pe.deletedAt");
  if (params.cuit) {
    query.where("pe.cuit","like", `%${params.cuit}%`);
  } 
  if (params.id) {
    query.where("pe.id", params.id);
  }
  if (params.nroDoc) {
    query.where("pe.nroDoc", params.nroDoc);
  }
  if (params.apellidos) {
    query.where("pe.apellidos", "like", `%${params.apellidos}%`);
  }
  if (params.nombres) {
    query.where("pe.nombres","like", `%${params.nombres}%`);
  }
   return await query;
};

export const save = async (input: InputPersona): Promise<number> => {  
  let res: any;
  const idExpediente = input.idExpediente; 
  delete input.idExpediente; 
  const id = await utils.save(input, 'personas'); 
  /*if (idExpediente && id) {
    res =  await utils.save({id:0, idPersona: id, idExpediente: idExpediente }, 'personas_expedientes');
  }*/
  return res;
};

export const remove = async (params: any) => { 
  params.deletedAt = moment(new Date()).format("YYYY-MM-DD");  
  const id = await utils.save(params, 'personas'); 
  return id;
};