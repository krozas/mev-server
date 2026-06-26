import knexMev from "@src/config/knexMev";
import moment from "moment";
import * as utils from "@src/utils/utils";

export const getByFiltros = async (params: FiltrosPersonaExpediente) => { 
  let query = knexMev(`fueros as d`)
    .select("d.*", "d.id as idFuero")
    .whereNull("deletedAt");

  if (params.id) {
    query.where("d.id", params.id);
  }

  return await query;
};

export const remove = async (params: any) => {
  params.deletedAt = moment(new Date()).format("YYYY-MM-DD");
  const id = await utils.save(params, "fueros");
  return id;
};

 

export const save = async (input: InputFuero): Promise<number> => {
  console.log("🚀 ~ save ~ input:", input);
  const id = await utils.save(input, "fueros");
  return id;
};
