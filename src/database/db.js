const Database = require('sqlite-async');

function execute(db){
    //console.log('entrei!')
    //com o uso de template literals ou template strings é possível fazer quebras de linha e passar variáveis
    return db.exec(`
     CREATE TABLE IF NOT EXISTS orphanages(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lat TEXT,
        lng TEXT,
        name TEXT,
        about TEXT, 
        whatsapp TEXT, 
        images TEXT,
        instructions TEXT, 
        opening_hours TEXT, 
        open_on_weekends TEXT
    );
    `) 
}

//para o banco abrir o diretório local e inserir na pasta database um arquivo database.sqlite
module.exports = Database.open(__dirname + '/database.sqlite').then(execute) //vai exportar o db