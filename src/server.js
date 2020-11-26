//import dependencies and packages - variaveis recebendo suas funções
//const { response } = require('express');
const express = require('express'); 
//const { request } = require('http');
const path = require('path');
//pega o objeto que foi exportado em pages.js
const pages = require('./pages.js')

//initiate express
const server = express() 
server
//utilizar body da requisição
.use(express.urlencoded({extended:true}))
//utilizando arquivos estáticos
.use(express.static('public'))

//configurar template engine
.set('views', path.join(__dirname,"views"))
.set('view engine', 'hbs')

//criando rotas para a aplicação - somente um "resumo", verificar pages.js
.get('/', pages.index)
.get('/orphanage', pages.orphanage)
.get('/orphanages', pages.orphanages)
.get('/create-orphanages', pages.createOrphanages)
.post('/save-orphanage', pages.saveOrphanage)

//turn on server
server.listen(5500)