import {
  ActionIcon,
  Avatar,
  Card,
  Center,
  Collapse,
  Grid,
  Group,
  ScrollArea,
  Title,
} from "@mantine/core";
import React from "react";
import { Image, Text } from "@mantine/core";
import { IconMenu2, IconTrash, IconX } from "@tabler/icons-react";
import { BankResponse } from "@/types/bank";
import Link from "next/link";
import { modals } from "@mantine/modals";

function BankCard({
  bank,
  onDeleteBank,
}: {
  bank: BankResponse;
  onDeleteBank: (bankId: number) => Promise<void>;
}) {
  const showConfirmDeleteBank = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    bankId: number
  ) => {
    //how to prevent navigate link of a tag parent of this function
    event.preventDefault();
    modals.openConfirmModal({
      title: "Delete bank",
      children: "Are you sure you want to delete this bank?",
      labels: {
        confirm: "Delete",
        cancel: "Cancel",
      },
      onCancel: () => {},
      onConfirm: () => handleDeleteBank(bankId),
    });
  };

  const handleDeleteBank = async (bankId: number) => {
    try {
      await onDeleteBank(bankId); // Call the onDeleteBank callback from props
      // Update any other state or perform actions after deletion if necessary
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Card
        // shadow="sm"
        m={"sm"}
        component={Link}
        href={`bank/${bank.quizBankId}`}
        withBorder
        // p={"sm"}
        // target="_blank"
      >
        <Card.Section>
          <Grid>
            <Grid.Col span={3} p={"md"}>
              <Center>
                <Image
                  src={
                    bank.featuresImage ||
                    "https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                  }
                  // width={"100%"}
                  w="auto"
                  // w="100%"
                  fit="contain"
                  alt="No way!"
                  radius={"sm"}
                />
              </Center>
            </Grid.Col>

            <Grid.Col span={9} p={"md"}>
              <Group justify="space-between">
                <Title order={4} lineClamp={1}>
                  {bank.name}
                </Title>
                <ActionIcon
                  bg={"red"}
                  color={"white"}
                  size={"sm"}
                  onClick={(event) =>
                    showConfirmDeleteBank(event, bank.quizBankId)
                  }
                >
                  <IconX></IconX>
                </ActionIcon>
              </Group>

              <Text mt="xs" c="dimmed" size="sm" lineClamp={2}>
                {bank.description}
              </Text>
              <Group justify="space-between">
                <Group>
                  <IconMenu2 size="1rem" stroke={1.5} />
                  <Text>
                    {bank.totalQuestions ? bank.totalQuestions : 0} Questions
                  </Text>
                </Group>
                <Group>
                  <Text>
                    {bank.subCategories?.length ? "Subcategories: " : ""}
                    {bank.subCategories
                      ? bank.subCategories.map((sc) => sc.name).join(", ")
                      : ""}
                  </Text>
                </Group>
              </Group>
              <Group>
                <Avatar alt="it's me" />
                <Text>{bank.createdBy.displayName}</Text>
              </Group>
              {/* <IconTrash /> */}
            </Grid.Col>
          </Grid>
        </Card.Section>
      </Card>
    </>
  );
}

export default BankCard;
