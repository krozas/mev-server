import * as repository from "./expediente.repository";

export const getByFiltros = async (  
  params: FiltrosPersonaExpediente
) => {
  const result = await repository.getByFiltros(params); 
  return result;
};

export const getPersonas = async (  
  params: FiltrosPersonaExpediente
) => {
  const result = await repository.getPersonas(params);  
  return result;
};  

export const save = async ( 
  input: InputExpediente
): Promise<number> => {
   const result = await repository.save(input);
   return result;
};


export const remove = async ( params: any) => {
 // const result = await dbRepository.remove(params, TABLA, reqContext);
 // return result;
};

export const getDataAnioCiudadFuero = async () => {
  const result = await repository.getDataAnioCiudadFuero();
  return result;
};
 