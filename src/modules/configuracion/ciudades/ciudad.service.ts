import * as repository from "./ciudad.repository";

export const getByFiltros = async (  
  params: Ciudad
) => {
  const result = await repository.getByFiltros(params);
  return result;
};

 
 export const save = async ( 
   input: InputCiudad
 ): Promise<number> => {
    const result = await repository.save(input);
    return result;
 };
 export const remove = async ( params: any) => {
  const result = await repository.remove(params);
  return result;
 };