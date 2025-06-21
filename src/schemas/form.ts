import * as z from "zod/v4"

export const formSchema = z.object({
    name: z.string().min(4),
    description: z.string().optional(),
})

export type formSchemaType = z.infer<typeof formSchema>