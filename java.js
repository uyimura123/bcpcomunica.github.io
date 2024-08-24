const sql = require('mssql');

sql.connect(config).then(pool => {
    console.log('Conexión exitosa');
}).catch(err => {
    console.error('Error de conexión:', err);
});
