import React, { useRef } from "react";
import { useState } from "react";
import {
  CheckIcon,
  Combobox,
  Flex,
  Group,
  Loader,
  Pill,
  PillsInput,
  Select,
  Stack,
  useCombobox,
} from "@mantine/core";
import { UserResponse } from "@/types/user";
import { instance } from "@/utils";

const groceries = [
  "🍎 Apples",
  "🍌 Bananas",
  "🥦 Broccoli",
  "🥕 Carrots",
  "🍫 Chocolate",
];

function getAsyncData(searchQuery: string, signal: AbortSignal) {
  return new Promise<string[]>((resolve, reject) => {
    signal.addEventListener("abort", () => {
      reject(new Error("Request aborted"));
    });

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

const AddSharingModal = ({ email }: { email: string }) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  const [search, setSearch] = useState("");
  const [value, setValue] = useState<string[]>([email]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[] | null>(null);
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

  const handleValueSelect = (val: string) =>
    setValue((current) =>
      current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val]
    );

  const handleValueRemove = (val: string) =>
    setValue((current) => current.filter((v) => v !== val));

  const values = value.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ));

  //   const options = groceries
  //     .filter((item) => item.toLowerCase().includes(search.trim().toLowerCase()))
  //     .map((item) => (
  //       <Combobox.Option value={item} key={item} active={value.includes(item)}>
  //         <Group gap="sm">
  //           {value.includes(item) ? <CheckIcon size={12} /> : null}
  //           <span>{item}</span>
  //         </Group>
  //       </Combobox.Option>
  //     ));

  const options = (data || []).map((item) => (
    <Combobox.Option value={item} key={item} active={value.includes(item)}>
      <Group gap="sm">
        {value.includes(item) ? <CheckIcon size={12} /> : null}
        <span>{item}</span>
      </Group>
    </Combobox.Option>
  ));

  return (
    <>
      <Flex justify="space-between">
        <Combobox
          store={combobox}
          onOptionSubmit={handleValueSelect}
          // withinPortal={false}
        >
          <Combobox.DropdownTarget>
            <PillsInput onClick={() => combobox.openDropdown()}>
              <Pill.Group>
                {values}

                <Combobox.EventsTarget>
                  <PillsInput.Field
                    // onFocus={() => combobox.openDropdown()}
                    onFocus={(event) => {
                      combobox.openDropdown();
                      if (data === null) {
                        fetchOptions(event.currentTarget.value);
                      }
                    }}
                    onBlur={() => combobox.closeDropdown()}
                    value={search}
                    placeholder="Search values"
                    onChange={(event) => {
                      //   setValue([...value, event.currentTarget.value]);
                      fetchOptions(event.currentTarget.value);
                      combobox.updateSelectedOptionIndex();
                      setSearch(event.currentTarget.value);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Backspace" && search.length === 0) {
                        event.preventDefault();
                        handleValueRemove(value[value.length - 1]);
                      }
                    }}
                  />
                </Combobox.EventsTarget>
                {loading && <Loader size={18} />}
              </Pill.Group>
            </PillsInput>
          </Combobox.DropdownTarget>

          <Combobox.Dropdown>
            <Combobox.Options>
              {/* {options.length > 0 ? (
            options
          ) : (
            <Combobox.Empty>Nothing found...</Combobox.Empty>
          )} */}
              {options}
              {empty && <Combobox.Empty>No results found</Combobox.Empty>}
            </Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>
        <Select
          w={90}
          variant="filled"
          placeholder="Pick value"
          data={["Edit", "View"]}
          defaultValue={"Edit"}
          allowDeselect={false}
          // withCheckIcon={false}
        />
      </Flex>
      <div style={{ height: 200 }}></div>
    </>
  );
};

export default AddSharingModal;
