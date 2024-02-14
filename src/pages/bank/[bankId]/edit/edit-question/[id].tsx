import EditQuestionLayout from "@/components/layouts/layoutComponents/EditQuestionLayout";
import EditFillInTheBlank from "@/components/questions/editQuestions/EditFillInTheBlank";
import EditMultipleChoice from "@/components/questions/editQuestions/EditMultipleChoice";
import { QuestionResponse } from "@/types/question";
// import QuestionRequest from "@/types/question/QuestionRequest";
import { QuestionType } from "@/types/question/QuestionType";
import { instance } from "@/utils";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { createContext, useContext, useState } from "react";
const questionTypes: Record<QuestionType, React.ReactNode> = {
  [QuestionType.MULTIPLE_CHOICE]: <EditMultipleChoice />,
  [QuestionType.FILL_IN_THE_BLANK]: <EditFillInTheBlank />,
};

// interface MyContextValue {
//   dataQuestion: QuestionRequest;
//   updateDataQuestion: (newValue: QuestionRequest) => void;
// }

interface Props {
  questionData: QuestionResponse;
}

export const DataContext = createContext<any>({} as any);
export const useEditContext = () => useContext(DataContext);

const EditQuestion = ({ questionData }: Props) => {
  const router = useRouter();
  const { type } = router.query;
  const bankId = router.query.bank;
  const questionType: QuestionType =
    QuestionType[type as keyof typeof QuestionType];

  const [dataQuestion, setDataQuestion] = useState(questionData);

  const updateDataQuestion = (newValue: QuestionResponse) => {
    setDataQuestion(newValue);
  };

  return (
    <DataContext.Provider value={{ dataQuestion, updateDataQuestion }}>
      <EditQuestionLayout>{questionTypes[questionType]}</EditQuestionLayout>
    </DataContext.Provider>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { req, query } = context;
    // const { page = PAGE, keyword } = query;
    const res = await instance.get(`/question/${query.id}`, {
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie || "",
      },
    });
    const questionData = res.data;
    return {
      props: {
        questionData,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export default EditQuestion;
