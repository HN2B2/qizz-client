import { Modal, Paper } from "@mantine/core";
import React from "react";
import QuestionReportPaper from "./QuestionReportPaper";
import { QuestionReportResponse } from "@/types/report";
import { QuestionDetail } from ".";
import { useDisclosure } from "@mantine/hooks";

const QuestionReportModal = ({
  question,
}: {
  question: QuestionReportResponse;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Paper p="lg" radius="md" shadow="sm" withBorder onClick={() => open()}>
        <QuestionReportPaper question={question} />
      </Paper>
      <Modal
        size={"60%"}
        opened={opened}
        onClose={close}
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        // title={<QuestionDetailHeader />}
      >
        <QuestionDetail question={question} />
      </Modal>
    </>
  );
};

export default QuestionReportModal;
