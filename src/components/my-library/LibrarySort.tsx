import { ActionIcon, Select } from "@mantine/core";
import { IconSortAscending, IconSortDescending } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import React from "react";

const LibrarySort = () => {
  const [isDesc, setIsDesc] = useState(true);
  const router = useRouter();
  const { keyword, order, sort, page, draft, subCategoryIds, tab } =
    router.query;
  useEffect(() => {
    if (router.isReady) {
      setIsDesc(sort === "desc");
    }
  }, [router.isReady]);

  const handleToggleOrder = () => {
    setIsDesc((prev) => !prev);
    router.push({
      pathname: "/my-library",
      query: {
        keyword,
        order,
        sort: isDesc ? "desc" : "asc",
        page: "1",
        draft,
        subCategoryIds,
        tab,
      },
    });
  };
  return (
    <ActionIcon size={"lg"} onClick={handleToggleOrder}>
      {isDesc ? (
        <IconSortDescending size={"1rem"} />
      ) : (
        <IconSortAscending size={"1rem"} />
      )}
    </ActionIcon>
  );
};

export default LibrarySort;
