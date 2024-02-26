import { ReportResponse } from "."

export default interface GetAllReportResponse {
    data: ReportResponse[]
    total: number
}
