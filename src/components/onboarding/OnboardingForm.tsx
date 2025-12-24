'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
    User,
    Briefcase,
    Building2,
    Code,
    Zap,
    Calendar,
    ListChecks,
    MessageSquare,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { onboardFormSchema, onboardFormSchemaT } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { onboardUserAction } from '@/actions/user';
import { toast } from 'sonner';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';

const ROLE_OPTIONS = [
    { id: 'INDIVIDUAL', label: 'Individual / Creator', icon: User },
    { id: 'BUSINESS', label: 'Business Owner', icon: Building2 },
    { id: 'FREELANCER', label: 'Freelancer / Agency', icon: Briefcase },
    { id: 'DEVELOPER', label: 'Developer', icon: Code },
] as const;

const GOAL_OPTIONS = [
    { id: 'LEAD_COLLECTION', label: 'Collect Leads', icon: Zap },
    { id: 'EVENT_REGISTRATION', label: 'Event/Webinar Signups', icon: Calendar },
    { id: 'CONDUCT_SURVEYS', label: 'Conduct Customer Surveys', icon: ListChecks },
    {
        id: 'COLLECT_FEEDBACK',
        label: 'Gather Feedback (Product/Service)',
        icon: MessageSquare,
    },
    { id: 'OTHER', label: 'Other / Not Listed', icon: Briefcase },
] as const;

type RoleId = (typeof ROLE_OPTIONS)[number]['id'];
type GoalId = (typeof GOAL_OPTIONS)[number]['id'];

type FormOptionId = RoleId | GoalId;

// --- Animation Variants ---
const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1, // Stagger the appearance of sections
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function OnboardingForm({
    clerkId,
    fullName,
    email,
    imageUrl,
}: {
    clerkId: string;
    fullName: string;
    email: string;
    imageUrl: string;
}) {
    const router = useRouter();
    const form = useForm<onboardFormSchemaT>({
        resolver: zodResolver(onboardFormSchema),
        defaultValues: {
            name: fullName || '',
            email: email || '',
            imageUrl: imageUrl || '',
        },
    });

    const { setValue, control, handleSubmit: formHandleSubmit } = form;

    const [loading, setLoading] = useState(false);

    const selectedRole = useWatch({ control, name: 'role' });
    const selectedGoal = useWatch({ control, name: 'goal' });

    useEffect(() => {
        if (fullName) setValue('name', fullName);
        if (email) setValue('email', email);
        if (imageUrl) setValue('imageUrl', imageUrl);
    }, [fullName, email, imageUrl, setValue]);

    // Corrected handler: uses setValue to update React Hook Form state
    const handleSelect = (fieldName: 'role' | 'goal', id: FormOptionId) => {
        setValue(fieldName, id, { shouldValidate: true, shouldDirty: true });
    };

    const handleSubmit = async (values: onboardFormSchemaT) => {
        setLoading(true);
        try {
            await onboardUserAction(clerkId, values);
            toast.success('Welcome!', {
                description: 'You have successfully completed the onboarding.',
                position: 'bottom-center',
                style: {
                    '--normal-bg':
                        'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
                    '--normal-text':
                        'light-dark(var(--color-green-600), var(--color-green-400))',
                    '--normal-border':
                        'light-dark(var(--color-green-600), var(--color-green-400))',
                } as React.CSSProperties,
            });
            router.push(`/dashboard`);
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong, please try again later.', {
                position: 'bottom-center',
                style: {
                    '--normal-bg':
                        'color-mix(in oklab, var(--destructive) 10%, var(--background))',
                    '--normal-text': 'var(--destructive)',
                    '--normal-border': 'var(--destructive)',
                } as React.CSSProperties,
            });
        }
    };

    const SelectionCard = ({
        option,
        selected,
        onSelect,
    }: {
        option: { id: FormOptionId; label: string; icon: React.ElementType };
        selected: boolean;
        onSelect: () => void;
    }) => {
        const Icon = option.icon;

        return (
            <div
                onClick={onSelect}
                className={cn(
                    'group border-border/80 flex cursor-pointer items-center gap-4 rounded-md border p-4 shadow-xs transition-all',
                    selected &&
                        'border-muted bg-primary text-primary-foreground backdrop-blur-sm',
                )}
            >
                <div className="bg-primary-foreground/10 border-primary-foreground/20 rounded-xl border p-3">
                    <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1 text-sm font-medium">{option.label}</div>
            </div>
        );
    };

    return (
        <Card className="w-full max-w-2xl border-none bg-transparent p-0 pb-8 shadow-none outline-none">
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
                <CardContent className="space-y-8 p-0 sm:p-8">
                    {/* Welcome */}
                    <motion.div variants={itemVariants} className="space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                            Welcome, {fullName?.split(' ')[0] || 'User'} 👋
                        </h1>
                        <p className="text-primary/90 text-sm sm:text-base">
                            Let’s set up your QForms experience in a few seconds.
                        </p>
                    </motion.div>

                    <form onSubmit={formHandleSubmit(handleSubmit)}>
                        <FieldGroup>
                            {/* Name & Email */}
                            <motion.div variants={itemVariants} className="space-y-4">
                                <Controller
                                    control={form.control}
                                    name="name"
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel
                                                htmlFor="onboard-name"
                                                className="text-sm font-medium"
                                            >
                                                Your Name
                                            </FieldLabel>

                                            <Input
                                                {...field}
                                                id="onboard-name"
                                                aria-invalid={fieldState.invalid}
                                            />

                                            {fieldState.error && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                                <Controller
                                    control={form.control}
                                    name="email"
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel
                                                htmlFor="onboard-email"
                                                className="text-sm font-medium"
                                            >
                                                Email
                                            </FieldLabel>

                                            <Input
                                                {...field}
                                                id="onboard-email"
                                                aria-invalid={fieldState.invalid}
                                                disabled={!!email}
                                                className="opacity-70"
                                            />

                                            {fieldState.error && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </motion.div>

                            {/* Role selection */}
                            <motion.div variants={itemVariants}>
                                <Controller
                                    control={control}
                                    name="role"
                                    render={() => (
                                        <Field>
                                            <FieldLabel>Your Role</FieldLabel>

                                            <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-2">
                                                {ROLE_OPTIONS.map((role) => (
                                                    <SelectionCard
                                                        key={role.id}
                                                        option={role}
                                                        selected={
                                                            selectedRole === role.id
                                                        }
                                                        onSelect={() =>
                                                            handleSelect('role', role.id)
                                                        }
                                                    />
                                                ))}
                                            </div>
                                        </Field>
                                    )}
                                />
                            </motion.div>

                            {/* Usage selection */}
                            <motion.div variants={itemVariants}>
                                <Controller
                                    control={control}
                                    name="goal"
                                    render={() => (
                                        <Field>
                                            <FieldLabel>Your Primary Goal</FieldLabel>

                                            <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-2">
                                                {GOAL_OPTIONS.map((goal) => (
                                                    <SelectionCard
                                                        key={goal.id}
                                                        option={goal}
                                                        selected={
                                                            selectedGoal === goal.id
                                                        }
                                                        onSelect={() =>
                                                            handleSelect('goal', goal.id)
                                                        }
                                                    />
                                                ))}
                                            </div>
                                        </Field>
                                    )}
                                />
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Button
                                    type="submit"
                                    disabled={!selectedGoal || !selectedRole || loading}
                                    className="mb-4 w-full text-base"
                                >
                                    {loading ? 'Saving...' : 'Finish Onboarding'}
                                </Button>
                            </motion.div>
                        </FieldGroup>
                    </form>
                </CardContent>
            </motion.div>
        </Card>
    );
}
