import { CreateQuestionLayout } from "@/components/layouts"
import {
    FillInTheBlank,
    MultipleChoice,
} from "@/components/questions/createQuestions"
import { CreateQuestionRequest } from "@/types/question"
import { QuestionType } from "@/types/question/QuestionType"
import { useRouter } from "next/router"
import React, { createContext, useContext, useState } from "react"

const QuestionTypes: Record<QuestionType, React.ReactNode> = {
    [QuestionType.MULTIPLE_CHOICE]: <MultipleChoice />,
    [QuestionType.FILL_IN_THE_BLANK]: <FillInTheBlank />,
}

interface Props {
    dataQuestion: CreateQuestionRequest
    updateDataQuestion: (newValue: CreateQuestionRequest) => void
}

export const DataContext = createContext<Props>({} as any)
export const useMyContext = () => useContext(DataContext)
const Create = () => {
    const router = useRouter()
    const { type } = router.query
    const bankId = router.query.bank
    const questionType: QuestionType =
        QuestionType[type as keyof typeof QuestionType]
    const question: CreateQuestionRequest = {
        content: "",
        point: 1,
        duration: 30,
        type: questionType,
        answersMetadata: "",
        correctAnswersMetadata: "",
        explainAnswer: "",
        questionIndex: 0,
        disabled: false,
        quizBankId: Number(bankId),
    }

    const [dataQuestion, setDataQuestion] =
        useState<CreateQuestionRequest>(question)

    const updateDataQuestion = (newValue: CreateQuestionRequest) => {
        setDataQuestion(newValue)
    }

    return (
        <DataContext.Provider value={{ dataQuestion, updateDataQuestion }}>
            <CreateQuestionLayout>
                {QuestionTypes[questionType]}
            </CreateQuestionLayout>
        </DataContext.Provider>
    )
}

export default Create
