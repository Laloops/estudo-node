import express from "express";
import axios from "axios";
//import routes from "./routes.js";
//import db from "./src/db.js";

//low  db config  
import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));

const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)


// low db config
const app = express();

app.use(express.json());


//db.sync(() => console.log(`Banco de dados conectado: ${process.env.DB_NAME}`));

app.get('/', (req, res) => {
    const place = {
        nome: "Imbituba",
        estado: "SC"
    }
    res.status(200).send(place)
});

app.get('/cidades', async (req, res) => {
    await db.read()
    db.data ||= { cidades: [] }
    res.send(db.data.cidades)
});

app.get('/buscaestadoassincrona', (req, res) => {
    const listaCompleta = [];

    axios.get('http://www.geonames.org/childrenJSON?geonameId=3469034')
        .then((response) => {
            const estados = response.data.geonames;
            for (var i = 0; i < estados.length; i++) {
                console.log(estados[i].geonameId);
                var id = estados[i].geonameId;
                axios.get('http://www.geonames.org/childrenJSON?geonameId=' + id)
                    .then((responseCidades) => {
                        const cidades = responseCidades.data.geonames;
                        for (var j = 0; j < cidades.length; j++) {

                            const salvaDado = {
                                estado: cidades[j].adminName1,
                                cidade: cidades[j].name
                            }
                            //salvar salvaDado no mysql
                            console.log(salvaDado);
                        }
                    })
                    .catch((erro) => {
                        console.log(erro)

                    })
            }
        })
        .catch((erro) => {
            console.timeLog(erro)

        })

    res.send(listaCompleta)
});
/*
app.get('/buscaestado', async (req, res) => {
   
    await db.read()
    db.data ||= { cidades: [] }
    const listaCompleta = [];
    try {
        const response = await axios.get('http://www.geonames.org/childrenJSON?geonameId=3469034')
        const estados = response.data.geonames;

        for (var i = 0; i < estados.length; i++) {
            var id = estados[i].geonameId;
            const responseCidades = await axios.get('http://www.geonames.org/childrenJSON?geonameId=' + id)

            const cidades = responseCidades.data.geonames;
            for (var j = 0; j < cidades.length; j++) {

                const salvaDado = {
                    estado: cidades[j].adminName1,
                    cidade: cidades[j].name
                }
                db.data.cidades.push(salvaDado)
                //salvar salvaDado no mysql
            }
        }
        await db.write()
        res.send(listaCompleta)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
});
*/
app.listen(3000, () => console.log("Servidor iniciado na porta 3000"));


//iniciar servidor
// gerenciar rotas 

