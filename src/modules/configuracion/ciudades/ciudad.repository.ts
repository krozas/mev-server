import knexMev from "@src/config/knexMev";
import * as utils from "@src/utils/utils";
import moment from "moment";

export const getByFiltros = async (params: Ciudad) => {
  let query = knexMev(`ciudades as c`).select().whereNull("deletedAt");
  if (params.id) {
    query.where("c.id", params.id);
  }
  return await query;
};

export const remove = async (params: any) => {
  params.deletedAt = moment(new Date()).format("YYYY-MM-DD");
  const id = await utils.save(params, "ciudades");
  return id;
};

export const save = async (input: InputCiudad): Promise<number> => { 
  const id = await utils.save(input, "ciudades");
  return id;
};
