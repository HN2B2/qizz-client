import { AppShell } from "@mantine/core";
import { useRouter } from "next/router";
import { CreateQuestionHeader } from "./layoutComponents";

interface CreateQuestionBaseProps {
  children?: React.ReactNode;
}

const CreateQuestionLayout = ({ children }: CreateQuestionBaseProps) => {
  const router = useRouter();
  const { bankId } = router.query;

  return (
    <>
      <AppShell header={{ height: 60 }} padding="md">
        <CreateQuestionHeader />
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </>
  );
};

export default CreateQuestionLayout;
