import { gradeOptions, grades } from 'src/services/rocks'

export const getMeaningfulGrade = (gradeNumber: gradeOptions): string => grades[gradeNumber];