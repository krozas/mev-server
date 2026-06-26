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
      table.string("caratula").notNullable();
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

    // console.log('Table "personas" created successfully.');
    // Insert data
    await knexMev("personas").insert([
      {
        nombres: "Alice",
        apellidos: "Garcia",
        email: "alice@example.com",
        nroDoc: "123456789",
        cuit: "111234567891",
        id: 1,
      },
      {
        nombres: "Bob",
        apellidos: "Borda",
        email: "bob@example.com",
        nroDoc: "987654321",
        cuit: "229876543212",
        id: 2,
      },
      {
        nombres: "Mari",
        apellidos: "Perez",
        email: "mar@example.com",
        nroDoc: "14779598",
        cuit: "11147795981",
        id: 3,
      },
      {
        nombres: "Jose",
        apellidos: "Escobar",
        email: "jose@example.com",
        nroDoc: "25756998",
        cuit: "22257569982",
        id: 4,
      },
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
      {
        createdAt: moment(new Date("2023-12-02")).format("YYYY-MM-DD"),
        tipo: "EXD",
        idOrganismo:1,
        caratula: "Caratula 1",
        numero: 15821,
        anio: 2023,
        idCiudad: 1,
      //  deletedAt: null,
      },
      {
        createdAt: moment(new Date("2024-09-02")).format("YYYY-MM-DD"),
        tipo: "EXD", 
        idOrganismo:1,
        caratula: "Caratula 2",
        numero: 2265,
        anio: 2026,
        idCiudad: 1,
      },
      {
        createdAt: moment(new Date("2024-10-02")).format("YYYY-MM-DD"),
        tipo: "EXP", 
        idOrganismo:2,
        numero: 15698,
        caratula: "Caratula 2",
        anio: 2026,
        idCiudad: 2,
      },
      {
        createdAt: moment(new Date()).format("YYYY-MM-DD"),
        tipo: "EXD", 
        idOrganismo:3,
        numero: 4,
        anio: 2023,
        caratula: "Caratula 3",
        idCiudad: 2,
      },
    ]);

    await knexMev("tiposVinculos").insert([
      { id: 1, descripcion: "Actor" },
      { id: 2, descripcion: "Demandado" },
      { id: 3, descripcion: "Condenado" },
      { id: 4, descripcion: "Víctima" },
    ]);
    await knexMev("personas_expedientes").insert([
      {id:1, idPersona: 1, idExpediente: 1, idVinculo: 1 },
      {id:2, idPersona: 2, idExpediente: 1 , idVinculo: 2 },
      {id:3, idPersona: 1, idExpediente: 2, idVinculo: 1 },
      {id:4, idPersona: 4, idExpediente: 2 , idVinculo: 2 }, 
    ]);

    const expedientes: Expediente[] = await knexMev("expedientes").select("*");
    console.log("expedientes:", expedientes);
    const personas_expedientes: PersonaExpediente[] = await knexMev("personas_expedientes").select("*");
    console.log("personas_expedientes:", personas_expedientes);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Destroy the Knex connection pool when done
    //await knexMev.destroy();
    console.log("Knex connection finally.");
  }
}

export default setupAndUseDatabase;
