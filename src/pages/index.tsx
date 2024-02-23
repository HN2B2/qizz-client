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
import Bank from "@/types/bank/BankResponse";
import Link from "next/link";
import { HeaderLayout } from "@/components/layouts";
import UserResponse, { UserRole } from "@/types/user/UserResponse";
import useUser from "@/hooks/useUser";

interface CategoryQuizBanks extends Category {
  quizBanks: Bank[];
}
const PopularQuiz = () => {
  const icon = <IconInfoCircle />;

  return (
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
  );
};
const Home = () => {
  const [data, setData] = useState([]);
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

  const { user } = useUser();

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
                {user?.displayName || "Login to view your profile"}
              </Text>
              <Text ta="center" c="dimmed" fz="sm">
                @{user?.username || ""}
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
        <Title order={1} my="xl" w="100%" ta="left">
          Popular Quizzes
        </Title>
        <PopularQuiz />
        {/* {data &&
                    data.map((item) => (
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
                                    <Grid.Col
                                        span={{ base: 6, md: 3, lg: 3 }}
                                        key={quizBank.id}
                                    >
                                        <QuizCard
                                            title={quizBank.name}
                                            description={quizBank.description}
                                            image={quizBank.featuresImage}
                                            totalJoins={0}
                                            totalQuestions={
                                                quizBank.totalQuestions
                                            }
                                        ></QuizCard>
                                    </Grid.Col>
                                ))}
                            </Grid>
                        </React.Fragment>
                    ))} */}
      </Container>
    </HeaderLayout>
  );
};

export default Home;
