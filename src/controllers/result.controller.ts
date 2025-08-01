import { Request, Response } from 'express';
import { ResultModel } from '../models/Result.model';
import { ResultEvaluatorService } from '../uses-case/result-evaluator';


export class ResultController {

    public saveResult = async (req: Request, res: Response) => {
        const { name, apellido, nivel, testType, answers, logicScore, totalScore } = req.body;

        if ([name, apellido, nivel, testType, answers, logicScore, totalScore].some(val => val === undefined)) {
            return res.status(400).json({ message: 'Faltan datos requeridos.' });
        }
        
        try {

            const resultadoFinal = ResultEvaluatorService.evaluate(logicScore, totalScore);

            const newResult = new ResultModel({
            name,
            apellido,
            nivel,
            testType,
            answers,
            logicScore,
            totalScore,
            resultadoFinal,
            });
        
            await newResult.save();

            res.status(201).json({ message: '✅ Resultado guardado correctamente.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '❌ Error al guardar resultado.' });
        }
    };

 public getReult = async (req: Request, res: Response) => {
        try {
            const results = await ResultModel.find().sort({ date: -1 });
            res.json(results);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '❌ Error al obtener resultados.' });
        }
    };
}