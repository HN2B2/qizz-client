import { BankResponse } from "@/types/bank";
import {
  Button,
  Combobox,
  Loader,
  TagsInput,
  TextInput,
  useCombobox,
} from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import React, { useRef, useState } from "react";
import AddSharingModal from "./AddSharingModal";
import { instance } from "@/utils";
import { UserResponse } from "@/types/user";
interface Prop {
  bank: BankResponse;
  setBank: React.Dispatch<React.SetStateAction<BankResponse>>;
}

function getAsyncData(searchQuery: string, signal: AbortSignal) {
  return new Promise<string[]>((resolve, reject) => {
    signal.addEventListener("abort", () => {
      reject(new Error("Request aborted"));
    });
    // const data;

    setTimeout(async () => {
      try {
        const { data, status } = await instance.get(
          `/users/email?keyword=${searchQuery}`
        );
        console.log(data, status);
        resolve(
          data.data.map((item: UserResponse) => item.email)
          // MOCKDATA.filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase())).slice(
          //   0,
          //   5
          // )
          // ["hello", "hi"]
        );
      } catch (error) {
        console.log(error);
      }
      // const { data, status } = await instance.get(`/users/email?keyword=xyz`);
      // console.log(data, status);

      // resolve(
      //   data.data.map((item: UserResponse) => item.email)
      //   // MOCKDATA.filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase())).slice(
      //   //   0,
      //   //   5
      //   // )
      //   // ["hello", "hi"]
      // );
    }, Math.random() * 1000);
  });
}

const AddSharing = ({ bank, setBank }: Prop) => {
  // const [value, setValue] = useState("");
  const openModal = () =>
    modals.openConfirmModal({
      title: "Please confirm your action",
      children: (
        <>
          {/* <TagsInput defaultValue={[value]} clearable></TagsInput> */}
          <AddSharingModal email={value}></AddSharingModal>
        </>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
    });
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
    // <AddSharing></AddSharing>;
  };

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[] | null>(null);
  const [value, setValue] = useState("");
  const [empty, setEmpty] = useState(false);
  const abortController = useRef<AbortController>();

  const fetchOptions = (query: string) => {
    abortController.current?.abort();
    abortController.current = new AbortController();
    setLoading(true);

    getAsyncData(query, abortController.current.signal)
      .then((result) => {
        setData(result);
        setLoading(false);
        setEmpty(result.length === 0);
        abortController.current = undefined;
      })
      .catch(() => {});
  };

  const options = (data || []).map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <>
      {/* <TextInput
        variant="default"
        placeholder="Add email or username"
        // value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={getHotkeyHandler([
          [
            "Enter",
            () => {
              // handleSubmit();
              openModal();
              console.log("Enter pressed");
              //   modals.close;
            },
          ],
        ])}
      ></TextInput> */}
      <Combobox
        onOptionSubmit={(optionValue) => {
          setValue(optionValue);
          combobox.closeDropdown();
        }}
        withinPortal={false}
        store={combobox}
      >
        <Combobox.Target>
          <TextInput
            // label="Pick value or type anything"
            placeholder="Add people to send the link to"
            value={value}
            onChange={(event) => {
              setValue(event.currentTarget.value);
              fetchOptions(event.currentTarget.value);
              combobox.resetSelectedOption();
              combobox.openDropdown();
            }}
            onClick={() => combobox.openDropdown()}
            onFocus={() => {
              combobox.openDropdown();
              if (data === null) {
                fetchOptions(value);
              }
            }}
            onBlur={() => combobox.closeDropdown()}
            rightSection={loading && <Loader size={18} />}
            onKeyDown={getHotkeyHandler([
              [
                "Enter",
                () => {
                  openModal();
                  console.log("Enter pressed");
                  //   modals.close;
                },
              ],
            ])}
          />
        </Combobox.Target>

        <Combobox.Dropdown hidden={data === null}>
          <Combobox.Options>
            {options}
            {empty && <Combobox.Empty>No results found</Combobox.Empty>}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </>
  );
};

export default AddSharing;
