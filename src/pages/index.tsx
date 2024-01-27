import React, { useState } from "react";
import {
  Container,
  Grid,
  Button,
  Paper,
  TextInput,
  Text,
  Avatar,
  Blockquote,
  Title,
  Group,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { Carousel } from "@mantine/carousel";
import { useForm } from "@mantine/form";
import QuizCard from "@/components/cards/QuizCard";
import Category from "@/types/category/Category";
import Bank from "@/types/bank/Bank";
import Link from "next/link";
import { HeaderLayout } from "@/components/layouts";

interface CategoryQuizBanks extends Category {
  quizBanks: Bank[];
}

const listCategories: CategoryQuizBanks[] = [
  {
    id: 2,
    name: "lorem ",
    description:
      "orem ipsum fdcvgfdg đfgfd gfdfd rem ipsum fdcvgfdg đfgfd gf rem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gf",
    createdAt: "",
    modifiedAt: "",
    quizBanks: [
      {
        quizBankId: 403,
        name: "Bank thu n ne",
        description: null,
        featuresImage: null,
        createdAt: "2024-01-22T07:12:20.658+00:00",
        modifiedAt: "2024-01-22T07:12:20.658+00:00",
        quizPublicity: true,
        publicEditable: true,
        subCategories: null,
        draft: false,
        totalQuestions: 0,
        createdBy: {
          id: 2,
          username: "admin3",
          email: "admin@xyz.co",
          displayName: "Wacky Noodle",
          role: "USER",
        },
        modifiedBy: {
          id: 2,
          username: "admin3",
          email: "admin@xyz.co",
          displayName: "Wacky Noodle",
          role: "USER",
        },
        totalUpVotes: 0,
      },

      {
        quizBankId: 2,
        name: "lorem ipsum",
        description:
          "orem ipsum fdcvgfdg đfgfd gfdfd rem ipsum fdcvgfdg đfgfd gf rem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gf",
        featuresImage: "",
        createdAt: "",
        modifiedAt: "",
        quizPublicity: true,
        publicEditable: true,
      },
      {
        quizBankId: 3,
        name: "lorem ipsum",
        description:
          "orem ipsum fdcvgfdg đfgfd gfdfd rem ipsum fdcvgfdg đfgfd gf rem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gf",
        featuresImage: "",
        createdAt: "",
        modifiedAt: "",
        quizPublicity: true,
        publicEditable: true,
      },
      {
        quizBankId: 4,
        name: "lorem ipsum",
        description:
          "orem ipsum fdcvgfdg đfgfd gfdfd rem ipsum fdcvgfdg đfgfd gf rem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gf",
        featuresImage: "",
        createdAt: "",
        modifiedAt: "",
        quizPublicity: true,
        publicEditable: true,
      },
      {
        quizBankId: 5,
        name: "lorem ipsum",
        description:
          "orem ipsum fdcvgfdg đfgfd gfdfd rem ipsum fdcvgfdg đfgfd gf rem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gf",
        featuresImage: "",
        createdAt: "",
        modifiedAt: "",
        quizPublicity: true,
        publicEditable: true,
      },
      {
        quizBankId: 6,
        name: "lorem ipsum",
        description:
          "orem ipsum fdcvgfdg đfgfd gfdfd rem ipsum fdcvgfdg đfgfd gf rem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gf",
        featuresImage: "",
        createdAt: "",
        modifiedAt: "",
        quizPublicity: true,
        publicEditable: true,
      },
    ],
  },
  {
    quizBankId: 2,
    name: "lorem ",
    description:
      "orem ipsum fdcvgfdg đfgfd gfdfd rem ipsum fdcvgfdg đfgfd gf rem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gf",
    createdAt: "",
    modifiedAt: "",
    quizBanks: [
      {
        quizBankId: 1,
        name: "lorem ipsum",
        description:
          "orem ipsum fdcvgfdg đfgfd gfdfd rem ipsum fdcvgfdg đfgfd gf rem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gf",
        featuresImage: "",
        createdAt: "",
        modifiedAt: "",
        quizPublicity: true,
        publicEditable: true,
      },
      {
        quizBankId: 2,
        name: "lorem ipsum",
        description:
          "orem ipsum fdcvgfdg đfgfd gfdfd rem ipsum fdcvgfdg đfgfd gf rem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gf",
        featuresImage: "",
        createdAt: "",
        modifiedAt: "",
        quizPublicity: true,
        publicEditable: true,
      },
      {
        quizBankId: 3,
        name: "lorem ipsum",
        description:
          "orem ipsum fdcvgfdg đfgfd gfdfd rem ipsum fdcvgfdg đfgfd gf rem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gf",
        featuresImage: "",
        createdAt: "",
        modifiedAt: "",
        quizPublicity: true,
        publicEditable: true,
      },
      {
        quizBankId: 4,
        name: "lorem ipsum",
        description:
          "orem ipsum fdcvgfdg đfgfd gfdfd rem ipsum fdcvgfdg đfgfd gf rem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gf",
        featuresImage: "",
        createdAt: "",
        modifiedAt: "",
        quizPublicity: true,
        publicEditable: true,
      },
      {
        quizBankId: 5,
        name: "lorem ipsum",
        description:
          "orem ipsum fdcvgfdg đfgfd gfdfd rem ipsum fdcvgfdg đfgfd gf rem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gf",
        featuresImage: "",
        createdAt: "",
        modifiedAt: "",
        quizPublicity: true,
        publicEditable: true,
      },
      {
        quizBankId: 6,
        name: "lorem ipsum",
        description:
          "orem ipsum fdcvgfdg đfgfd gfdfd rem ipsum fdcvgfdg đfgfd gf rem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gf",
        featuresImage: "",
        createdAt: "",
        modifiedAt: "",
        quizPublicity: true,
        publicEditable: true,
      },
    ],
  },
  {
    id: 3,
    name: "lorem ipsum f",
    description:
      "orem ipsum fdcvgfdg đfgfd gfdfd rem ipsum fdcvgfdg đfgfd gf rem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gf",
    createdAt: "",
    modifiedAt: "",
    quizBanks: [
      {
        quizBankId: 1,
        name: "lorem ipsum",
        description:
          "orem ipsum fdcvgfdg đfgfd gfdfd rem ipsum fdcvgfdg đfgfd gf rem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gf",
        featuresImage: "",
        createdAt: "",
        modifiedAt: "",
        quizPublicity: true,
        publicEditable: true,
      },
      {
        quizBankId: 2,
        name: "lorem ipsum",
        description:
          "orem ipsum fdcvgfdg đfgfd gfdfd rem ipsum fdcvgfdg đfgfd gf rem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gf",
        featuresImage: "",
        createdAt: "",
        modifiedAt: "",
        quizPublicity: true,
        publicEditable: true,
      },
      {
        quizBankId: 3,
        name: "lorem ipsum",
        description:
          "orem ipsum fdcvgfdg đfgfd gfdfd rem ipsum fdcvgfdg đfgfd gf rem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gf",
        featuresImage: "",
        createdAt: "",
        modifiedAt: "",
        quizPublicity: true,
        publicEditable: true,
      },
      {
        quizBankId: 4,
        name: "lorem ipsum",
        description:
          "orem ipsum fdcvgfdg đfgfd gfdfd rem ipsum fdcvgfdg đfgfd gf rem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gf",
        featuresImage: "",
        createdAt: "",
        modifiedAt: "",
        quizPublicity: true,
        publicEditable: true,
      },
      {
        quizBankId: 5,
        name: "lorem ipsum",
        description:
          "orem ipsum fdcvgfdg đfgfd gfdfd rem ipsum fdcvgfdg đfgfd gf rem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gf",
        featuresImage: "",
        createdAt: "",
        modifiedAt: "",
        quizPublicity: true,
        publicEditable: true,
      },
    ],
  },
];
const Home = () => {
  const [data, setData] = useState(listCategories);
  const icon = <IconInfoCircle />;
  const form = useForm({
    initialValues: { code: "" },

    // functions will be used to validate values at corresponding key
    validate: {
      code: (value: string) => {
        if (!/^\d{6}$/.test(value)) {
          return "Name must be 6 numbers";
        } else if (value !== "000000") {
          return "Invalid code";
        }
        return null;
      },
    },
  });

  return (
    <HeaderLayout>
      <Container size="xl">
        <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: "xl" }}>
          <Grid.Col span={{ base: 12, md: 8, lg: 8, xs: 7 }}>
            <Paper
              py={{ base: "xs", sm: "md", lg: "xl" }}
              c="#fff"
              ta="center"
              m="auto"
              radius="md"
              h="100%"
              shadow="md"
              withBorder
              mih="300"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <form onSubmit={form.onSubmit(console.log)}>
                <TextInput
                  placeholder="Enter code: "
                  w={{ base: 300, sm: 400, lg: 500 }}
                  size="lg"
                  mx="auto"
                  radius="md"
                  {...form.getInputProps("code")}
                />
                <Button
                  variant="filled"
                  type="submit"
                  size="lg"
                  radius="md"
                  mt="xs"
                >
                  Join
                </Button>
              </form>
            </Paper>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4, lg: 4, xs: 5 }}>
            <Paper
              radius="md"
              withBorder
              p="lg"
              bg="var(--mantine-color-body)"
              h="100%"
              shadow="md"
            >
              <Avatar
                // src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
                size={120}
                radius={120}
                mx="auto"
              />
              <Text ta="center" fz="lg" fw={500} mt="md">
                Jane Fingerlicker
              </Text>
              <Text ta="center" c="dimmed" fz="sm">
                {"description" || "Login to view your profile"}
              </Text>

              <Button
                component="a"
                href="/profile/abc"
                variant="default"
                fullWidth
                mt="md"
              >
                View profile
              </Button>
            </Paper>
          </Grid.Col>
        </Grid>
        <Title order={1} my="xl" w="100%" ta="center">
          Here's what people say about us
        </Title>

        <Carousel
          withIndicators
          height={200}
          slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
          slideGap={{ base: 0, sm: "md" }}
          loop
          align="start"
        >
          <Carousel.Slide>
            <Blockquote color="blue" cite="– Forrest Gump" icon={icon} mt="xl">
              Life is like an npm install – you never know what you are going to
              get.
            </Blockquote>
          </Carousel.Slide>
          <Carousel.Slide>
            <Blockquote color="blue" cite="– Forrest Gump" icon={icon} mt="xl">
              Life is like an npm install – you never know what you are going to
              get.
            </Blockquote>
          </Carousel.Slide>
          <Carousel.Slide>
            <Blockquote color="blue" cite="– Forrest Gump" icon={icon} mt="xl">
              Life is like an npm install – you never know what you are going to
              get.
            </Blockquote>
          </Carousel.Slide>
          <Carousel.Slide>
            <Blockquote color="blue" cite="– Forrest Gump" icon={icon} mt="xl">
              Life is like an npm install – you never know what you are going to
              get.
            </Blockquote>
          </Carousel.Slide>
        </Carousel>
        {data.map((item) => (
          <React.Fragment key={item.id}>
            <Group justify="space-between">
              <Title order={1} my="xl" c="grey">
                {item.name}
              </Title>
              <Link href="#">
                <Button variant="outline">See more</Button>
              </Link>
            </Group>
            <Grid>
              {item.quizBanks.map((quizBank) => (
                <Grid.Col span={{ base: 6, md: 3, lg: 3 }} key={quizBank.id}>
                  <QuizCard
                    title={quizBank.name}
                    description={quizBank.description}
                    image={quizBank.featuresImage}
                    totalJoins={0}
                    totalQuestions={quizBank.totalQuestions}
                  ></QuizCard>
                </Grid.Col>
              ))}
            </Grid>
          </React.Fragment>
        ))}
      </Container>
    </HeaderLayout>
  );
};

export default Home;
