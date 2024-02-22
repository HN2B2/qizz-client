import { BankResponse } from "@/types/bank";
import { Button, Group, Modal, MultiSelect, Select } from "@mantine/core";
import React, { useEffect, useState } from "react";

import { instance } from "@/utils";
import { Category, SubCategory } from "@/types/category";
import { useDisclosure, useForceUpdate, useListState } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

const AddCategoryButton = ({
  bank,
  setBank,
}: {
  bank: BankResponse;
  setBank: React.Dispatch<React.SetStateAction<BankResponse>>;
}) => {
  const [categories, categoriesHandler] = useListState<Category>([]);

  const getData = async (ids: number[] | undefined) => {
    try {
      const { data: rawCategories } = await instance.get(`/categories`);

      categoriesHandler.setState(rawCategories.data);
    } catch (error) {}
  };

  const [subCategories, subCategoriesHandler] = useListState<SubCategory>([]);

  const [opened, { open, close }] = useDisclosure(false);
  const forceUpdate = useForceUpdate();
  const [ids, setIds] = useState<number[] | undefined>(
    bank.subCategories?.map((item) => item.categoryId)
  );

  useEffect(() => {
    getData(ids);
  }, []);
  const [subIds, setSubIds] = useState<string[]>([]);

  useEffect(() => {
    subCategoriesHandler.setState(
      categories.find((item) => item.id === categories.at(0)?.id)
        ?.subCategories ?? []
    );
  }, [categories]);

  const handleSelectCategory = (value: string | null) => {
    subCategoriesHandler.setState(
      categories.find((item) => item.id === Number(value))?.subCategories ?? []
    );
  };

  const handleSubmit = async () => {
    try {
      const { data } = await instance.post(
        `/bank/${bank.quizBankId}/subCategory`,
        {
          subCategories: subIds,
        }
      );
      close();
      setBank(data);
      notifications.show({
        color: "green",
        title: "SUCCESS",
        message: "Create subcategory successfully",
      });
    } catch (error) {
      notifications.show({
        color: "red",
        title: "ERROR",
        message: "Create subcategory failed",
      });
    }
  };

  const categoryData = categories.filter(
    (item) =>
      item.subCategories.filter(
        (sub) => !bank.subCategories?.map((item) => item.id).includes(sub.id)
      ).length != 0
  );

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add new subcategory">
        <>
          <Select
            m="md"
            label="Choose category"
            data={categoryData.map((item) => ({
              value: item.id + "",
              label: item.name,
            }))}
            defaultValue={categories.at(0)?.id + ""}
            allowDeselect={false}
            onChange={(value) => {
              handleSelectCategory(value);
            }}
          />

          <MultiSelect
            m="md"
            label="Choose subcategory"
            placeholder="Pick value"
            //   data={['React', 'Angular', 'Vue', 'Svelte']}
            data={subCategories
              .filter(
                (item) =>
                  !bank.subCategories?.map((item) => item.id)?.includes(item.id)
              )
              .map((item: SubCategory) => ({
                value: item.id + "",
                label: item.name,
              }))}
            onChange={setSubIds}
          />
          <Group justify="space-between" mt="100">
            <Button
              onClick={() => {
                close();
              }}
            >
              Cancel
            </Button>
            <Button onClick={() => handleSubmit()}>Confirm</Button>
          </Group>
        </>
      </Modal>
      <Button onClick={open}>Add new subcategory</Button>
    </>
  );
};

export default AddCategoryButton;
