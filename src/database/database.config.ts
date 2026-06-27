import moment from "moment";
import dbMev from "../config/knexMev";

const knexMev = dbMev;
async function setupAndUseDatabase() {
  try {
    // Create tables
    interface Persona {
      id: number;
      cuit: string;
      apellidos: string;
      nombres: string;
      email?: string;
      nroDoc?: string;
    }
    interface Organismo {
      id: number;
      codigo: string;
      nombre: string;
      caratula: string;
      idCiudad: number;
      idFuero: number;
    }
    interface Ciudad {
      id: number;
      codigo: string;
      descripcion: string;
    }
    interface Fuero {
      id: number;
      codigo: string;
      descripcion: string;
    }
    interface Expediente {
      id: number;
      codigoOrganismo: string;
      tipo: string;
      numero: number;
      caratula: string;
      idCiudad: number;
      anio: number;
    }
    interface PersonaExpediente {
      id: number;
      idPersona: number;
      idExpediente: number;
      idVinculo: number;
    }
    interface TipoVinculo {
      id: number;
      nombre: string;
    }

    await knexMev.schema.createTable("ciudades", (table) => {
      table.increments("id").primary().notNullable();
      table.string("codigo").unique().notNullable();
      table.string("descripcion").notNullable();
      table
        .date("createdAt")
        .notNullable()
        .defaultTo(moment(new Date()).format("YYYY-MM-DD"));
      table.string("updatedAt");
      table.string("deletedAt");
    });
    await knexMev.schema.createTable("fueros", (table) => {
      table.increments("id").primary().notNullable();
      table.string("codigo").unique().notNullable();
      table.string("descripcion").notNullable();
      table
        .date("createdAt")
        .notNullable()
        .defaultTo(moment(new Date()).format("YYYY-MM-DD"));
      table.string("updatedAt");
      table.string("deletedAt");
    });
    await knexMev.schema.createTable("tiposVinculos", (table) => {
      table.increments("id").primary().notNullable(); 
      table.string("descripcion").notNullable();
      table
        .date("createdAt")
        .notNullable()
        .defaultTo(moment(new Date()).format("YYYY-MM-DD"));
      table.string("updatedAt");
      table.string("deletedAt");
    });
    await knexMev.schema.createTable("organismos", (table) => {
      table.increments("id").primary();
      table.string("codigo").unique().notNullable();
      table.string("nombre").notNullable();
      table.string("caratula");
      table
        .integer("idCiudad")
        .notNullable()
        .references("id")
        .inTable("ciudades");
      table.integer("idFuero").notNullable().references("id").inTable("fueros");
      table
        .date("createdAt")
        .notNullable()
        .defaultTo(moment(new Date()).format("YYYY-MM-DD"));
      table.string("updatedAt");
      table.string("deletedAt");
    });
    await knexMev.schema.createTable("personas", (table) => {
      table.increments("id").primary().notNullable();
      table.string("nombres");
      table.string("apellidos");
      table.string("email");
      table.string("direccion");
      table.string("telefono");
      table.string("nroDoc").unique();
      table.string("cuit").unique().notNullable();
      table
        .date("createdAt")
        .notNullable()
        .defaultTo(moment(new Date()).format("YYYY-MM-DD"));
      table.string("updatedAt");
      table.string("deletedAt");
    });

    await knexMev.schema.createTable("expedientes", (table) => {
      table.increments("id").primary().notNullable();
      table
        .bigint("idOrganismo")
        .notNullable()
        .references("id")
        .inTable("organismos");
      table.string("tipo").notNullable();
      table.bigint("numero").notNullable();
      table.bigint("anio").notNullable();
      table.string("caratula").notNullable();
      table
        .bigint("idCiudad")
        .notNullable()
        .references("id")
        .inTable("ciudades");

      table
        .date("createdAt")
        .notNullable()
        .defaultTo(moment(new Date()).format("YYYY-MM-DD"));
      table.string("updatedAt");
      table.string("deletedAt");
    });
    await knexMev.schema.createTable("personas_expedientes", (table) => {
      table.increments("id").primary().notNullable();
      table
        .bigint("idPersona")
        .notNullable()
        .references("id")
        .inTable("personas");
      table.bigint("idVinculo").notNullable().references("id").inTable("tiposVinculos");
      table
        .bigint("idExpediente")
        .notNullable()
        .references("id")
        .inTable("expedientes");
      table
        .date("createdAt")
        .notNullable()
        .defaultTo(moment(new Date()).format("YYYY-MM-DD"));
      table.string("updatedAt");
      table.string("deletedAt");
    });

await knexMev("personas").insert([
      // Originales (IDs 1 al 4)
      {
        id: 1,
        nombres: "Alice",
        apellidos: "Garcia",
        email: "alice@example.com",
        direccion: "Av. Argentina 150, Neuquén",
        telefono: "2994455667",
        nroDoc: "123456789",
        cuit: "111234567891",
      },
      {
        id: 2,
        nombres: "Bob",
        apellidos: "Borda",
        email: "bob@example.com",
        direccion: "San Martín 450, Zapala",
        telefono: "2942421122",
        nroDoc: "987654321",
        cuit: "229876543212",
      },
      {
        id: 3,
        nombres: "Mari",
        apellidos: "Perez",
        email: "mar@example.com",
        direccion: "Chile 80, Junín de los Andes",
        telefono: "2972491515",
        nroDoc: "14779598",
        cuit: "11147795981",
      },
      {
        id: 4,
        nombres: "Jose",
        apellidos: "Escobar",
        email: "jose@example.com",
        direccion: "Olascoaga 900, Neuquén",
        telefono: "2995123456",
        nroDoc: "25756998",
        cuit: "22257569982",
      },
      // Nuevas Personas para completar las 10 (IDs 5 al 10)
      {
        id: 5,
        nombres: "Carlos Javier",
        apellidos: "Mendoza",
        email: "carlos.mendoza@example.com",
        direccion: "Rivadavia 340, Zapala",
        telefono: "2942438899",
        nroDoc: "30456123",
        cuit: "20304561238",
      },
      {
        id: 6,
        nombres: "Flavia Adriana",
        apellidos: "Moya Gonzalez",
        email: "flavia.moya@example.com",
        direccion: "Belgrano 1250, Neuquén",
        telefono: "2996778811",
        nroDoc: "25329480",
        cuit: "27253294804",
      },
      {
        id: 7,
        nombres: "Sandra Elizabeth",
        apellidos: "Lopez",
        email: "sandra.lopez@example.com",
        direccion: "Antártida Argentina 45, Plottier",
        telefono: "2994112233",
        nroDoc: "22404697",
        cuit: "27224046971",
      },
      {
        id: 8,
        nombres: "Gustavo Ariel",
        apellidos: "Vargas",
        email: "gustavo.vargas@example.com",
        direccion: "Roca 210, Junín de los Andes",
        telefono: "2972412233",
        nroDoc: "31086480",
        cuit: "20310864804",
      },
      {
        id: 9,
        nombres: "Antonio Benjamin",
        apellidos: "Amengual",
        email: "antonio.amengual@example.com",
        direccion: "Alderete 550, Neuquén",
        telefono: "2995889900",
        nroDoc: "21526718",
        cuit: "20215267181",
      },
      {
        id: 10,
        nombres: "Maria Eugenia",
        apellidos: "Chianea",
        email: "maria.chianea@example.com",
        direccion: "Mitre 120, Zapala",
        telefono: "2942485544",
        nroDoc: "25725861",
        cuit: "27257258616",
      }
    ]);

    await knexMev("ciudades").insert([
      { id: 1, codigo: "NQ", descripcion: "Neuquén" },
      { id: 2, codigo: "ZA", descripcion: "Zapala" },
      { id: 3, codigo: "JU", descripcion: "Junín de los Andes" },
    ]);
    await knexMev("fueros").insert([
      { id: 1, codigo: "EJ", descripcion: "Ejecutivos" },
      { id: 2, codigo: "CI", descripcion: "Civil" },
      { id: 3, codigo: "LA", descripcion: "Laboral" },
      { id: 4, codigo: "FA", descripcion: "Familia" },
    ]);
    //JNQFA, JZACI JJUEJ
    await knexMev("organismos").insert([
      {
        id: 1,
        codigo: "JNQFA",
        nombre: "nombre 1",
        caratula: "Caratula 1",
        idCiudad: 1,
        idFuero: 4,
      },
      {
        id: 2,
        codigo: "JZACI",
        nombre: "nombre 2",
        caratula: "Caratula 2",
        idCiudad: 2,
        idFuero: 2,
      },
      {
        id: 3,
        codigo: "JJUEJ",
        nombre: "nombre 3",
        caratula: "Caratula 3",
        idCiudad: 3,
        idFuero: 1,
      },
    ]);

   await knexMev("expedientes").insert([
      // Expedientes Originales
      {
        id: 1,
        createdAt: moment(new Date("2023-12-02")).format("YYYY-MM-DD"),
        tipo: "EXD",
        idOrganismo: 1,
        caratula: "GARCIA ALICE C/ BORDA BOB S/ ALIMENTOS",
        numero: 15821,
        anio: 2023,
        idCiudad: 1,
      },
      {
        id: 2,
        createdAt: moment(new Date("2024-09-02")).format("YYYY-MM-DD"),
        tipo: "EXD", 
        idOrganismo: 1,
        caratula: "GARCIA ALICE C/ ESCOBAR JOSE S/ REGIMEN DE COMUNICACION",
        numero: 2265,
        anio: 2026,
        idCiudad: 1,
      },
      {
        id: 3,
        createdAt: moment(new Date("2024-10-02")).format("YYYY-MM-DD"),
        tipo: "EXP", 
        idOrganismo: 2,
        numero: 15698,
        caratula: "MARI PEREZ C/ PROVINCIA S/ DAÑOS Y PERJUICIOS",
        anio: 2026,
        idCiudad: 2,
      },
      {
        id: 4,
        createdAt: moment(new Date()).format("YYYY-MM-DD"),
        tipo: "EXD", 
        idOrganismo: 3,
        numero: 4,
        anio: 2023,
        caratula: "ALICE GARCIA C/ BANCO S/ COBRO DE PESOS",
        idCiudad: 2,
      },
      // Nuevos Expedientes para completar los 10
      {
        id: 5,
        createdAt: moment(new Date("2025-01-15")).format("YYYY-MM-DD"),
        tipo: "EXP",
        idOrganismo: 1,
        numero: 3045,
        anio: 2025,
        caratula: "PEREZ MARI C/ BORDA BOB S/ DIVORCIO VINCULAR",
        idCiudad: 1,
      },
      {
        id: 6,
        createdAt: moment(new Date("2025-03-22")).format("YYYY-MM-DD"),
        tipo: "EXD",
        idOrganismo: 2,
        numero: 884,
        anio: 2025,
        caratula: "ESCOBAR JOSE C/ GARCIA ALICE S/ DESALOJO",
        idCiudad: 2,
      },
      {
        id: 7,
        createdAt: moment(new Date("2026-02-10")).format("YYYY-MM-DD"),
        tipo: "EXP",
        idOrganismo: 3,
        numero: 12055,
        anio: 2026,
        caratula: "PEREZ MARI C/ ESCOBAR JOSE S/ EJECUCION DE ALQUILERES",
        idCiudad: 3,
      },
      {
        id: 8,
        createdAt: moment(new Date("2026-04-05")).format("YYYY-MM-DD"),
        tipo: "EXD",
        idOrganismo: 1,
        numero: 432,
        anio: 2026,
        caratula: "BORDA BOB C/ MINISTERIO S/ AMPARO",
        idCiudad: 1,
      },
      {
        id: 9,
        createdAt: moment(new Date("2026-05-18")).format("YYYY-MM-DD"),
        tipo: "EXP",
        idOrganismo: 2,
        numero: 7654,
        anio: 2026,
        caratula: "GARCIA ALICE S/ MEDIDA CAUTELAR",
        idCiudad: 2,
      },
      {
        id: 10,
        createdAt: moment(new Date()).format("YYYY-MM-DD"),
        tipo: "EXD",
        idOrganismo: 3,
        numero: 901,
        anio: 2026,
        caratula: "ESCOBAR JOSE C/ BORDA BOB S/ INCUMPLIMIENTO DE CONTRATO",
        idCiudad: 3,
      }
    ]);

    await knexMev("tiposVinculos").insert([
      { id: 1, descripcion: "Actor" },
      { id: 2, descripcion: "Demandado" },
      { id: 3, descripcion: "Condenado" },
      { id: 4, descripcion: "Víctima" },
    ]);
    await knexMev("personas_expedientes").insert([
      // Originales (Expedientes 1 y 2)
      { id: 1, idPersona: 1, idExpediente: 1, idVinculo: 1 }, // Alice (Actor)
      { id: 2, idPersona: 2, idExpediente: 1, idVinculo: 2 }, // Bob (Demandado)
      { id: 3, idPersona: 1, idExpediente: 2, idVinculo: 1 }, // Alice (Actor)
      { id: 4, idPersona: 4, idExpediente: 2, idVinculo: 2 }, // Jose (Demandado)
      
      // Vinculaciones Expediente 3
      { id: 5, idPersona: 3, idExpediente: 3, idVinculo: 1 }, // Mari (Actor)
      { id: 6, idPersona: 2, idExpediente: 3, idVinculo: 2 }, // Bob (Demandado)

      // Vinculaciones Expediente 4
      { id: 7, idPersona: 1, idExpediente: 4, idVinculo: 1 }, // Alice (Actor)

      // Vinculaciones Expediente 5
      { id: 8, idPersona: 3, idExpediente: 5, idVinculo: 1 }, // Mari (Actor)
      { id: 9, idPersona: 2, idExpediente: 5, idVinculo: 2 }, // Bob (Demandado)

      // Vinculaciones Expediente 6
      { id: 10, idPersona: 4, idExpediente: 6, idVinculo: 1 }, // Jose (Actor)
      { id: 11, idPersona: 1, idExpediente: 6, idVinculo: 2 }, // Alice (Demandado)

      // Vinculaciones Expediente 7
      { id: 12, idPersona: 3, idExpediente: 7, idVinculo: 1 }, // Mari (Actor)
      { id: 13, idPersona: 4, idExpediente: 7, idVinculo: 2 }, // Jose (Demandado)

      // Vinculaciones Expediente 8
      { id: 14, idPersona: 2, idExpediente: 8, idVinculo: 1 }, // Bob (Actor)
      { id: 15, idPersona: 3, idExpediente: 8, idVinculo: 4 }, // Mari (Víctima)

      // Vinculaciones Expediente 9
      { id: 16, idPersona: 1, idExpediente: 9, idVinculo: 1 }, // Alice (Actor)

      // Vinculaciones Expediente 10
      { id: 17, idPersona: 4, idExpediente: 10, idVinculo: 1 }, // Jose (Actor)
      { id: 18, idPersona: 2, idExpediente: 10, idVinculo: 2 }, // Bob (Demandado)
    ]);

 /*   const expedientes: Expediente[] = await knexMev("expedientes").select("*");
    console.log("expedientes:", expedientes);
    const personas_expedientes: PersonaExpediente[] = await knexMev("personas_expedientes").select("*");
    console.log("personas_expedientes:", personas_expedientes);*/
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Destroy the Knex connection pool when done
    //await knexMev.destroy();
    console.log("Knex connection finally.");
  }
}

export default setupAndUseDatabase;
