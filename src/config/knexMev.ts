const knexConfig = require('knex')({
    client: 'better-sqlite3', // Passing the string name
    connection: {
        filename: ':memory:',
        options: {
            // Enable foreign key constraints
            foreignKeys: true,
            knexStringcase: true
        }

    },
    useNullAsDefault: true,
    pool: {
        min: 2,
        max: 15,
    },
    acquireConnectionTimeout: 10000
});


export default knexConfig;
