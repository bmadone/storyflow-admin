import { useState } from "react";
import { QuizType, GeneratorRequest } from "@/shared/types";

export const useCategoryGenerator = () => {
  const [formData, setFormData] = useState<GeneratorRequest>({
    title: "Family and Friends",
    topics: ["Family", "Friends"],
    numberOfStories: 1,
    numberOfQuizzes: 1,
    quizTypes: ["multiple-choice"],
    level: "A2",
    includeAudio: true,
    includeImage: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/categories/generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate category");
      }

      const data = await response.json();
      console.log("data", data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuizTypeChange = (type: QuizType) => {
    setFormData((prev) => ({
      ...prev,
      quizTypes: prev.quizTypes.includes(type)
        ? prev.quizTypes.filter((t) => t !== type)
        : [...prev.quizTypes, type],
    }));
  };

  const updateFormData = <K extends keyof GeneratorRequest>(
    field: K,
    value: GeneratorRequest[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return {
    formData,
    isLoading,
    error,
    handleSubmit,
    handleQuizTypeChange,
    updateFormData,
  };
};
