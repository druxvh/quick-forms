import { format, formatDistance } from "date-fns"
import { ElementsType, FormElementInstance } from "@/types/form"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { ReactNode } from "react"
import { Badge } from "./ui/badge"
import { Checkbox } from "./ui/checkbox"
import { getFormSubmissions } from "@/actions/form"


type Row = Record<string, string> & {
    submittedAt: Date
}

type Column = {
    id: string
    label: string
    required: boolean
    type: ElementsType
}

export default async function SubmissionsTable({ userId, id }: {
    userId: string;
    id: string
}) {

    const form = await getFormSubmissions(userId, id)
    if (!form) {
        throw new Error("Form not found!")
    }

    const formElements = (form.content ?? []) as FormElementInstance[]

    const columns: Column[] = []
    const rows: Row[] = []

    formElements.forEach((el) => {
        switch (el.type) {
            case "TextField":
            case "NumberField":
            case "TextAreaField":
            case "DateField":
            case "SelectField":
            case "CheckboxField":
                columns.push({
                    id: el.id,
                    label: el.extraAttributes?.label,
                    required: el.extraAttributes?.required,
                    type: el.type
                })
                break
            default:
                break
        }
    })

    form.FormSubmission.forEach((submission) => {
        const content = typeof submission.content === "string"
            ? JSON.parse(submission.content || "{}")
            : (submission.content ?? {})
        // const content = submission.content ?? {}

        rows.push({
            ...content,
            submittedAt: submission.createdAt
        })
    })

    return (
        <div>
            <h1 className="text-2xl font-semibold my-4">
                Submissions
            </h1>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((column) => (
                                <TableHead key={column.id} className="uppercase">
                                    {column.label}
                                </TableHead>
                            ))}
                            <TableHead className="text-muted-foreground text-right uppercase">Submitted at</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {
                            rows.map(row => (
                                <TableRow key={Date.now()}>
                                    {
                                        columns.map(column => (
                                            <RowCell
                                                key={column.id}
                                                type={column.type}
                                                value={row[column.id]}
                                            />
                                        ))
                                    }
                                    <TableCell className="text-right">
                                        {formatDistance(row.submittedAt, new Date(), { addSuffix: true })}
                                    </TableCell>

                                </TableRow>
                            ))
                        }
                    </TableBody>

                </Table>
            </div>
        </div>
    )
}


function RowCell({ type, value }: {
    type: ElementsType
    value: string
}) {
    let node: ReactNode = value

    switch (type) {
        case "DateField":
            if (!value) break;
            const date = new Date(value)
            node = <Badge variant={"default"}>{format(date, "dd/MM/yyyy")}</Badge>
            break;
        case "CheckboxField":
            const checked = value === "true"
            node = <Checkbox checked={checked} disabled />
            break
    }

    return <TableCell>{node}</TableCell>
}