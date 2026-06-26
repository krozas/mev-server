import knexMev from "@src/config/knexMev";
import * as utils from "@src/utils/utils";
import moment from "moment";

export const getByFiltros = async (params: TipoVinculo) => {
  let query = knexMev(`tiposVinculos as c`).select().whereNull("deletedAt");

  if (params.id) {
    query.where("pe.id", params.id);
  }
  return await query;
};

export const remove = async (params: any) => {
  params.deletedAt = moment(new Date()).format("YYYY-MM-DD");
  const id = await utils.save(params, "tiposVinculos");
  return id;
};

export const save = async (input: InputTipoVinculo): Promise<number> => { 
  const id = await utils.save(input, "tiposVinculos");
  return id;
};
