type Question = {
  id: string;
  title: string;
  text: string;
  category: string;
};

const QUESTIONS_KEY = "questions";

export const getQuestions = (): Question[] => {
  const data = localStorage.getItem(QUESTIONS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveQuestion = (question: Question) => {
  const questions = getQuestions();
  localStorage.setItem(QUESTIONS_KEY, JSON.stringify([...questions, question]));
};

export const getQuestionsByCategory = (category: string): Question[] => {
  return getQuestions().filter((q) => q.category === category);
};

export const getCategories = (): string[] => {
  const questions = getQuestions();
  const categories = questions.map((q) => q.category);
  return Array.from(new Set(categories));
};
