import { Category, SubCategory } from "@/types/category";
import { instance } from "@/utils";
import {
  Button,
  Group,
  Modal,
  MultiSelect,
  Pill,
  PillsInput,
  Select,
} from "@mantine/core";
import { useDisclosure, useListState } from "@mantine/hooks";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const LibraryFilterSubcategories = () => {
  const [categories, handlerCategories] = useListState<Category>([]);
  const [subCategories, handlerSubCategories] = useListState<SubCategory>([]);
  const [subCats, handlerSubCats] = useListState<string>([]);
  const [subs, handlerSubs] = useListState<SubCategory>([]);
  const [openedModal, { open, close }] = useDisclosure(false);
  const router = useRouter();
  const { keyword, order, sort, page, draft, subCategoryIds, tab } =
    router.query;

  const getData = async () => {
    try {
      const rawCategories: { data: Category[]; total: number } = await instance
        .get(`categories`)
        .json();

      handlerCategories.setState(rawCategories.data);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    // handlerSubCategories.setState(
    //   categories.find((item) => item.id === categories.at(0)?.id)
    //     ?.subCategories ?? []
    // );
    handlerSubCategories.setState(
      categories.filter(
        (item) =>
          item.subCategories.filter(
            (sub) => !subs.map((item) => item.id).includes(sub.id)
          ).length != 0
      )[0]?.subCategories ?? []
    );
  }, [openedModal]);

  useEffect(() => {
    router.push({
      pathname: "/my-library",
      query: {
        keyword,
        order,
        sort,
        page: "1",
        draft,
        subCategoryIds: subs.map((item) => item.id).join(","),
        tab,
      },
    });
  }, [subs]);

  const categoryData = categories.filter(
    (item) =>
      item.subCategories.filter(
        (sub) => !subs.map((item) => item.id).includes(sub.id)
      ).length != 0
  );

  const handleSelectCategory = (value: string | null) => {
    handlerSubCategories.setState(
      categories.find((item) => item.id === Number(value))?.subCategories ?? []
    );
  };

  const handleSubmitSubcategories = () => {
    subCategories
      .filter((item) => subCats.includes(item.id + ""))
      .forEach((item) => {
        handlerSubs.append(item);
      });

    close();
    // handlerSubs.append();
  };
  return (
    <>
      <PillsInput size="md" miw={350}>
        <Pill.Group>
          {subs.map((item, index) => (
            <Pill
              key={index}
              withRemoveButton
              onRemove={() => {
                handlerSubs.remove(index);
                // handlerSubCats.remove(index);
              }}
            >
              {item.name}
            </Pill>
          ))}
          {/* <Pill withRemoveButton onRemove={() => handlerSubCategories.remove()}>React</Pill>
                  <Pill withRemoveButton>Vue</Pill>
                  <Pill withRemoveButton>Svelte</Pill> */}
          <PillsInput.Field placeholder="Enter tags" onClick={open} />
        </Pill.Group>
      </PillsInput>

      <Modal opened={openedModal} onClose={close} title="Add new subcategory">
        <>
          <Select
            m="md"
            label="Choose category"
            // data={categories
            //   .map((item) => ({
            //     value: item.id + "",
            //     label: item.name,
            //   }))}
            data={categoryData.map((item) => ({
              value: item.id + "",
              label: item.name,
            }))}
            defaultValue={categoryData.at(0)?.id + ""}
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
              .filter((item) => !subs?.map((item) => item.id).includes(item.id))
              .map((item: SubCategory) => ({
                value: item.id + "",
                label: item.name,
              }))}
            onChange={(value) => {
              handlerSubCats.setState(value);
            }}
          />
          <Group justify="space-between" mt="100">
            <Button
              onClick={() => {
                close();
              }}
            >
              Cancel
            </Button>
            <Button onClick={() => handleSubmitSubcategories()}>Confirm</Button>
          </Group>
        </>
      </Modal>
    </>
  );
};

export default LibraryFilterSubcategories;
