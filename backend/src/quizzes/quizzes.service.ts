import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Injectable()
export class QuizzesService {
  constructor(private prisma: PrismaService) {}
  async create(createQuizDto: CreateQuizDto) {
    const { title, questions } = createQuizDto;

    return this.prisma.quiz.create({
      data: {
        title,
        questions: {
          create: questions.map((q) => ({
            text: q.text,
            type: q.type,
            options: JSON.stringify(q.options || []),
          })),
        },
      },
      include: { questions: true },
    });
  }
  async findAll() {
    return this.prisma.quiz.findMany({
      include: { questions: true },
      orderBy: { createdAt: 'desc' },
    });
  }
  async findOne(id: number) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: { questions: true },
    });
    if (quiz) {
      return {
        ...quiz,
        questions: quiz.questions.map((q) => ({
          ...q,
          options: JSON.parse(q.options) as string[],
        })),
      };
    }
    return null;
  }
  async remove(id: number) {
    return this.prisma.quiz.delete({ where: { id } });
  }
}
