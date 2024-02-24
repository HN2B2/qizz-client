import {
  Avatar,
  Card,
  Collapse,
  Grid,
  Group,
  ScrollArea,
  Title,
} from "@mantine/core";
import React from "react";
import { Image, Text } from "@mantine/core";
import { IconMenu2, IconTrash } from "@tabler/icons-react";
import { BankResponse } from "@/types/bank";

function BankCard({ bank }: { bank: BankResponse }) {
  return (
    <>
      <Card
        shadow="sm"
        component="a"
        href={`bank/${bank.quizBankId}/edit`}
        withBorder
        // target="_blank"
      >
        <Grid>
          <Grid.Col span={3}>
            <Card.Section p={"sm"}>
              <Image
                src={
                  bank.featuresImage ||
                  "https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                }
                w={90}
                h={90}
                alt="No way!"
                radius={"sm"}
              />
            </Card.Section>
          </Grid.Col>

          <Grid.Col span={9}>
            <Card.Section pr={"sm"}>
              <Title order={4} lineClamp={1}>
                {bank.name}
              </Title>
              <Text mt="xs" c="dimmed" size="sm" lineClamp={2}>
                {bank.description}
              </Text>
              <Group justify="space-between">
                <Group>
                  <IconMenu2 size="1rem" stroke={1.5} />
                  <Text>
                    {bank.totalQuestions ? 0 : bank.totalQuestions} Questions
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
            </Card.Section>
          </Grid.Col>
        </Grid>
      </Card>
    </>
  );
}

export default BankCard;
