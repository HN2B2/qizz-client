import { CreateQuestionLayout } from "@/components/layouts";
import {
  FillInTheBlank,
  MultipleChoice,
} from "@/components/questions/createQuestions";
import { Question } from "@/types/question";
import { QuestionType } from "@/types/question/QuestionType";
import { useRouter } from "next/router";
import React, { useState } from "react";

const question: Question = {
  questionId: 1,
  content: "What is the capital of France?",
  point: 1,
  duration: 15,
  type: QuestionType.MULTIPLE_CHOICE,
  answersMetadata: ["Paris", "London", "Berlin", "Madrid"],
  correctAnswersMetadata: ["Paris"],
  explainAnswer: "Paris is the capital of France",
  questionIndex: 1,
  disabled: false,
  quizBankId: 1,
};

const QuestionTypes: Record<QuestionType, React.ReactNode> = {
  [QuestionType.MULTIPLE_CHOICE]: <MultipleChoice question={question} />,
  [QuestionType.FILL_IN_THE_BLANK]: <FillInTheBlank question={question} />,
};

const Create = () => {
  const router = useRouter();
  const { type } = router.query;
  const questionType: QuestionType =
    QuestionType[type as keyof typeof QuestionType];
  return (
    <CreateQuestionLayout>{QuestionTypes[questionType]}</CreateQuestionLayout>
  );
};

export default Create;
