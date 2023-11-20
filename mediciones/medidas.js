const mongoose = require('mongoose');

const MedicionesSchema = new mongoose.Schema(
    {
        localidad : String,
        temperatura : Number
    },
 )


module.exports = mongoose.model('Medicion', MedicionesSchema);