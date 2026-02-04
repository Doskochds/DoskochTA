"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2, Plus } from "lucide-react";
import { API_URL, Quiz } from "@/lib/types";

export default function QuizList() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQuizzes = async () => {
    try {
      const res = await fetch(`${API_URL}/quizzes`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setQuizzes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteQuiz = async (id: number) => {
    if (!confirm("Are you sure you want to delete this quiz?")) return;
    await fetch(`${API_URL}/quizzes/${id}`, { method: "DELETE" });
    setQuizzes((prev) => prev.filter((q) => q.id !== id));
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Quizzes</h1>
        <Link
          href="/create"
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition shadow-md"
        >
          <Plus size={20} /> Create New
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="grid gap-4">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="border border-gray-200 p-5 rounded-xl shadow-sm flex justify-between items-center bg-white hover:shadow-md transition"
            >
              <Link href={`/quizzes/${quiz.id}`} className="flex-1 group">
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition">
                  {quiz.title}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  {quiz.questionsCount} questions
                </p>
              </Link>
              <button
                onClick={() => deleteQuiz(quiz.id)}
                className="text-gray-400 p-2 hover:bg-red-50 hover:text-red-600 rounded-full transition"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
          {quizzes.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-500 mb-4">No quizzes found.</p>
              <Link
                href="/create"
                className="text-blue-600 font-medium hover:underline"
              >
                Create one now!
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
