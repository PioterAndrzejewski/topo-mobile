import { gradeOptions, grades } from '../../services/rocks'

export const getMeaningfulGrade = (gradeNumber: gradeOptions): string => grades[gradeNumber];