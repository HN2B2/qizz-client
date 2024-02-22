import {
  Avatar,
  Button,
  CopyButton,
  Group,
  Modal,
  Select,
  Stack,
  Text,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import Sharing from "./Sharing";
import { BankResponse, BankUpdateRequest } from "@/types/bank";
import { instance } from "@/utils";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import AddSharing from "./AddSharing";
// import cloneDeep from 'lodash.clonedeep';

interface Prop {
  bank: BankResponse;
  setBank: React.Dispatch<React.SetStateAction<BankResponse>>;
}
const ShareButton = ({ bank, setBank }: Prop) => {
  const [bankData, setBankData] = useState(Object.assign({}, bank));
  const [opened, { open, close }] = useDisclosure(false);

  const handleChange = (event: string | null, index: number) => {
    const updatedManageBanks = bankData.manageBanks
      ? [...bankData.manageBanks]
      : [];
    if (updatedManageBanks[index]) {
      updatedManageBanks[index].editable = event === "Edit";
    }
    setBankData({
      ...bankData,
      manageBanks: updatedManageBanks,
    });
  };

  const handleDelete = async (index: number) => {
    try {
      await instance.delete(`/manageBank/${index}`);
      const { data } = await instance.get(`/bank/${bank.quizBankId}`);
      setBankData(data);
      notifications.show({
        title: "Success",
        message: "Sharing account deleted successfully",
        color: "green",
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to delete sharing account",
        color: "red",
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const bankRequest: BankUpdateRequest = {
        name: bankData.name,
        description: bankData.description,
        featuresImage: bankData.featuresImage,
        quizPublicity: bankData.quizPublicity,
        publicEditable: bankData.publicEditable,
        draft: bankData.draft,
        manageBanks: bankData.manageBanks?.map((item) => {
          return {
            email: item.user.email,
            editable: item.editable,
          };
        }),
      };
      const { data, status } = await instance.put(
        `/bank/${bankData.quizBankId}`,
        bankRequest
      );
      setBankData(data);
      notifications.show({
        title: "Success",
        message: "Bank saved successfully",
        color: "green",
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to save bank",
        color: "red",
      });
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add new subcategory">
        <>
          <AddSharing
            closee={close}
            bank={bankData}
            setBank={setBankData}
          ></AddSharing>

          <Text fw={500} my="md">
            People who have rights to access this bank:
          </Text>
          <Stack gap="xs">
            <Group justify="space-between">
              <Group justify="left">
                <Avatar alt="it's me" m={0} />
                <Stack gap={0}>
                  <Text size="sm">{bankData.createdBy.email}</Text>
                  <Text size="xs">{bankData.createdBy.displayName}</Text>
                </Stack>
              </Group>
              <Text p="sm" c={"dimmed"}>
                Owner
              </Text>
            </Group>
            {bankData.manageBanks?.map((user, index) => (
              <Group justify="space-between" key={user.manageBankId}>
                <Group justify="left">
                  <Avatar alt="it's me" m={0} />
                  <Stack gap={0}>
                    <Text size="sm">{user.user.email}</Text>
                    <Text size="xs">{user.user.displayName}</Text>
                  </Stack>
                </Group>
                <Select
                  w={150}
                  variant="filled"
                  placeholder="Pick value"
                  data={["Edit", "View", "Delete access right"]}
                  defaultValue={user.editable ? "Edit" : "View"}
                  allowDeselect={false}
                  onChange={(value) => {
                    if (value === "Delete access right") {
                      handleDelete(user.manageBankId);
                    } else handleChange(value, index);
                  }}
                />
              </Group>
            ))}
          </Stack>

          <Text fw={500} my="md">
            General Access
          </Text>
          <Group>
            <Sharing bankData={bankData} setBankData={setBankData}></Sharing>
          </Group>
          <Group pt={"md"} justify="space-between">
            <CopyButton value="https://mantine.dev">
              {({ copied, copy }) => (
                <Button
                  color={copied ? "teal" : "blue"}
                  onClick={copy}
                  variant="outline"
                  radius="xl"
                >
                  {copied ? "Copied link" : "Copy link"}
                </Button>
              )}
            </CopyButton>
            <Group>
              <Button onClick={close}>Cancel</Button>
              <Button onClick={() => handleSubmit()}>Save</Button>
            </Group>
          </Group>
        </>
      </Modal>
      <Button mb={"md"} onClick={open} variant="light">
        Share
      </Button>
    </>
  );
};

export default ShareButton;
