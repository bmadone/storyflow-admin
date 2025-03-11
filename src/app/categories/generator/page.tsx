"use client";

import { useState } from "react";
import styles from "./generator.module.css";
import { QuizType, Level, GeneratorRequest } from "@/shared/types";

const QUIZ_TYPE_OPTIONS: { value: QuizType; label: string }[] = [
  { value: "multiple-choice", label: "Multiple Choice" },
];

const LEVEL_OPTIONS: { value: Level; label: string }[] = [
  { value: "A1", label: "A1 - Beginner" },
  { value: "A2", label: "A2 - Elementary" },
];

export default function CategoryGenerator() {
  const [formData, setFormData] = useState<GeneratorRequest>({
    title: "",
    topics: [],
    numberOfStories: 3,
    numberOfQuizzes: 3,
    quizTypes: ["multiple-choice"],
    level: "A2",
    includeAudio: false,
    includeImage: false,
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

      // Redirect to the categories page after successful generation
      // window.location.href = "/categories";
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

  return (
    <div className={styles.container}>
      <h1>Category generator</h1>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="topics">Topics:</label>
          <input
            type="text"
            id="topics"
            value={formData.topics.join(", ")}
            onChange={(e) =>
              setFormData({
                ...formData,
                topics: e.target.value.split(",").map((topic) => topic.trim()),
              })
            }
            placeholder="Family, Friends"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="numberOfStories">Number of stories:</label>
          <input
            type="number"
            id="numberOfStories"
            value={formData.numberOfStories}
            onChange={(e) =>
              setFormData({
                ...formData,
                numberOfStories: parseInt(e.target.value),
              })
            }
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="numberOfQuizzes">Number of quizzes:</label>
          <input
            type="number"
            id="numberOfQuizzes"
            value={formData.numberOfQuizzes}
            onChange={(e) =>
              setFormData({
                ...formData,
                numberOfQuizzes: parseInt(e.target.value),
              })
            }
          />
        </div>

        <div className={styles.formGroup}>
          <label>Quiz types:</label>
          <div className={styles.checkboxGroup}>
            {QUIZ_TYPE_OPTIONS.map((option) => (
              <label key={option.value} className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.quizTypes.includes(option.value)}
                  onChange={() => handleQuizTypeChange(option.value)}
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="level">Level:</label>
          <select
            id="level"
            value={formData.level}
            onChange={(e) =>
              setFormData({ ...formData, level: e.target.value as Level })
            }
            className={styles.select}
          >
            {LEVEL_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>
            <input
              type="checkbox"
              checked={formData.includeAudio}
              onChange={(e) =>
                setFormData({ ...formData, includeAudio: e.target.checked })
              }
            />
            Include audio
          </label>
        </div>

        <div className={styles.formGroup}>
          <label>
            <input
              type="checkbox"
              checked={formData.includeImage}
              onChange={(e) =>
                setFormData({ ...formData, includeImage: e.target.checked })
              }
            />
            Include image
          </label>
        </div>

        <button
          type="submit"
          className={styles.generateButton}
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Generate"}
        </button>
      </form>
    </div>
  );
}
