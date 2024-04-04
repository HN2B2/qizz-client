import React from "react";
import { Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const orderData = [
  { value: "quizBankId", label: "Default" },
  { value: "name", label: "Bank Name" },
  { value: "createdAt", label: "Created at" },
];

const LibraryOrder = () => {
  const router = useRouter();
  const { keyword, order, sort, page, draft, subCategoryIds, tab } =
    router.query;
  const [orderValue, setOrderValue] = useState<string | null>("quizBankId");

  useEffect(() => {
    if (router.isReady) {
      setOrderValue((order as string) || "id");
    }
  }, [router.isReady, keyword]);

  const handleChangeOrder = (value: string | null) => {
    setOrderValue(value);
    router.push({
      pathname: "/my-library",
      query: {
        keyword,
        order: value,
        sort,
        page: "1",
        draft,
        subCategoryIds,
        tab,
      },
    });
  };

  return (
    <Select
      placeholder="Sort by"
      data={orderData}
      value={orderValue}
      onChange={handleChangeOrder}
    />
  );
};

export default LibraryOrder;
