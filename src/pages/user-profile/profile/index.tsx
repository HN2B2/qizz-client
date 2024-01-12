import { UserLayout } from "@/components/layouts";
import {
  Avatar,
  Burger,
  Container,
  Fieldset,
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
} from "@tabler/icons-react";
import React, { useState } from "react";
const user = {
  name: "Jane Spoonfighter",
  email: "janspoon@fighter.dev",
  image:
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png",
};

import classes from "./Profile.module.css";

const tabs = ["Your Banks", "Favorite Banks", "History Quizzes"];
const PRIMARY_COL_HEIGHT = rem(300);

const index = () => {
  const iconStyle = { width: rem(12), height: rem(12) };
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
      {/* <Fieldset legend="Personal information">
        <Avatar variant="filled" radius="sm" src="" />
        <Tabs defaultValue="gallery">
          <Tabs.List>
            <Tabs.Tab
              value="gallery"
              leftSection={<IconPhoto style={iconStyle} />}
            >
              Gallery
            </Tabs.Tab>
            <Tabs.Tab
              value="messages"
              leftSection={<IconMessageCircle style={iconStyle} />}
            >
              Messages
            </Tabs.Tab>
            <Tabs.Tab
              value="settings"
              leftSection={<IconSettings style={iconStyle} />}
            >
              Settings
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </Fieldset> */}
      {/* <div className={classes.header}>
        <Container className={classes.mainSection} size="md">
          <Group justify="space-between">
            <Avatar variant="filled" radius="sm" src="" size={50} />

            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="xs"
              size="sm"
            />

            <Menu
              width={260}
              position="bottom-end"
              transitionProps={{ transition: "pop-top-right" }}
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              withinPortal
            >
              <Menu.Target>
                <UnstyledButton
                  className={cx(classes.user, {
                    [classes.userActive]: userMenuOpened,
                  })}
                >
                  <Group gap={7}>
                    <Avatar
                      src={user.image}
                      alt={user.name}
                      radius="xl"
                      size={20}
                    />
                    <Text fw={500} size="sm" lh={1} mr={3}>
                      {user.name}
                    </Text>
                    <IconChevronDown
                      style={{ width: rem(12), height: rem(12) }}
                      stroke={1.5}
                    />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  leftSection={
                    <IconHeart
                      style={{ width: rem(16), height: rem(16) }}
                      color={theme.colors.red[6]}
                      stroke={1.5}
                    />
                  }
                >
                  Liked posts
                </Menu.Item>
                <Menu.Item
                  leftSection={
                    <IconStar
                      style={{ width: rem(16), height: rem(16) }}
                      color={theme.colors.yellow[6]}
                      stroke={1.5}
                    />
                  }
                >
                  Saved posts
                </Menu.Item>
                <Menu.Item
                  leftSection={
                    <IconMessage
                      style={{ width: rem(16), height: rem(16) }}
                      color={theme.colors.blue[6]}
                      stroke={1.5}
                    />
                  }
                >
                  Your comments
                </Menu.Item>

                <Menu.Label>Settings</Menu.Label>
                <Menu.Item
                  leftSection={
                    <IconSettings
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                >
                  Account settings
                </Menu.Item>
                <Menu.Item
                  leftSection={
                    <IconSwitchHorizontal
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                >
                  Change account
                </Menu.Item>
                <Menu.Item
                  leftSection={
                    <IconLogout
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                >
                  Logout
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item
                  leftSection={
                    <IconPlayerPause
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                >
                  Pause subscription
                </Menu.Item>
                <Menu.Item
                  color="red"
                  leftSection={
                    <IconTrash
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                >
                  Delete account
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Container>
        <Container size="md">
          <Tabs
            defaultValue="Home"
            variant="outline"
            visibleFrom="sm"
            classNames={{
              root: classes.tabs,
              list: classes.tabsList,
              tab: classes.tab,
            }}
          >
            <Tabs.List>{items}</Tabs.List>
          </Tabs>
        </Container>
      </div> */}

      <Container my="md">
        <SimpleGrid cols={{ base: 1, sm: 1 }} spacing="md">
          {/* <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} /> */}
          <Grid gutter="md">
            <Grid.Col>
              <Group justify="space-between" h={SECONDARY_COL_HEIGHT}>
                <Avatar
                  variant="filled"
                  radius="100%"
                  src=""
                  w={SECONDARY_COL_HEIGHT}
                  h={SECONDARY_COL_HEIGHT}
                />

                <Burger
                  opened={opened}
                  onClick={toggle}
                  hiddenFrom="xs"
                  size="sm"
                />

                <Menu
                  width={260}
                  position="bottom-end"
                  transitionProps={{ transition: "pop-top-right" }}
                  onClose={() => setUserMenuOpened(false)}
                  onOpen={() => setUserMenuOpened(true)}
                  withinPortal
                >
                  <Menu.Target>
                    <UnstyledButton
                      className={cx(classes.user, {
                        [classes.userActive]: userMenuOpened,
                      })}
                    >
                      <Group gap={7}>
                        <Avatar
                          src={user.image}
                          alt={user.name}
                          radius="xl"
                          size={20}
                        />
                        <Text fw={500} size="sm" lh={1} mr={3}>
                          {user.name}
                        </Text>
                        <IconChevronDown
                          style={{ width: rem(12), height: rem(12) }}
                          stroke={1.5}
                        />
                      </Group>
                    </UnstyledButton>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      leftSection={
                        <IconHeart
                          style={{ width: rem(16), height: rem(16) }}
                          color={theme.colors.red[6]}
                          stroke={1.5}
                        />
                      }
                    >
                      Liked posts
                    </Menu.Item>
                    <Menu.Item
                      leftSection={
                        <IconStar
                          style={{ width: rem(16), height: rem(16) }}
                          color={theme.colors.yellow[6]}
                          stroke={1.5}
                        />
                      }
                    >
                      Saved posts
                    </Menu.Item>
                    <Menu.Item
                      leftSection={
                        <IconMessage
                          style={{ width: rem(16), height: rem(16) }}
                          color={theme.colors.blue[6]}
                          stroke={1.5}
                        />
                      }
                    >
                      Your comments
                    </Menu.Item>

                    <Menu.Label>Settings</Menu.Label>
                    <Menu.Item
                      leftSection={
                        <IconSettings
                          style={{ width: rem(16), height: rem(16) }}
                          stroke={1.5}
                        />
                      }
                    >
                      Account settings
                    </Menu.Item>
                    <Menu.Item
                      leftSection={
                        <IconSwitchHorizontal
                          style={{ width: rem(16), height: rem(16) }}
                          stroke={1.5}
                        />
                      }
                    >
                      Change account
                    </Menu.Item>
                    <Menu.Item
                      leftSection={
                        <IconLogout
                          style={{ width: rem(16), height: rem(16) }}
                          stroke={1.5}
                        />
                      }
                    >
                      Logout
                    </Menu.Item>

                    <Menu.Divider />

                    <Menu.Label>Danger zone</Menu.Label>
                    <Menu.Item
                      leftSection={
                        <IconPlayerPause
                          style={{ width: rem(16), height: rem(16) }}
                          stroke={1.5}
                        />
                      }
                    >
                      Pause subscription
                    </Menu.Item>
                    <Menu.Item
                      color="red"
                      leftSection={
                        <IconTrash
                          style={{ width: rem(16), height: rem(16) }}
                          stroke={1.5}
                        />
                      }
                    >
                      Delete account
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>

              <Tabs defaultValue="Your banks" mt={10}>
                <Tabs.List>
                  <Tabs.Tab
                    value="Your banks"
                    leftSection={<IconBuildingBank style={iconStyle} />}
                  >
                    Your banks
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="Favorite banks"
                    leftSection={<IconHeart style={iconStyle} />}
                  >
                    Favorite banks
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="History quizzes"
                    leftSection={<IconHistory style={iconStyle} />}
                  >
                    History quizzes
                  </Tabs.Tab>
                </Tabs.List>
              </Tabs>
            </Grid.Col>
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
        </SimpleGrid>
      </Container>
    </UserLayout>
  );
};

export default index;
