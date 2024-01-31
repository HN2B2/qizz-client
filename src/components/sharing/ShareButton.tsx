import {
  Avatar,
  Button,
  CopyButton,
  Group,
  Select,
  Stack,
  TagsInput,
  Text,
  TextInput,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import React, { useEffect, useState } from "react";
import Sharing from "./Sharing";
import { Bank } from "@/types/bank";
import { UserResponse } from "@/types/user";
import { GetServerSidePropsContext } from "next";
import { instance } from "@/utils";
import ManageBank from "@/types/manageBank/ManageBank";
import { getHotkeyHandler } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { UserRole } from "@/types/user/UserResponse";
import { useForm } from "@mantine/form";
import AddSharing from "./AddSharing";

interface Prop {
  bank: Bank;
  setBank: React.Dispatch<React.SetStateAction<Bank>>;
}
const ShareButton = ({ bank, setBank }: Prop) => {
  const [bankData, setBankData] = useState(Object.assign({}, bank));

  // console.log(value);
  // const handleSubmit = () => {
  //   // modals.openConfirmModal({
  //   //   title: "Please confirm your action",
  //   //   children: (
  //   //     <>
  //   //       <Text size="sm">
  //   //         This action is so important that you are required to confirm it with
  //   //         a modal. Please click one of these buttons to proceed.
  //   //       </Text>
  //   //       <TagsInput
  //   //         label="Press Enter to submit a tag"
  //   //         placeholder="Enter tag"
  //   //         // defaultValue={[value]}
  //   //         defaultValue={[value]}
  //   //         clearable
  //   //       />
  //   //     </>
  //   //   ),
  //   //   labels: { confirm: "Confirm", cancel: "Cancel" },
  //   //   onCancel: () => modals.closeAll(),
  //   //   onConfirm: () => console.log("Confirmed"),
  //   // });
  //   const manageBanks = [
  //     ...(bankData.manageBanks || []),
  //     {
  //       //insert new data
  //       manageBankId: 1,
  //       createdAt: "",
  //       modifiedAt: "",
  //       user: {
  //         id: 1,
  //         email: value,
  //         displayName: "",
  //         createdAt: "",
  //         modifiedAt: "",
  //         role: UserRole.USER,
  //         username: "",
  //       },
  //       editable: true,
  //     },
  //   ];
  //   setBankData({ manageBanks, ...bankData });
  //   console.log(bankData);
  //   openModal();
  // };
  const handleSubmit = () => {
    // const manageBanks = [
    //   ...(bankData.manageBanks || []),
    //   {
    //     manageBankId: 1,
    //     createdAt: "",
    //     modifiedAt: "",
    //     user: {
    //       id: 1,
    //       email: value,
    //       displayName: "",
    //       createdAt: "",
    //       modifiedAt: "",
    //       role: UserRole.USER,
    //       username: "",
    //     },
    //     editable: true,
    //   },
    // ];
    // // Update bankData with the new manageBanks array
    // setBankData({ ...bankData, manageBanks });
    // console.log(bankData); // Logging immediately after setBankData might not reflect the updated state
    // // openModal();
    <AddSharing></AddSharing>;
  };
  // useEffect(() => {
  //   openModal();
  // }, [bankData]);
  const openModal = () => {
    modals.openConfirmModal({
      title: "Share this bank to ",
      children: (
        <>
          <AddSharing></AddSharing>
          {/* <TextInput
            variant="default"
            placeholder="Add email or username"
            // value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={getHotkeyHandler([
              [
                "Enter",
                () => {
                  handleSubmit();
                  modals.close;
                },
              ],
            ])}
          ></TextInput> */}
          {/* <Button
            onClick={() => {
              handleSubmit();
              modals.close;
            }}
          >
            Add
          </Button> */}
          <Text fw={500} my="md">
            People who have rights to access this bank:
          </Text>
          <Stack gap="xs">
            {bankData.manageBanks?.map((user) => (
              <Group justify="space-between">
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
      onConfirm: () => console.log("Confirmed"),
      onCancel: () => {
        setBankData(bank);
        console.log(bank);
        modals.closeAll();
      },
    });
  };
  return (
    <Button mb={"md"} onClick={openModal} variant="light">
      Share
    </Button>
  );
};

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   try {
//     const { req, query } = context;
//     // const { page = PAGE, keyword } = query;
//     const res = await instance.get(`/manageBank/all/bankId/{${query.bankId}}`, {
//       withCredentials: true,
//       headers: {
//         Cookie: req.headers.cookie || "",
//       },
//     });
//     const manageBankData = res.data;
//     return {
//       props: {
//         bankData,
//         questionData,
//       },
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       notFound: true,
//     };
//   }
// };

export default ShareButton;
