
export class ResultEvaluatorService {
  static evaluate(logicScore: number, totalScore: number): 'Aprobado' | 'Reprobado' {
    const MAX_TOTAL = 205;
    const logicThreshold = 32;
    const totalThreshold = 0.6 * MAX_TOTAL;

    if (logicScore >= logicThreshold && totalScore >= totalThreshold) {
      return 'Aprobado';
    }

    return 'Reprobado';
  }
}