import knexMev from "@src/config/knexMev";
import axios from "axios";

export async function makeHttpRequest(
  url: string,
  method: string,
  body: any = {},
  headers: any = {}
) {
  let confHeader = { ...headers, maxBodyLength: 20 * 1024 * 1024 };
  return await axios({
    url: url,
    method: method,
    data: body,
    headers: confHeader,
  })
    .then(async (response) => {
      return response.data;
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });
}

export async function save(input: any, tabla: string) { 
  let newId: number = 0;
  let resp: number[] = [];
  try {
    if (input.id === 0) {      //es un nuevo objeto
      delete input.id;
      resp = await knexMev(tabla).insert(input);
    } else resp = await knexMev(tabla).where("id", input.id).update(input);  
    if (resp.length > 0 || resp!==undefined) {
       newId = Array.isArray(resp) ? resp[0] : resp; 
    }
  } catch (err) {
    console.error(err);
  }
  return newId;
}
