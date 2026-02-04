'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { API_URL, Quiz } from '@/lib/types';
import { ArrowLeft, CheckSquare, Type, HelpCircle } from 'lucide-react';

export default function QuizDetail() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/quizzes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data) => setQuiz(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading quiz details...</div>;
  if (!quiz) return <div className="p-8 text-center text-red-500">Quiz not found!</div>;

  return (
    <div className="max-w-3xl mx-auto p-8 font-sans pb-20">
      <Link href="/" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-6 transition">
        <ArrowLeft size={20} className="mr-1" /> Back to Dashboard
      </Link>
      
      <div className="border-b pb-6 mb-8">
        <h1 className="text-4xl font-bold text-gray-900">{quiz.title}</h1>
        <p className="text-gray-500 mt-2 flex items-center gap-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            ID: {quiz.id}
          </span>
          {quiz.questions?.length} Questions
        </p>
      </div>

      <div className="space-y-8">
        {quiz.questions?.map((q, idx) => (
          <div key={q.id || idx} className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-medium text-gray-800 mb-4 flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold text-sm">
                {idx + 1}
              </span>
              {q.text}
            </h3>

            <div className="ml-11">
              {q.type === 'input' && (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Type size={16} className="text-gray-400" />
                  </div>
                  <input 
                    disabled 
                    className="w-full border border-gray-300 p-2.5 pl-10 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed" 
                    placeholder="User answer will go here..." 
                  />
                </div>
              )}
              {q.type === 'boolean' && (
                <div className="space-y-3">
                  {['True', 'False'].map((opt) => (
                    <label key={opt} className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50 cursor-not-allowed opacity-75">
                      <input type="radio" disabled name={`q-${q.id}`} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" />
                      <span className="text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
              )}
              {q.type === 'checkbox' && (
                <div className="grid gap-2">
                  <p className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                    <CheckSquare size={12} /> Multiple answers possible
                  </p>
                  {q.options.map((opt, i) => (
                    <label key={i} className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50 cursor-not-allowed opacity-75">
                      <input type="checkbox" disabled className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                      <span className="text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}