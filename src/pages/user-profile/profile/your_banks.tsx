import { Container, Grid, SimpleGrid, Skeleton, rem } from "@mantine/core";
import React from "react";
const PRIMARY_COL_HEIGHT = rem(300);

function your_banks() {
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 -
      var(--mantine-spacing-md) / 2)`;
  return (
    <Container my="md">
      <SimpleGrid cols={{ base: 1, sm: 1 }} spacing="md">
        {/* <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} /> */}
        <Grid gutter="md">
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
  );
}

export default your_banks;
