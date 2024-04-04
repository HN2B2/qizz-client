import { Group, Pagination } from "@mantine/core"
import { useRouter } from "next/router"
import { useState } from "react"

const ReportPagination = ({ total }: { total: number }) => {
    const [activePage, setActivePage] = useState(1)
    const router = useRouter()
    const handlePageChange = (page: number) => {
        setActivePage(page)
        const query = router.query
        router.push({
            pathname: router.pathname,
            query: { ...query, page },
        })
    }
    return (
        <Group justify="center">
            <Pagination
                total={total}
                value={activePage}
                onChange={handlePageChange}
            />
        </Group>
    )
}

export default ReportPagination
