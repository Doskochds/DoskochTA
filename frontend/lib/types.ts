export type QuestionType = 'boolean' | 'input' | 'checkbox';

export interface Question {
  id?: number;
  text: string;
  type: QuestionType;
  options: string[]; 
}

export interface Quiz {
  id: number;
  title: string;
  questionsCount?: number;
  questions?: Question[];
}

export const API_URL = 'http://localhost:3000';