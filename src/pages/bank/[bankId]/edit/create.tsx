import { CreateQuestionLayout } from "@/components/layouts";
import {
  FillInTheBlank,
  MultipleChoice,
} from "@/components/questions/createQuestions";
import { QuestionType } from "@/types/question/QuestionType";
import { useRouter } from "next/router";
import React, { useState } from "react";

const QuestionTypes: Record<QuestionType, React.ReactNode> = {
  [QuestionType.MULTIPLE_CHOICE]: <MultipleChoice />,
  [QuestionType.FILL_IN_THE_BLANK]: <FillInTheBlank />,
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
