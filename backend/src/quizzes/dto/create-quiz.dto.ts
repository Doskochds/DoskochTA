export class CreateQuestionDto {
  text: string;
  type: 'boolean' | 'input' | 'checkbox';
  options?: string[];
}

export class CreateQuizDto {
  title: string;
  questions: CreateQuestionDto[];
}
