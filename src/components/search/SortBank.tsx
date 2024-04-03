import { PAGE_SIZE } from "@/pages/search";
import { ActionIcon, Select } from "@mantine/core";
import { IconSortAscending, IconSortDescending } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SortBank = () => {
  const [isDesc, setIsDesc] = useState(true);
  const router = useRouter();
  const { keyword, order, sort, page, subCategoryIds } = router.query;

  useEffect(() => {
    if (router.isReady) {
      setIsDesc(sort === "desc");
    }
  }, [router.isReady]);

  const handleToggleOrder = () => {
    setIsDesc((prev) => !prev);
    router.push({
      pathname: "/search",
      query: {
        limit: PAGE_SIZE,
        page,
        keyword,
        order,
        sort: isDesc ? "desc" : "asc",
        subCategoryIds,
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

export default SortBank;
