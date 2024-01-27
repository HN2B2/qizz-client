import { UserLayout } from "@/components/layouts";
import Question from "@/components/questions/Question";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Combobox,
  ComboboxItem,
  Container,
  CopyButton,
  Flex,
  Grid,
  Group,
  Image,
  Input,
  InputBase,
  Menu,
  MenuDropdown,
  Modal,
  Paper,
  Pill,
  PillsInput,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  rem,
  useCombobox,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconArrowsLeftRight,
  IconListCheck,
  IconLock,
  IconMessageCircle,
  IconPencil,
  IconPhoto,
  IconPlus,
  IconRectangle,
  IconSearch,
  IconSettings,
  IconSquareCheck,
  IconTrash,
  IconUpload,
  IconWorld,
  IconX,
} from "@tabler/icons-react";
import {
  Dropzone,
  DropzoneProps,
  FileWithPath,
  IMAGE_MIME_TYPE,
} from "@mantine/dropzone";
import React, { useState } from "react";
import { modals } from "@mantine/modals";
import { useDisclosure } from "@mantine/hooks";
import Sharing from "@/components/sharing/Sharing";
import ShareButton from "@/components/sharing/ShareButton";
import { QuestionType } from "@/types/question/QuestionType";
import CreateQuestionButton from "@/components/questions/createQuestions/CreateQuestionButton";
import type { Question as QuestionData } from "@/types/question";
const groceries = [
  "🍎 Apples",
  "🍌 Bananas",
  "🥦 Broccoli",
  "🥕 Carrots",
  "🍫 Chocolate",
];

const dataQuestions: QuestionData[] = [
  {
    questionId: 1,
    content: "What is the capital of France?",
    point: 1,
    duration: 15,
    type: QuestionType.MULTIPLE_CHOICE,
    answersMetadata: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswersMetadata: ["Paris"],
    explainAnswer: "Paris is the capital of France",
    questionIndex: 1,
    disabled: false,
    quizBankId: 1,
  },
  {
    questionId: 2,
    content: "What is the capital of Vietnam?",
    point: 2,
    duration: 30,
    type: QuestionType.FILL_IN_THE_BLANK,
    answersMetadata: [],
    correctAnswersMetadata: ["Hanoi"],
    explainAnswer: "Hanoi is the capital of VietNam",
    questionIndex: 2,
    disabled: false,
    quizBankId: 1,
  },
];

const EditBank = () => {
  const form = useForm({
    initialValues: {
      name: "Untitled Quiz",
      image: null,
      email: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const [image, setImage] = useState<FileWithPath[]>([]);

  const previews = image.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    );
  });

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  const [value, setValue] = useState<string[]>([]);

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

  const options = groceries
    .filter((item) => !value.includes(item))
    .map((item) => (
      <Combobox.Option value={item} key={item} active={value.includes(item)}>
        {item}
      </Combobox.Option>
    ));

  return (
    <UserLayout>
      <Container size="lg">
        <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
          <Grid.Col
            span={{ base: 12, sm: 8 }}
            bg="var(--mantine-color-blue-light)"
            order={{ base: 3, sm: 2 }}
          >
            <Flex p="sm">
              <IconListCheck></IconListCheck>
              <Text>5 Questions</Text>
            </Flex>
            <Group justify="flex-end">
              <CreateQuestionButton></CreateQuestionButton>
            </Group>
            {dataQuestions.map((question) => (
              <Question
                key={question.questionId}
                type={question.type}
                data={question}
              />
            ))}
            {/* <Question
              type={QuestionType.MULTIPLE_CHOICE}
              data={dataQuestions[0]}
            />
            <Question
              type={QuestionType.FILL_IN_THE_BLANK}
              data={dataQuestions[1]}
            /> */}
          </Grid.Col>
          <Grid.Col
            span={{ base: 12, sm: 4 }}
            bg="var(--mantine-color-blue-light)"
            order={{ base: 1, sm: 3 }}
          >
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
              <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setImage}>
                <Text ta="center">Drop images here</Text>
              </Dropzone>

              <SimpleGrid
                // cols={{ base: 1, sm: 4 }}
                mt={previews.length > 0 ? "xl" : 0}
              >
                {previews}
              </SimpleGrid>
              <TextInput
                label="Quiz Name"
                placeholder="Quiz Name"
                leftSection={<IconPencil></IconPencil>}
                variant="filled"
                {...form.getInputProps("name")}
                my={"md"}
              />

              <ShareButton></ShareButton>
              <Text fw={500}>Choose sub category</Text>
              <Combobox
                store={combobox}
                onOptionSubmit={handleValueSelect}
                withinPortal={false}
              >
                <Combobox.DropdownTarget>
                  <PillsInput pointer onClick={() => combobox.toggleDropdown()}>
                    <Pill.Group>
                      {values.length > 0 ? (
                        values
                      ) : (
                        <Input.Placeholder>
                          Pick one or more values
                        </Input.Placeholder>
                      )}

                      <Combobox.EventsTarget>
                        <PillsInput.Field
                          type="hidden"
                          onBlur={() => combobox.closeDropdown()}
                          onKeyDown={(event) => {
                            if (event.key === "Backspace") {
                              event.preventDefault();
                              handleValueRemove(value[value.length - 1]);
                            }
                          }}
                        />
                      </Combobox.EventsTarget>
                    </Pill.Group>
                  </PillsInput>
                </Combobox.DropdownTarget>

                <Combobox.Dropdown>
                  <Combobox.Options>
                    {options.length === 0 ? (
                      <Combobox.Empty>All options selected</Combobox.Empty>
                    ) : (
                      options
                    )}
                  </Combobox.Options>
                </Combobox.Dropdown>
              </Combobox>

              <Group justify="flex-end" mt="md">
                <Button type="submit">Submit</Button>
              </Group>
            </form>
          </Grid.Col>
        </Grid>
      </Container>
    </UserLayout>
  );
};

export default EditBank;
