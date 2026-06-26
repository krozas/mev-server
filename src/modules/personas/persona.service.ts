import * as repository from "./persona.repository";

export const getByFiltros = async (  
  params: FiltrosPersona
) => {
  const result = await repository.getByFiltros(params);
  return result;
};

export const save = async ( 
  input: InputPersona
): Promise<number> => {
   const result = await repository.save(input);
   return result;
};
export const remove = async ( params: any) => {
 const result = await repository.remove(params);
 return result;
};

