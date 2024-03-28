<!-- Ctrl + Shift + V -->

# Migrate axios -> ky

## B1: pull develop, npm i

## B2: thêm dòng này vào đầu tất cả page có getServerSideProps:

```
export const runtime = "experimental-edge"
```

## B3: Cách migrate:

-   Old:

```typescript
const { data }: { data: TypeOfResponseData } = await instace.post(
    "/endpoint/1",
    {
        /*body*/
    },
    {
        params: {
            page: 1,
        },
    }
)
```

-   New:

```typescript
import {removeEmpty} from "utils"

const data: TypeOfResponseData = await instace.post("endpoint/1", {
    json: {
        /*body*/
    }
    searchParams: removeEmpty({ // Hàm removeEmpty để loại bỏ các giá trị null, undefined, empty string
        page: 1 as string // parse value thành string hoặc string[]
    })
}).json()
```

> lưu ý: endpoint mới phải bỏ dấu / ở đầu
