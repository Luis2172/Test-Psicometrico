

import { Schema, model } from 'mongoose';

const ResultSchema = new Schema({
  name: { 
    type: String, required: true 
  },
  apellido: { 
    type: String, required: true 
  },
  email: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    trim: true,
    lowercase: true,
    match: [ /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Correo no válido' ]
  },
  nivel: {
    type: String, enum: ['Preparatoria', 'Ingeniería'], required: true 
  },
  testType: { 
    type: String, enum: ['Sistemas', 'Informática'], required: true 
  },
  answers: { 
    type: [Number], required: true 
  },
  logicScore: { 
    type: Number, required: true 
  },
  totalScore: { 
    type: Number, required: true 
  },
  date: { 
    type: Date, default: new Date() 
  },
  resultadoFinal: {
     type: String, required: true 
  },
});

export const ResultModel = model('Result', ResultSchema);
