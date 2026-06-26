import knexMev from "@src/config/knexMev";
import * as utils from "@src/utils/utils"; 
import moment from "moment";

export const getByFiltros = async (params: FiltrosPersonaExpediente) => {
  let query = knexMev(`expedientes as e`)
    .join("organismos as o", "e.idOrganismo", "o.id")
    .join("ciudades as c", "c.id", "e.idCiudad")
    .select(
      knexMev.raw([
        "e.*",
        "o.codigo as codigoOrganismo",
        `CONCAT(c.codigo, ' ', UPPER(c.descripcion)) as codigoCiudad`,
        `CONCAT(o.codigo, ' ', e.tipo, ' ', e.numero, '/', e.anio) as claveExpediente`,
      ]),
    )
    .whereNull("e.deletedAt");
  if (params.idOrganismo) {
    query.where("e.idOrganismo", params.idOrganismo);
  }
  if (params.id) {
    query.where("e.id", params.id);
  }
  if (params.anio) {
    query.where("e.anio", "=", params.anio);
  }
  if (params.numero) {
    query.where("e.numero", "=", params.numero);
  }
  if (params.tipo) {
    query.where("e.tipo", "like", `%${params.tipo}%`);
  }
  if (params.caratula) {
    query.where("e.caratula", "like", `%${params.caratula}%`);
  }

  return await query;
};

export const getPersonas = async (params: FiltrosPersonaExpediente) => { 
  let query = knexMev(`personas_expedientes as pe`)
    .join("personas as p", "p.id", "pe.idPersona")
    .join("expedientes as e", "e.id", "pe.idExpediente")
    .join("organismos as o", "e.idOrganismo", "o.id")
    .join("tiposVinculos as t", "t.id", "pe.idVinculo")
    .select(
      knexMev.raw([
        "pe.*",
        "p.apellidos",
        "p.nombres",
        "p.cuit",
        `t.descripcion as tipoVinculo`,
        `e.caratula`,
      `CONCAT(o.codigo, ' ', e.tipo, ' ', e.numero, '/', e.anio) as claveExpediente`,
      ]),
    )

    .whereNull("pe.deletedAt");
  if (params.idExpediente) {
    query.where("pe.idExpediente", params.idExpediente);
  }
  if (params.idPersona) {
    query.where("pe.idPersona", params.idPersona);
  }
  return await query;
};
 
 

export const save = async (input: InputExpediente): Promise<number> => { 
  const { personas, ...expedienteData } = input as any;
  
  // 1. Guardamos/Actualizamos el expediente principal
  let idExpediente = await utils.save(expedienteData, "expedientes");

  if (personas && Array.isArray(personas)) {
    const fechaHoy = moment().format("YYYY-MM-DD");
    const relacionesExistentes = await knexMev("personas_expedientes")
      .where({ idExpediente });
    const idsPersonasInput = new Set(personas.map(p => p.idPersona));
    
    const relacionesAQuitar = relacionesExistentes.filter(
      r => !idsPersonasInput.has(r.idPersona) && r.deletedAt === null
    );

    for (const rel of relacionesAQuitar) {
      await knexMev("personas_expedientes")
        .where({ id: rel.id })
        .update({ deletedAt: fechaHoy });
    }
 
    for (const pInput of personas) { 
      pInput.id = pInput.id ?? 0;
      pInput.idExpediente = pInput.idExpediente ?? idExpediente; 
        const pe = await utils.save(pInput, "personas_expedientes"); 
    }
  }
   
  return idExpediente;
};

export const getDataAnioCiudadFuero = async () => {
  let query = knexMev(`expedientes as i`)
    .join("organismos as o", "o.id", "i.idOrganismo")
    .join("fueros as f", "f.id", "o.idFuero")
    .join("ciudades as c", "c.id", "o.idCiudad")
    .select(
      knexMev.raw([
        "i.anio as year",
        `UPPER(f.descripcion) as codigoFuero`,
        `UPPER(c.descripcion) as codigoCiudad`,
      ]),
    )
    .count({ count: "*" })
    .groupBy("year", "codigoCiudad", "codigoFuero");

  return await query;
};

export const esPosibleRegistrar = async (params: Expediente) => {
  const titulares = await getPersonas({
    idExpediente: params.id,
  });
  let totalPorcentaje = 0;
  let esTitular = false;
  if (titulares.length > 0) {
    let i = 0;
    while (i < titulares.length && !esTitular) {
      totalPorcentaje += titulares[i].porcentajeTitularidad;
      const listaExpedientes = await getByFiltros({
        idExpediente: titulares[i].idPersona,
      });

      i++;
    }
  }
  const exito = totalPorcentaje === 1 && !esTitular;
  let mensaje = " El expediente fue registrado.";
  if (!exito) {
    mensaje = esTitular
      ? "Alguno de los titulares del expediente ha registrado otro expediente como bien de familia."
      : " El expediente no ha sido registrado al 100%";
  }

  return { exito: exito, mensaje: mensaje };
};

export const remove = async (params: any) => {
  params.deletedAt = moment(new Date()).format("YYYY-MM-DD");
  const id = await utils.save(params, "expedientes");
  return id;
};
