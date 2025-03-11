"use client";

import {
  CategoryGeneratorForm,
  useCategoryGenerator,
} from "@/components/generator";

export default function CategoryGenerator() {
  const {
    formData,
    isLoading,
    error,
    handleSubmit,
    handleQuizTypeChange,
    updateFormData,
  } = useCategoryGenerator();

  return (
    <CategoryGeneratorForm
      formData={formData}
      isLoading={isLoading}
      error={error}
      onSubmit={handleSubmit}
      onQuizTypeChange={handleQuizTypeChange}
      onUpdateFormData={updateFormData}
    />
  );
}
