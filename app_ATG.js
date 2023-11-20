// Vamos a necesitar express para manejar la API
const c_express=require('express');1
const app_ATG = c_express();
// Puerto para el API
const c_puertoApi=3050;

// vamos a necesitar un bd no relacional (mongo)
const c_mongoose=require('mongoose');
const Medicion=require('./mediciones/medidas')
const MongoUri='mongodb://mongo_svr/mediciones';
c_mongoose.connect(MongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})       
 .then(() => console.log('Conectado a la base de datos'))       
 .catch(err => console.log(err))

// Definimos las funciones del API
// Definimos que vamos a usar json 
app_ATG.use(c_express.json());

app_ATG.post('/', async (req, res) => {
    const medida = new Medicion(req.body);
    try {
      const newMedida = await medida.save();
      res.status(201).json(newMedida);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
app_ATG.get('/', async (req,res) =>{
    try{
        const medidas = await Medicion.find(req.body);
        res.json(medidas);
      } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app_ATG.listen(c_puertoApi, () =>{
    console.log(`Servidor escucuchando en http://localhost:${c_puertoApi}`);
})
