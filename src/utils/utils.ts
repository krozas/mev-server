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

export async function save(input: any, tabla: string): Promise<number> {

  try { 
    const idActual = Number(input.id);

    if (!idActual || idActual === 0) { 
      const dataToInsert = { ...input };
      delete dataToInsert.id;

      const [insertedId] = await knexMev(tabla).insert(dataToInsert); 
      
      return insertedId;  

    } else { 
      const filasAfectadas = await knexMev(tabla)
        .where("id", idActual)
        .update(input);

      console.log("🚀 ~ save ~ Filas actualizadas:", filasAfectadas); 
      return idActual; 
    }
    
  } catch (err) {
    console.error("❌ Error en utils.save:", err);
    throw err; 
  }
}