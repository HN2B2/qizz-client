import {
  Avatar,
  Button,
  CopyButton,
  Group,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import React from "react";
import Sharing from "./Sharing";

const ShareButton = () => {
  const openModal = () => {
    modals.openConfirmModal({
      title: "Share this bank to ",
      children: (
        <>
          <TextInput
            variant="default"
            placeholder="Add email or username"
          ></TextInput>
          <Text fw={500} my="md">
            People who have rights to access this bank:
          </Text>
          <Stack gap="xs">
            <Group justify="space-between">
              <Group justify="left">
                <Avatar src="avatar.png" alt="it's me" m={0} />
                <Text size="sm">Nguyễn Lê Quỳnh Trang</Text>
              </Group>
              <Select
                w={150}
                variant="filled"
                placeholder="Pick value"
                data={["Edit", "View", "Delete access right"]}
                defaultValue="Edit"
                allowDeselect={false}
              />
            </Group>
            <Group justify="space-between">
              <Group justify="left">
                <Avatar src="avatar.png" alt="it's me" m={0} />
                <Text size="sm">Nguyễn Lê Quỳnh Trang</Text>
              </Group>
              <Select
                w={150}
                variant="filled"
                placeholder="Pick value"
                data={["Edit", "View", "Delete access right"]}
                defaultValue="Edit"
                allowDeselect={false}
              />
            </Group>
          </Stack>

          <Text fw={500} my="md">
            General Access
          </Text>
          <Group>
            <Sharing></Sharing>
          </Group>
          <CopyButton value="https://mantine.dev">
            {({ copied, copy }) => (
              <Button
                color={copied ? "teal" : "blue"}
                onClick={copy}
                variant="outline"
                radius="xl"
                pos={"relative"}
                top={"50px"}
              >
                {copied ? "Copied link" : "Copy link"}
              </Button>
            )}
          </CopyButton>
        </>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
    });
  };
  return (
    <Button mb={"md"} onClick={openModal} variant="light">
      Share
    </Button>
  );
};

export default ShareButton;
