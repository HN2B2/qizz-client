import { BankResponse } from "@/types/bank";
import { SubCategory } from "@/types/category";
import { instance } from "@/utils";
import { ActionIcon, Group, Paper, Space, Table, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconTrash } from "@tabler/icons-react";
import React from "react";

interface CategoryWithSubcategories {
  categoryId: number;
  categoryName: string;
  subcategories: SubCategory[];
}
const CategoryList = ({
  bank,
  setBank,
}: {
  bank: BankResponse;
  setBank: React.Dispatch<React.SetStateAction<BankResponse>>;
}) => {
  const subCategories =
    bank.subCategories == undefined ? [] : bank.subCategories;
  const transformedArray: CategoryWithSubcategories[] = Object.values(
    subCategories.reduce(
      (acc: { [key: number]: CategoryWithSubcategories }, subCategory) => {
        if (!acc[subCategory.categoryId]) {
          acc[subCategory.categoryId] = {
            categoryId: subCategory.categoryId,
            categoryName: subCategory.categoryName,
            subcategories: [],
          };
        }
        acc[subCategory.categoryId].subcategories.push({
          id: subCategory.id,
          createdAt: subCategory.createdAt,
          name: subCategory.name,
          description: subCategory.description,
          categoryId: subCategory.categoryId,
          categoryName: subCategory.categoryName,
        });
        return acc;
      },
      {}
    )
  );
  const showConfirmDelete = (id: number) => {
    //how to prevent navigate link of a tag parent of this function

    modals.openConfirmModal({
      title: "Delete subcategory",
      children: "Are you sure you want to delete this subcategory?",
      labels: {
        confirm: "Delete",
        cancel: "Cancel",
      },
      onCancel: () => {},
      onConfirm: () => handleDelete(id),
    });
  };
  const handleDelete = async (id: number) => {
    //use instance put method
    const ids = bank.subCategories
      ?.filter((item) => item.id != id)
      .map((item) => item.id);

    try {
      const data: BankResponse = await instance
        .put(`bank/${bank.quizBankId}/subCategory`, {
          json: {
            subCategories: ids,
          },
        })
        .json();
      setBank(data);
      notifications.show({
        color: "green",
        title: "SUCCESS",
        message: "Delete subcategory successfully",
      });
    } catch (error) {
      notifications.show({
        color: "red",
        title: "ERROR",
        message: "Failed to delete subcategory",
      });
    }
  };
  return (
    <>
      <Table striped withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Category</Table.Th>
            <Table.Th>Subcategory</Table.Th>
            <Table.Th>Delete</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {transformedArray.map((item) => (
            <React.Fragment key={item.categoryId}>
              {/* Render the category row */}
              <Table.Tr>
                <Table.Td rowSpan={item.subcategories.length}>
                  {item.categoryName}
                </Table.Td>
                {/* Render the subcategory row for the first subcategory */}
                <Table.Td>{item.subcategories[0].name}</Table.Td>
                {/* Render the EditCategoryButton for the first subcategory */}
                <Table.Td>
                  <ActionIcon
                    bg={"red"}
                    onClick={() => {
                      showConfirmDelete(item.subcategories[0].id);
                    }}
                  >
                    <IconTrash></IconTrash>
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>
              {/* Render additional rows for each remaining subcategory */}
              {item.subcategories.slice(1).map((sub, index) => (
                <Table.Tr key={sub.id}>
                  <Table.Td>{sub.name}</Table.Td>
                  {/* Render an empty cell for EditCategoryButton since it's already rendered in the first row */}
                  <Table.Td>
                    <ActionIcon
                      bg={"red"}
                      onClick={() => {
                        showConfirmDelete(sub.id);
                      }}
                    >
                      <IconTrash></IconTrash>
                    </ActionIcon>
                  </Table.Td>
                  <Table.Td></Table.Td>
                </Table.Tr>
              ))}
            </React.Fragment>
          ))}
        </Table.Tbody>
      </Table>
    </>
  );
};

export default CategoryList;
