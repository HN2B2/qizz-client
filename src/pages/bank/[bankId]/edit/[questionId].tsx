import { useRouter } from "next/router";
import React from "react";

const CreateQuestion = () => {
  const router = useRouter();
  const { type } = router.query;
  return <>{type}</>;
};

export default CreateQuestion;
