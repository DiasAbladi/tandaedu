
import { useState } from "react";
import { testQuestions, CareerCategory, categoryToMajorIds, categories } from "@/data/testQuestions";

export type TestAnswer = {
  questionId: number;
  selectedOption: string;
  category: CareerCategory;
};

export interface TestResult {
  categories: Record<CareerCategory, number>;
  totalAnswers: number;
  topCategories: {category: CareerCategory, percentage: number}[];
  recommendedMajorIds: string[];
}

export function useCareerTest() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<TestAnswer[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  const totalQuestions = testQuestions.length;
  const currentQuestion = testQuestions[currentQuestionIndex];
  const progress = Math.round(((currentQuestionIndex) / totalQuestions) * 100);

  const handleAnswer = (optionId: string, category: CareerCategory) => {
    const answer = {
      questionId: currentQuestion.id,
      selectedOption: optionId,
      category
    };

    // Add or update the answer
    setAnswers(prev => {
      const existingAnswerIndex = prev.findIndex(a => a.questionId === currentQuestion.id);
      if (existingAnswerIndex >= 0) {
        const updatedAnswers = [...prev];
        updatedAnswers[existingAnswerIndex] = answer;
        return updatedAnswers;
      } else {
        return [...prev, answer];
      }
    });
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      completeTest();
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateResults = (): TestResult => {
    // Count answers by category
    const categoryCounts: Record<CareerCategory, number> = {
      a: 0, b: 0, c: 0, d: 0, e: 0
    };

    answers.forEach(answer => {
      categoryCounts[answer.category]++;
    });

    // Calculate percentages
    const totalAnswers = answers.length;
    const categoryPercentages = Object.entries(categoryCounts).map(([category, count]) => ({
      category: category as CareerCategory,
      percentage: Math.round((count / totalAnswers) * 100)
    }));

    // Sort by percentage, descending
    const topCategories = categoryPercentages.sort((a, b) => b.percentage - a.percentage);

    // Get top 2 categories
    const topTwoCategories = topCategories.slice(0, 2);
    
    // Get recommended majors based on top categories
    const recommendedMajorIds = topTwoCategories.flatMap(item => 
      categoryToMajorIds[item.category]
    );

    return {
      categories: categoryCounts,
      totalAnswers,
      topCategories,
      recommendedMajorIds: [...new Set(recommendedMajorIds)] // Remove duplicates
    };
  };

  const completeTest = () => {
    const results = calculateResults();
    setTestResult(results);
    setIsCompleted(true);
  };

  const restartTest = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setIsCompleted(false);
    setTestResult(null);
  };

  const getCurrentAnswer = () => {
    return answers.find(a => a.questionId === currentQuestion?.id);
  };

  return {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    progress,
    answers,
    isCompleted,
    testResult,
    handleAnswer,
    goToNextQuestion,
    goToPreviousQuestion,
    completeTest,
    restartTest,
    getCurrentAnswer
  };
}
