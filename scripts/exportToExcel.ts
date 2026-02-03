import mongoose from 'mongoose';
import * as XLSX from 'xlsx';
import dotenv from 'dotenv';

import { ResultModel } from '../src/models/Result.model';

dotenv.config();

const exportToExcel = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);

    const results = await ResultModel.find().lean();

    console.log('Cantidad de documentos:', results.length);

    const data = results.map((r: any, index: number) => {
      const row: any = {
        Sujeto: index + 1,
        Nombre: r.name,
        Apellido: r.apellido,
        Email: r.email,
        Nivel: r.nivel,
        Carrera: r.testType,
        Puntaje_Logica: r.logicScore,
        Puntaje_Total: r.totalScore,  // ✅ aquí está el fix
        Fecha: r.date,
        Resultado: r.resultadoFinal,
      };

      // items
      (r.answers || []).forEach((answer: number, i: number) => {
        row[`Item_${i + 1}`] = answer;
      });

      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Base_Datos');

    XLSX.writeFile(workbook, 'Resultados_Psicometrico.xlsx');

    console.log('✅ Excel generado correctamente');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error al exportar:', error);
    process.exit(1);
  }
};

exportToExcel();