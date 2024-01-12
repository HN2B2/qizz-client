import { UserLayout } from "@/components/layouts";
import {
  Avatar,
  Burger,
  Button,
  Card,
  Container,
  Fieldset,
  Flex,
  Grid,
  Group,
  Menu,
  Paper,
  SimpleGrid,
  Skeleton,
  Tabs,
  Text,
  UnstyledButton,
  rem,
  useMantineTheme,
  Image,
  TextInput,
  ScrollArea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import cx from "clsx";
import {
  IconChevronDown,
  IconHeart,
  IconLogout,
  IconMessage,
  IconMessageCircle,
  IconPhoto,
  IconPlayerPause,
  IconSettings,
  IconStar,
  IconSwitchHorizontal,
  IconTrash,
  IconBuildingBank,
  IconHistory,
  IconShare,
  IconEdit,
  IconBurger,
  IconMenu2,
  IconUniverse,
  IconSchool,
  IconCheckbox,
  IconPlayerRecordFilled,
  IconPlayerRecord,
  IconArrowsLeftRight,
  IconSearch,
  IconDotsVertical,
} from "@tabler/icons-react";
import React, { ChangeEvent, useRef, useState } from "react";
import { BreadCrumbsItem } from "@/components/layouts/UserLayout";
const user = {
  name: "Jane Spoonfighter",
  email: "janspoon@fighter.dev",
  image:
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png",
};

// import classes from "./Profile.module.css";

const tabs = ["Your Banks", "Favorite Banks", "History Quizzes"];
const PRIMARY_COL_HEIGHT = rem(300);

const navbarItems = [
  {
    title: "Test",
    link: "/",
    author: "Quynh",
    // icon: <IconHome size="1rem" stroke={1.5} />,
  },
];
const groceries = [
  {
    question_type: "Multichoice",
    question: "Quy khung",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    icon_typeQuestion: <IconCheckbox size="1rem" stroke={1.5} />,
    icon_choice: <IconPlayerRecordFilled size="1rem" stroke={1.5} />,
    icon_nochoice: <IconPlayerRecord size="1rem" stroke={1.5} />,
    // icon: <IconHome size="1rem" stroke={1.5} />,
  },
  {
    question_type: "Multichoice",
    question: "Quy khung 2 2 2 2 2 2 2 2 2 2 2 ",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    icon_typeQuestion: <IconCheckbox size="1rem" stroke={1.5} />,
    icon_choice: <IconPlayerRecordFilled size="1rem" stroke={1.5} />,
    icon_nochoice: <IconPlayerRecord size="1rem" stroke={1.5} />,
    // icon: <IconHome size="1rem" stroke={1.5} />,
  },
];

const index = () => {
  const iconStyle = { width: rem(16), height: rem(16) };
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const item = tabs.map((tab) => (
    <Tabs.Tab value={tab} key={tab}>
      {tab}
    </Tabs.Tab>
  ));

  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 -
      var(--mantine-spacing-md) / 2)`;
  const navbarItem = navbarItems.map((item, index) => (
    <div
      key={index}
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ fontWeight: "bold" }}> {item.title}</div>
      <div style={{ fontSize: "10px" }}>theo {item.author}</div>
    </div>
  ));
  const viewportRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [hovered, setHovered] = useState(-1);
  const filtered = groceries.filter((item) =>
    item.question.toLowerCase().includes(query.toLowerCase())
  );

  const items = filtered.map((item, index) => (
    <div
      // data-list-item
      // key={item}
      style={{
        display: "flex",
        flexDirection: "column",
        background: hovered === index ? "#f5f5f5" : "white",

        width: "100%",
        height: "100%",
        border: "1px solid #f5f5f5",
        paddingBottom: "10px",
        paddingTop: "10px",
      }}
    >
      <div>
        {item.icon_typeQuestion} {item.question}
      </div>
      <div>
        {item.icon_choice} {item.answers[0]}
      </div>
      <div>
        {item.icon_choice} {item.answers[1]}
      </div>
      <div>
        {item.icon_choice} {item.answers[2]}
      </div>
      <div>
        {item.icon_nochoice} {item.answers[3]}
      </div>
    </div>
  ));
  return (
    <UserLayout title="Profile">
      <Container my="md">
        <SimpleGrid cols={{ base: 2, sm: 1 }} spacing="md">
          <Grid gutter="md" h={SECONDARY_COL_HEIGHT}>
            <Grid.Col h={SECONDARY_COL_HEIGHT}>
              <Grid>
                <Grid.Col span={5}>
                  <Grid>
                    <Grid.Col span={5}>
                      <Avatar
                        variant="filled"
                        radius="100%"
                        src=""
                        w={SECONDARY_COL_HEIGHT}
                        h={SECONDARY_COL_HEIGHT}
                      />
                    </Grid.Col>

                    <Grid.Col span={5}>
                      <SimpleGrid cols={1} p={0}>
                        <div>Nguyen Quynh</div>
                        <div>@quynhnthe171282</div>
                      </SimpleGrid>
                    </Grid.Col>
                  </Grid>
                </Grid.Col>
                <Grid.Col span={3}></Grid.Col>
                <Grid.Col span={4}>
                  <SimpleGrid cols={1} p={0}>
                    <div>
                      <SimpleGrid cols={2}>
                        <div>
                          {" "}
                          <Button
                            variant="gradient"
                            gradient={{ from: "blue", to: "cyan", deg: 90 }}
                            leftSection={<IconShare style={iconStyle} />}
                          >
                            Share profile
                          </Button>
                        </div>
                        <div>
                          <Button
                            variant="gradient"
                            gradient={{ from: "blue", to: "cyan", deg: 90 }}
                            leftSection={<IconEdit style={iconStyle} />}
                          >
                            Edit profile
                          </Button>
                        </div>
                      </SimpleGrid>
                    </div>
                    <div></div>
                    <div></div>
                    <div>
                      <SimpleGrid cols={3}>
                        <div>
                          <SimpleGrid cols={1}>
                            <div
                              style={{
                                margin: "auto",
                              }}
                            >
                              0
                            </div>
                            <div
                              style={{
                                margin: "auto",
                              }}
                            >
                              Banks
                            </div>
                          </SimpleGrid>
                        </div>
                        <div>
                          <SimpleGrid cols={1}>
                            <div
                              style={{
                                margin: "auto",
                              }}
                            >
                              0
                            </div>
                            <div
                              style={{
                                margin: "auto",
                              }}
                            >
                              Favorites
                            </div>
                          </SimpleGrid>
                        </div>
                        <div>
                          <SimpleGrid cols={1}>
                            <div
                              style={{
                                margin: "auto",
                              }}
                            >
                              0
                            </div>
                            <div
                              style={{
                                margin: "auto",
                              }}
                            >
                              Quizzes
                            </div>
                          </SimpleGrid>
                        </div>
                      </SimpleGrid>
                    </div>
                  </SimpleGrid>
                </Grid.Col>
              </Grid>
            </Grid.Col>
            <Grid.Col h={SECONDARY_COL_HEIGHT}>
              <Tabs defaultValue="Your_banks" mt={10}>
                <Tabs.List>
                  <Tabs.Tab
                    value="Your_banks"
                    leftSection={<IconBuildingBank style={iconStyle} />}
                  >
                    Your banks
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="Favorite_banks"
                    leftSection={<IconHeart style={iconStyle} />}
                  >
                    Favorite banks
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="History_quizzes"
                    leftSection={<IconHistory style={iconStyle} />}
                  >
                    History quizzes
                  </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="Your_banks" mt={10}>
                  <Grid gutter="md">
                    <Grid.Col span={4}>
                      <SimpleGrid cols={1}>
                        <div
                          style={{
                            border: "1px solid #f5f5f5",
                            borderRadius: 5,
                            padding: 5,
                          }}
                        >
                          1 results
                        </div>
                        <div style={{ height: SECONDARY_COL_HEIGHT }}>
                          <Card
                            shadow="sm"
                            padding="xl"
                            component="a"
                            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                            target="_blank"
                          >
                            <Card.Section>
                              <Image
                                src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                                h={100}
                                alt="No way!"
                              />
                            </Card.Section>

                            <Text fw={500} size="lg" mt="md">
                              Test
                            </Text>

                            {/* <Text mt="xs" c="dimmed" size="sm"> */}
                            <SimpleGrid cols={2}>
                              <div>
                                <SimpleGrid cols={1}>
                                  <div
                                    style={{
                                      margin: "auto",
                                    }}
                                  >
                                    {<IconMenu2 style={iconStyle} />} 0
                                  </div>
                                </SimpleGrid>
                              </div>
                              <div>
                                <SimpleGrid cols={1}>
                                  <div>
                                    {<IconSchool style={iconStyle} />} 0
                                  </div>
                                </SimpleGrid>
                              </div>
                            </SimpleGrid>
                            {/* </Text> */}
                          </Card>
                        </div>
                      </SimpleGrid>
                    </Grid.Col>
                    <Grid.Col
                      span={8}
                      style={{ border: "2px solid #f5f5f5", borderRadius: 5 }}
                      mt={10}
                      bg={"#white"}
                      h={PRIMARY_COL_HEIGHT}
                    >
                      <Grid.Col
                        style={{ border: "2px solid #f5f5f5", borderRadius: 5 }}
                        // mt={10}
                        bg={"#f5f5f5"}
                        h={"100%"}
                      >
                        <>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            {navbarItem}
                            <Grid.Col h={SECONDARY_COL_HEIGHT}>
                              <Grid>
                                <Grid.Col span={2} p={0} mt={10}>
                                  <Menu
                                    trigger="hover"
                                    openDelay={100}
                                    closeDelay={400}
                                  >
                                    <Menu.Target>
                                      <Button>Play</Button>
                                    </Menu.Target>

                                    <Menu.Dropdown>
                                      <Menu.Item
                                        leftSection={
                                          <IconSettings
                                            style={{
                                              width: rem(14),
                                              height: rem(14),
                                            }}
                                          />
                                        }
                                      >
                                        Settings
                                      </Menu.Item>
                                      <Menu.Divider />
                                      <Menu.Item
                                        leftSection={
                                          <IconMessageCircle
                                            style={{
                                              width: rem(14),
                                              height: rem(14),
                                            }}
                                          />
                                        }
                                      >
                                        Messages
                                      </Menu.Item>
                                    </Menu.Dropdown>
                                  </Menu>
                                </Grid.Col>
                                <Grid.Col span={1} p={0} mt={10}>
                                  <Menu
                                    trigger="hover"
                                    openDelay={100}
                                    closeDelay={400}
                                  >
                                    <Menu.Target>
                                      <Button p={3} variant="subtle">
                                        <IconDotsVertical />
                                      </Button>
                                    </Menu.Target>

                                    <Menu.Dropdown>
                                      <Menu.Item
                                        leftSection={
                                          <IconSettings
                                            style={{
                                              width: rem(14),
                                              height: rem(14),
                                            }}
                                          />
                                        }
                                      >
                                        Settings
                                      </Menu.Item>
                                      <Menu.Divider />
                                      <Menu.Item
                                        leftSection={
                                          <IconMessageCircle
                                            style={{
                                              width: rem(14),
                                              height: rem(14),
                                            }}
                                          />
                                        }
                                      >
                                        Messages
                                      </Menu.Item>
                                    </Menu.Dropdown>
                                  </Menu>
                                </Grid.Col>
                                <Grid.Col span={"auto"}></Grid.Col>
                              </Grid>
                            </Grid.Col>
                          </div>
                          <div
                            // value={query}
                            onChange={(
                              event: ChangeEvent<HTMLInputElement>
                            ) => {
                              setQuery(event.target.value);
                              setHovered(-1);
                            }}
                            onKeyDown={(event) => {
                              if (event.key === "ArrowDown") {
                                event.preventDefault();
                                setHovered((current) => {
                                  const nextIndex =
                                    current + 1 >= filtered.length
                                      ? current
                                      : current + 1;
                                  viewportRef.current
                                    ?.querySelectorAll("[data-list-item]")
                                    ?.[nextIndex]?.scrollIntoView({
                                      block: "nearest",
                                    });
                                  return nextIndex;
                                });
                              }

                              if (event.key === "ArrowUp") {
                                event.preventDefault();
                                setHovered((current) => {
                                  const nextIndex =
                                    current - 1 < 0 ? current : current - 1;
                                  viewportRef.current
                                    ?.querySelectorAll("[data-list-item]")
                                    ?.[nextIndex]?.scrollIntoView({
                                      block: "nearest",
                                    });
                                  return nextIndex;
                                });
                              }
                            }}
                            // placeholder="Search groceries"
                          ></div>
                          <ScrollArea
                            h={150}
                            type="always"
                            mt="md"
                            viewportRef={viewportRef}
                          >
                            {items}
                          </ScrollArea>
                        </>
                      </Grid.Col>
                    </Grid.Col>
                  </Grid>
                </Tabs.Panel>
              </Tabs>
            </Grid.Col>
          </Grid>
        </SimpleGrid>
      </Container>
    </UserLayout>
  );
};

export default index;
