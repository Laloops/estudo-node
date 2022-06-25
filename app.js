import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';


const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', (req, res) => {
    const place = {
        nome: "Imbituba",
        estado: "SC"
    }
    res.status(200).send(place)
});

app.post('/cadastro', (req, res) => {
    res.send(req.body.cidade)
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
                            listaCompleta.push(salvaDado)
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

app.get('/buscaestado', async (req, res) => {
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
                listaCompleta.push(salvaDado)
                //salvar salvaDado no mysql
            }
        }
        res.send(listaCompleta)
    } catch (error) {
        res.status(500).send("erro")
    }
});

app.get('/buscacidade/:id', (req, res) => {

});


app.listen(3000, () =>
    console.log('Servidor iniciado na porta 3000')
);


//iniciar servidor
// gerenciar rotas 

