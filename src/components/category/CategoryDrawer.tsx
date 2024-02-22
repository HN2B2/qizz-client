import { ActionIcon, Drawer, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconAdjustments } from "@tabler/icons-react";
import React from "react";
import AddCategoryButton from "./AddCategoryButton";
import { BankResponse } from "@/types/bank";
import CategoryList from "./CategoryList";

const CategoryDrawer = ({
  bank,
  setBank,
}: {
  bank: BankResponse;
  setBank: React.Dispatch<React.SetStateAction<BankResponse>>;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <ActionIcon variant="filled" aria-label="Settings" onClick={open}>
        <IconAdjustments style={{ width: "70%", height: "70%" }} stroke={1.5} />
      </ActionIcon>

      <Drawer
        opened={opened}
        onClose={close}
        title="Edit category"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        position="right"
      >
        <Group justify="center">
          <AddCategoryButton bank={bank} setBank={setBank}></AddCategoryButton>
          <CategoryList bank={bank} setBank={setBank}></CategoryList>
        </Group>
      </Drawer>
    </>
  );
};

export default CategoryDrawer;
