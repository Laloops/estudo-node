import express from 'express';
import bodyParser from 'body-parser';

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

app.get('/ola', (req, res) => {
    res.send('Olá mundo');
});

app.listen(3000, () => 
console.log('Servidor iniciado na porta 3000')
);


//iniciar servidor
// gerenciar rotas 

