"use client";

import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/types";
import { Plus, X, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
type FormValues = {
  title: string;
  questions: {
    text: string;
    type: "boolean" | "input" | "checkbox";
    optionsString: string;
  }[];
};

export default function CreateQuiz() {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      questions: [{ text: "", type: "input", optionsString: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });
  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    const payload = {
      title: data.title,
      questions: data.questions.map((q) => ({
        text: q.text,
        type: q.type,
        options:
          q.type === "checkbox"
            ? q.optionsString
                .split(",")
                .map((s: string) => s.trim())
                .filter((s: string) => s !== "")
            : [],
      })),
    };

    try {
      const res = await fetch(`${API_URL}/quizzes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error creating quiz");
      router.push("/");
      router.refresh();
    } catch (error) {
      alert("Something went wrong. Check console.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 font-sans pb-24">
      <Link
        href="/"
        className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-6 transition"
      >
        <ArrowLeft size={20} className="mr-1" /> Back to Dashboard
      </Link>

      <h1 className="text-3xl font-bold text-gray-800 mb-8">Create New Quiz</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <label className="block font-semibold text-gray-700 mb-2">
            Quiz Title
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="e.g. Doskoch quiz"
          />
          {errors.title && (
            <span className="text-red-500 text-sm mt-1">
              {errors.title.message}
            </span>
          )}
        </div>
        <div className="space-y-6">
          {fields.map((field, index: number) => {
            const currentType = watch(`questions.${index}.type`) as string;

            return (
              <div
                key={field.id}
                className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm relative group hover:border-blue-300 transition"
              >
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition"
                  title="Remove Question"
                >
                  <X size={20} />
                </button>

                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-700 w-6 h-6 flex items-center justify-center rounded-full text-sm">
                    {index + 1}
                  </span>
                  Question
                </h3>

                <div className="grid gap-5">
                  <div>
                    <input
                      {...register(`questions.${index}.text`, {
                        required: true,
                      })}
                      placeholder="What is the question?"
                      className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Answer Type
                    </label>
                    <select
                      {...register(`questions.${index}.type`)}
                      className="w-full border border-gray-300 p-3 rounded-lg bg-gray-50 focus:bg-white outline-none"
                    >
                      <option value="input">Text Input (Short Answer)</option>
                      <option value="boolean">True / False</option>
                      <option value="checkbox">
                        Multiple Choice (Checkbox)
                      </option>
                    </select>
                  </div>
                  {currentType === "checkbox" && (
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <label className="block text-sm font-medium text-blue-800 mb-1">
                        Options (comma separated)
                      </label>
                      <input
                        {...register(`questions.${index}.optionsString`, {
                          required: true,
                        })}
                        placeholder="e.g. 1,2,3,4"
                        className="w-full border border-blue-200 p-3 rounded bg-white focus:ring-2 focus:ring-blue-400 outline-none"
                      />
                      <p className="text-xs text-blue-600 mt-1">
                        Users will be able to select multiple options.
                      </p>
                    </div>
                  )}

                  {currentType === "boolean" && (
                    <div className="text-sm text-gray-500 italic bg-gray-50 p-3 rounded">
                      User will simply select between &quot;True&quot; and
                      &quot;False&quot;.
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => append({ text: "", type: "input", optionsString: "" })}
          className="w-full border-2 border-dashed border-gray-300 p-4 rounded-xl text-gray-500 font-medium hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition flex justify-center items-center gap-2"
        >
          <Plus size={20} /> Add Another Question
        </button>
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t flex justify-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <button
            type="submit"
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-green-700 shadow-lg flex items-center gap-2 transition transform hover:scale-105 active:scale-95"
          >
            <Save size={20} /> Save Quiz
          </button>
        </div>
      </form>
    </div>
  );
}
