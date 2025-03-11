import { QuizType, Level, GeneratorRequest } from "@/shared/types";
import styles from "./category-generator-form.module.css";

const QUIZ_TYPE_OPTIONS: { value: QuizType; label: string }[] = [
  { value: "multiple-choice", label: "Multiple Choice" },
];

const LEVEL_OPTIONS: { value: Level; label: string }[] = [
  { value: "A1", label: "A1 - Beginner" },
  { value: "A2", label: "A2 - Elementary" },
];

interface CategoryGeneratorFormProps {
  formData: GeneratorRequest;
  isLoading: boolean;
  error: string | null;
  onSubmit: (e: React.FormEvent) => void;
  onQuizTypeChange: (type: QuizType) => void;
  onUpdateFormData: <K extends keyof GeneratorRequest>(
    field: K,
    value: GeneratorRequest[K]
  ) => void;
}

export function CategoryGeneratorForm({
  formData,
  isLoading,
  error,
  onSubmit,
  onQuizTypeChange,
  onUpdateFormData,
}: CategoryGeneratorFormProps) {
  return (
    <div className={styles.container}>
      <h1>Category generator</h1>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => onUpdateFormData("title", e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="topics">Topics:</label>
          <input
            type="text"
            id="topics"
            value={formData.topics.join(", ")}
            onChange={(e) =>
              onUpdateFormData(
                "topics",
                e.target.value.split(",").map((topic) => topic.trim())
              )
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
              onUpdateFormData("numberOfStories", parseInt(e.target.value))
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
              onUpdateFormData("numberOfQuizzes", parseInt(e.target.value))
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
                  onChange={() => onQuizTypeChange(option.value)}
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
            onChange={(e) => onUpdateFormData("level", e.target.value as Level)}
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
                onUpdateFormData("includeAudio", e.target.checked)
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
                onUpdateFormData("includeImage", e.target.checked)
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
