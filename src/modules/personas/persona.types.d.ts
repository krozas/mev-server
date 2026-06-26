declare type Persona = {
  id?: number;
  nombres?: string;
  apellidos?: string;
  tipoDoc?: string;
  nroDoc?: string;
  telefono?: string;
  calle?: string;
  numero?: string;
  departamento?: string;
  piso?: string;
  idCiudad?: number;
  idProvincia?: number;
  ciudadPersona?: string;
  provinciaPersona?: string;
  sexo?: string;
  email?: string;
  cuit?: string;
};

declare type PersonaTitular = Persona & {
  idProvincia?: number;
  identificacion?: string;
};
 
declare type FiltrosPersona = Persona;

declare type InputPersona = Persona & { idExpediente?: number; porcentajeTitularidad?: number; };