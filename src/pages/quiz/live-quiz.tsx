import { UserLayout } from "@/components/layouts";
import {
  Button,
  Container,
  Divider,
  Flex,
  Group,
  Input,
  Paper,
  Stack,
  Switch,
  Text,
} from "@mantine/core";
import { DateInput, DatePickerInput } from "@mantine/dates";
import { IconChevronDown } from "@tabler/icons-react";
import React, { useState } from "react";
const hour: number = new Date().getHours();
const LiveQuiz = () => {
  const [value, setValue] = useState<Date | null>(null);
  const clickOnSwitch = () => {
    return (
      <DateInput
        valueFormat="YYYY MMM DD"
        // label="Date input"
        placeholder="Date input"
      />
    );
  };
  const [checked, setChecked] = useState(false);
  return (
    <UserLayout>
      <Container size="xs">
        <Paper p="lg" radius="md" shadow="sm">
          <Text style={{ fontWeight: "bold" }}>Set up quizzes</Text>
          <Divider my="md" />
          <Stack>
            <Flex justify={"space-between"}>
              <Text style={{ fontWeight: "500" }}>
                Set a start time for the activity
              </Text>
              <Switch checked={checked} onChange={() => setChecked(!checked)} />
            </Flex>
            <Flex justify={"space-between"}>
              {checked ? clickOnSwitch() : null}
            </Flex>
          </Stack>

          <Divider my="md" />

          <Flex justify={"space-between"}>
            <Text style={{ fontWeight: "500" }}>Participant attempts</Text>
          </Flex>
        </Paper>

        {/* <Paper p="lg" radius="md" shadow="sm" mt={20}>
          <Text style={{ fontWeight: "bold" }}>Mastery and Learning</Text>
          <Divider my="md" />
          <Stack>
            <Flex justify={"space-between"}>
              <Text style={{ fontWeight: "500" }}>
                Set a start time for the activity
              </Text>
              <Switch checked={checked} onChange={() => setChecked(!checked)} />
            </Flex>
            <Flex justify={"space-between"}>
              {checked ? clickOnSwitch() : null}
            </Flex>
          </Stack>

          <Divider my="md" />

          <Flex justify={"space-between"}>
            <Text style={{ fontWeight: "500" }}>Turn number</Text>
          </Flex>
        </Paper> */}

        <Paper p="lg" radius="md" shadow="sm" mt={20}>
          <Text style={{ fontWeight: "bold" }}>Question and Answer</Text>
          <Divider my="md" />
          <Stack>
            <Flex justify={"space-between"} gap={20} align="start">
              <Stack gap={5}>
                <Text style={{ fontWeight: "500" }}>
                  Show answers during activity
                </Text>
                <Text size="sm">
                  Show students the correct answers after each question.
                </Text>
              </Stack>

              <Input
                component="select"
                rightSection={<IconChevronDown size={14} stroke={1.5} />}
                pointer
                size="sm"
              >
                <option value="1">On</option>
                <option value="2">Validate only</option>
                <option value="3">Off</option>
              </Input>
            </Flex>
          </Stack>

          <Divider my="md" />

          <Flex justify={"space-between"} gap={20} align="start">
            <Stack gap={5}>
              <Text style={{ fontWeight: "500" }}>
                Show answers after activity
              </Text>
              <Text size="sm">
                Allow students to view answers after the quiz is submitted.
              </Text>
            </Stack>

            <Input
              component="select"
              rightSection={<IconChevronDown size={14} stroke={1.5} />}
              pointer
              size="sm"
            >
              <option value="1">On</option>
              <option value="2">Question only</option>
              <option value="3">Off</option>
            </Input>
          </Flex>

          <Divider my="md" />
          <Flex justify={"space-between"}>
            <Text style={{ fontWeight: "500" }}>Shuffle questions</Text>
            <Switch />
          </Flex>

          <Divider my="md" />

          <Flex justify={"space-between"}>
            <Text style={{ fontWeight: "500" }}>Shuffle answer options</Text>
            <Switch />
          </Flex>

          <Divider my="md" />

          <Flex justify={"space-between"} gap={20} align="start">
            <Stack gap={5}>
              <Text style={{ fontWeight: "500" }}>Question Timer</Text>
              <Text size="sm">
                Students see a countdown and get extra points for each question
              </Text>
            </Stack>

            <Input
              component="select"
              rightSection={<IconChevronDown size={14} stroke={1.5} />}
              pointer
              size="sm"
            >
              <option value="1">Default timer</option>
              <option value="2">Off</option>
            </Input>
          </Flex>

          <Divider my="md" />

          <Flex justify={"space-between"}>
            <Text style={{ fontWeight: "500" }}>
              Skip Questions & Attempt Later
            </Text>
            <Switch />
          </Flex>
        </Paper>

        <Paper p="lg" radius="md" shadow="sm" mt={20}>
          <Text style={{ fontWeight: "bold" }}>Gamification</Text>
          <Divider my="md" />
          <Stack>
            <Flex justify={"space-between"}>
              <Stack gap={5}>
                <Text style={{ fontWeight: "500" }}>Power-ups</Text>
                <Text size="sm">
                  Students get bonus points and other fun abilities.
                </Text>
              </Stack>
              <Switch />
            </Flex>
            <Flex justify={"space-between"}>
              {checked ? clickOnSwitch() : null}
            </Flex>
          </Stack>

          <Divider my="md" />
        </Paper>

        <Button
          variant="gradient"
          gradient={{ from: "blue", to: "cyan" }}
          mt={20}
          fullWidth
          size="xl"
        >
          Continue
        </Button>
      </Container>
    </UserLayout>
  );
};

export default LiveQuiz;
