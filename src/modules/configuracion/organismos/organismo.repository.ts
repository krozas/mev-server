import knexMev from "@src/config/knexMev";
import moment from "moment";
import * as utils from "@src/utils/utils";
import * as fueros from "../fueros/fuero.service";
import * as ciudades from "../ciudades/ciudad.service"

export const getByFiltros = async (params: FiltrosPersonaExpediente) => { 
  let query = knexMev(`organismos as d`)
    .select("d.*", "d.id as idOrganismo")
    .whereNull("deletedAt");

  if (params.id) {
    query.where("d.id", params.id);
  }

  return await query;
};

export const remove = async (params: any) => {
  params.deletedAt = moment(new Date()).format("YYYY-MM-DD");
  const id = await utils.save(params, "organismos");
  return id;
};

 

export const save = async (input: InputOrganismo): Promise<number> => { 
  const unFuero = await fueros.getByFiltros({id: input.idFuero});  
  const unaCiudad =await ciudades.getByFiltros({id: input.idCiudad});
  
  input.codigo = "J"+unaCiudad[0].codigo+unFuero[0].codigo;
  const id = await utils.save(input, "organismos");
  return id;
};
