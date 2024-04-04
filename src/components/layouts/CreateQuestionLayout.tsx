import { AppShell } from "@mantine/core";
import { useRouter } from "next/router";
import { CreateQuestionHeader } from "./layoutComponents";
import { createContext, useState } from "react";
// import { Question } from "@/types/question";
import { instance } from "@/utils";

interface CreateQuestionBaseProps {
  children?: React.ReactNode;
}

const CreateQuestionLayout = ({ children }: CreateQuestionBaseProps) => {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <CreateQuestionHeader />
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default CreateQuestionLayout;
