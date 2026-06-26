declare type Expediente = {
  id?: number;
  codigoOrganismo?: string;
  idOrganismo?: number;
  tipo?: string;
  idFuero?: number;
  idCiudad?: number; 
  numero?: number;
  anio?: number;
  caratula?: string;
}; 
 
 
declare type FiltrosPersonaExpediente = Expediente &  
{ idExpediente?: number; idPersona?: number;  
};

declare type InputExpediente = Expediente & 
{ idExpediente?: number; idPersona?: number;  codigoFuero?: string; codigoCiudad?: string;
  personas: PersonaExpediente[];
 };