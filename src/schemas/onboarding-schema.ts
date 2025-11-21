import * as z from "zod"

const role = z.enum([
    "INDIVIDUAL",
    "BUSINESS",
    "FREELANCER",
    "DEVELOPER"
], "Please select a role")

const goal = z.enum([
    "LEAD_COLLECTION",
    "EVENT_REGISTRATION",
    "CONDUCT_SURVEYS",
    "COLLECT_FEEDBACK",
    "OTHER"
], "Please select a goal")

export const onboardFormSchema = z.object({
    email: z.email("Please enter a valid email address").optional(),
    name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long").optional(),
    imageUrl: z.url("Please provide a valid image URL").optional(),
    role: role,
    goal: goal,
})

export type onboardFormSchemaT = z.infer<typeof onboardFormSchema>
