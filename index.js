const express = require('express')
const app = express()
const {MongoClient, ObjectId} = require ("mongodb")

//Instalar MongoDB
//Importar MongoDB
//Realizar Conexao com o Banco
//Porcurar pela Collection que criamos
//Realizar Operacoes

// Connection URL
const url = 'mongodb+srv://admin:<BcGQHD94xjatlLuX>@cluster0.cqkex.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// Database Name
const dbName = 'ocean_nuvem_bd_19_11_21';

async function main() {


  const client = await MongoClient.connect(url);

  const db = client.db(dbName);

  const collection = db.collection("herois");


 

  //Para Expressar considerar o corpo da requisicao em formato JSON
  app.use(express.json());
  
  app.get('/', function (req, res) {
    res.send('Hello World!!')
  })

  app.get('/oi', function (req, res) {
      res.send('Olá!! Mundo')
  })

  const herois = ['Mulher Maravilha', 'Capitã Marvel', 'Homem de Ferro'];

  //[GET] /herois - ler tudo - Read All
  app.get('/herois', async function (req, res) {
    const documentos = await collection.find().toArray();

    res.send(documentos); // .filter(Bollean) Retira o null da apresentacao do JSON
  })

  //[GET] /herois/:id - Ler um unico registro por id(podicao) Read Single By Id
  app.get('/herois/:id', async function (req, res) {
    //const id = +req.params.id -1; para array

    const id = req.params.id;

    const item = await collection.findOne({ _id: new ObjectId(id) })

    //console.log(id); // resposta: 1
    // console.log(id, typeof id); resposta: 1 string

    //logica de acesso ao dado do array
    //const item = herois[id];

    //logica de envio do dado caso encontrado
    res.send(item)
  })

  //[POST] /herois - Create
  app.post('/herois', async function (req, res) {
    
    const item = req.body;

    await collection.insertOne(item)
    //herois.push(item.nome); // item(objeto).nome(chave) ->do json

    res.send(item)
  })

  //[PUT] /herois/:id - Atualizar um heroi
  app.put('/herois/:id', async function (req, res) {

    const id = req.params.id;
    const item = req.body;

    await collection.updateOne(
      { _id: new ObjectId(id)},
      {
        $set: item,
      }
    );

    res.send(item);
  })


  //[DELETE] /herois/:id - Deletar um heroi
  app.delete('/herois/:id', async function (req, res) {
    const id = req.params.id;

    await collection.deleteOne({ _id: new ObjectId(id)})
    res.send("Registro Removido com Sucesso")
  })

  app.listen(process.env.PORT || 3000)
}
main();