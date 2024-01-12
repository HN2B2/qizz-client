import { UserLayout } from "@/components/layouts";
import {
  Avatar,
  Burger,
  Button,
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
} from "@tabler/icons-react";
import React, { useState } from "react";
const user = {
  name: "Jane Spoonfighter",
  email: "janspoon@fighter.dev",
  image:
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png",
};

// import classes from "./Profile.module.css";

const tabs = ["Your Banks", "Favorite Banks", "History Quizzes"];
const PRIMARY_COL_HEIGHT = rem(300);

const index = () => {
  const iconStyle = { width: rem(16), height: rem(16) };
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab} key={tab}>
      {tab}
    </Tabs.Tab>
  ));
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 -
      var(--mantine-spacing-md) / 2)`;
  return (
    <UserLayout title="Profile">
      <Container my="md">
        <SimpleGrid cols={{ base: 2, sm: 1 }} spacing="md">
          {/* <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} /> */}
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
                  <Grid gutter="md" h={SECONDARY_COL_HEIGHT}>
                    <Grid.Col span={4}>
                      <Skeleton
                        height={SECONDARY_COL_HEIGHT}
                        radius="md"
                        animate={false}
                      />
                    </Grid.Col>
                    <Grid.Col span={8}>
                      <Skeleton
                        height={SECONDARY_COL_HEIGHT}
                        radius="md"
                        animate={false}
                      />
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
