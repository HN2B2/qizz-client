import { AppShell } from "@mantine/core";
import React from "react";
import EditQuestionHeader from "./Header/EditQuestionHeader";

interface CreateQuestionBaseProps {
  children?: React.ReactNode;
}

const EditQuestionLayout = ({ children }: CreateQuestionBaseProps) => {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <EditQuestionHeader />
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default EditQuestionLayout;
