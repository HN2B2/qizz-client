import React, { useState } from "react";
import {
  Container,
  Grid,
  Flex,
  Button,
  Box,
  Skeleton,
  Center,
  Paper,
  NumberInput,
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
import { IconPhoto, IconDownload, IconArrowRight } from "@tabler/icons-react";
import Category from "@/types/category/Category"; //Category from "@/types/category/Category";
import QuizBank from "@/types/quizBank/QuizBank";
import Link from "../../../node_modules/next/link";

interface CategoryQuizBanks extends Category {
  quizBanks: QuizBank[];
}

const listCategories: CategoryQuizBanks[] = [
  {
    id: 1,
    name: "lorem ipsumf",
    description:
      "orem ipsum fdcvgfdg đfgfd gfdfd rem ipsum fdcvgfdg đfgfd gf rem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gf",
    createdAt: "",
    modifiedAt: "",
    quizBanks: [
      {
        id: 1,
        name: "lorem ipsum",
        description:
          "orem ipsum fdcvgfdg đfgfd gfdfd rem ipsum fdcvgfdg đfgfd gf rem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gf",
        featuredImage: "",
        createdAt: "",
        modifiedAt: "",
        publicable: true,
        publicEditable: true,
      },
      {
        id: 2,
        name: "lorem ipsum",
        description:
          "orem ipsum fdcvgfdg đfgfd gfdfd rem ipsum fdcvgfdg đfgfd gf rem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gf",
        featuredImage: "",
        createdAt: "",
        modifiedAt: "",
        publicable: true,
        publicEditable: true,
      },
      {
        id: 3,
        name: "lorem ipsum",
        description:
          "orem ipsum fdcvgfdg đfgfd gfdfd rem ipsum fdcvgfdg đfgfd gf rem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gf",
        featuredImage: "",
        createdAt: "",
        modifiedAt: "",
        publicable: true,
        publicEditable: true,
      },
      {
        id: 4,
        name: "lorem ipsum",
        description:
          "orem ipsum fdcvgfdg đfgfd gfdfd rem ipsum fdcvgfdg đfgfd gf rem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gf",
        featuredImage: "",
        createdAt: "",
        modifiedAt: "",
        publicable: true,
        publicEditable: true,
      },
      {
        id: 5,
        name: "lorem ipsum",
        description:
          "orem ipsum fdcvgfdg đfgfd gfdfd rem ipsum fdcvgfdg đfgfd gf rem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gf",
        featuredImage: "",
        createdAt: "",
        modifiedAt: "",
        publicable: true,
        publicEditable: true,
      },
      {
        id: 6,
        name: "lorem ipsum",
        description:
          "orem ipsum fdcvgfdg đfgfd gfdfd rem ipsum fdcvgfdg đfgfd gf rem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gf",
        featuredImage: "",
        createdAt: "",
        modifiedAt: "",
        publicable: true,
        publicEditable: true,
      },
    ],
  },
  {
    id: 2,
    name: "lorem ",
    description:
      "orem ipsum fdcvgfdg đfgfd gfdfd rem ipsum fdcvgfdg đfgfd gf rem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gf",
    createdAt: "",
    modifiedAt: "",
    quizBanks: [
      {
        id: 1,
        name: "lorem ipsum",
        description:
          "orem ipsum fdcvgfdg đfgfd gfdfd rem ipsum fdcvgfdg đfgfd gf rem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gf",
        featuredImage: "",
        createdAt: "",
        modifiedAt: "",
        publicable: true,
        publicEditable: true,
      },
      {
        id: 2,
        name: "lorem ipsum",
        description:
          "orem ipsum fdcvgfdg đfgfd gfdfd rem ipsum fdcvgfdg đfgfd gf rem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gf",
        featuredImage: "",
        createdAt: "",
        modifiedAt: "",
        publicable: true,
        publicEditable: true,
      },
      {
        id: 3,
        name: "lorem ipsum",
        description:
          "orem ipsum fdcvgfdg đfgfd gfdfd rem ipsum fdcvgfdg đfgfd gf rem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gf",
        featuredImage: "",
        createdAt: "",
        modifiedAt: "",
        publicable: true,
        publicEditable: true,
      },
      {
        id: 4,
        name: "lorem ipsum",
        description:
          "orem ipsum fdcvgfdg đfgfd gfdfd rem ipsum fdcvgfdg đfgfd gf rem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gf",
        featuredImage: "",
        createdAt: "",
        modifiedAt: "",
        publicable: true,
        publicEditable: true,
      },
      {
        id: 5,
        name: "lorem ipsum",
        description:
          "orem ipsum fdcvgfdg đfgfd gfdfd rem ipsum fdcvgfdg đfgfd gf rem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gf",
        featuredImage: "",
        createdAt: "",
        modifiedAt: "",
        publicable: true,
        publicEditable: true,
      },
      {
        id: 6,
        name: "lorem ipsum",
        description:
          "orem ipsum fdcvgfdg đfgfd gfdfd rem ipsum fdcvgfdg đfgfd gf rem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gf",
        featuredImage: "",
        createdAt: "",
        modifiedAt: "",
        publicable: true,
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
        id: 1,
        name: "lorem ipsum",
        description:
          "orem ipsum fdcvgfdg đfgfd gfdfd rem ipsum fdcvgfdg đfgfd gf rem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gf",
        featuredImage: "",
        createdAt: "",
        modifiedAt: "",
        publicable: true,
        publicEditable: true,
      },
      {
        id: 2,
        name: "lorem ipsum",
        description:
          "orem ipsum fdcvgfdg đfgfd gfdfd rem ipsum fdcvgfdg đfgfd gf rem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gf",
        featuredImage: "",
        createdAt: "",
        modifiedAt: "",
        publicable: true,
        publicEditable: true,
      },
      {
        id: 3,
        name: "lorem ipsum",
        description:
          "orem ipsum fdcvgfdg đfgfd gfdfd rem ipsum fdcvgfdg đfgfd gf rem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gf",
        featuredImage: "",
        createdAt: "",
        modifiedAt: "",
        publicable: true,
        publicEditable: true,
      },
      {
        id: 4,
        name: "lorem ipsum",
        description:
          "orem ipsum fdcvgfdg đfgfd gfdfd rem ipsum fdcvgfdg đfgfd gf rem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gf",
        featuredImage: "",
        createdAt: "",
        modifiedAt: "",
        publicable: true,
        publicEditable: true,
      },
      {
        id: 5,
        name: "lorem ipsum",
        description:
          "orem ipsum fdcvgfdg đfgfd gfdfd rem ipsum fdcvgfdg đfgfd gf rem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gf",
        featuredImage: "",
        createdAt: "",
        modifiedAt: "",
        publicable: true,
        publicEditable: true,
      },
      {
        id: 6,
        name: "lorem ipsum",
        description:
          "orem ipsum fdcvgfdg đfgfd gfdfd rem ipsum fdcvgfdg đfgfd gf rem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gfrem ipsum fdcvgfdg đfgfd gf",
        featuredImage: "",
        createdAt: "",
        modifiedAt: "",
        publicable: true,
        publicEditable: true,
      },
    ],
  },
];
const index = () => {
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
    <>
      <Container
        size="xl"
        // fluid
        // px="xl"
        // py="xl"
        // bg="var(--mantine-color-blue-light)"
      >
        <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: "xl" }}>
          <Grid.Col span={{ base: 12, md: 8, lg: 8, xs: 7 }}>
            <Paper
              // w={{ base: 200, sm: 400, lg: 500 }}
              py={{ base: "xs", sm: "md", lg: "xl" }}
              //   bg={{ base: "blue.7", sm: "red.7", lg: "green.7" }}
              //   bg="#ccc"
              c="#fff"
              ta="center"
              m="auto"
              radius="md"
              h="100%"
              shadow="md"
              withBorder
              mih="300"
              //center vertical
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <form onSubmit={form.onSubmit(console.log)}>
                {/* <Flex
                  gap="xs"
                  justify="center"
                  align="center"
                  direction="row"
                  wrap="wrap"
                > */}
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
                  shadow="md"
                  size="lg"
                  radius="md"
                  mt="xs"
                >
                  Join
                </Button>
                {/* </Flex> */}
              </form>
            </Paper>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4, lg: 4, xs: 5 }}>
            {/* <Paper
              // w={{ base: 200, sm: 400, lg: 500 }}
              py={{ base: "xs", sm: "md", lg: "xl" }}
              //   bg={{ base: "blue.7", sm: "red.7", lg: "green.7" }}
              bg="#ccc"
              c="#fff"
              ta="center"
              mx="auto"
              radius="lg"
            >
              Box with responsive style props
            </Paper> */}
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
                href="#"
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
          {/* <Carousel.Slide>5</Carousel.Slide> */}
          {/* ...other slides */}
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
                <Grid.Col span={{ base: 6, md: 3, lg: 3 }}>
                  <QuizCard
                    title={quizBank.name}
                    description={quizBank.description}
                    image={quizBank.featuredImage}
                    totalJoins={0}
                    totalQuestions={0}
                  ></QuizCard>
                </Grid.Col>
              ))}
            </Grid>
          </React.Fragment>
        ))}
      </Container>
    </>
  );
};

export default index;
