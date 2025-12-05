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
import { useForm, useWatch } from 'react-hook-form';
import { onboardFormSchema, onboardFormSchemaT } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { onboardUserAction } from '@/actions/user';
import { toast } from 'sonner';

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
            });
            router.push(`/dashboard`);
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong, please try again later.', {
                position: 'bottom-center',
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
        <Card className="w-full max-w-2xl border-none bg-transparent p-0 shadow-none outline-none">
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

                    <Form {...form}>
                        <form
                            onSubmit={formHandleSubmit(handleSubmit)}
                            className="space-y-4"
                        >
                            {/* Name & Email */}
                            <motion.div variants={itemVariants} className="space-y-4">
                                <FormField
                                    control={control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="gap-2">
                                            <FormLabel className="text-sm font-medium">
                                                Your Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    // value={name}
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                ></FormField>

                                <FormField
                                    control={control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="gap-2">
                                            <FormLabel className="text-sm font-medium">
                                                Email
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={!!email}
                                                    className="opacity-70"
                                                    // value={name}
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                ></FormField>
                            </motion.div>

                            {/* Role selection */}
                            <motion.div variants={itemVariants}>
                                <FormField
                                    control={control}
                                    name="role"
                                    render={() => (
                                        <FormItem className="gap-2">
                                            <FormLabel className="text-sm font-medium">
                                                Your Role
                                            </FormLabel>
                                            <FormControl>
                                                <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-2">
                                                    {ROLE_OPTIONS.map((role) => (
                                                        <SelectionCard
                                                            key={role.id}
                                                            option={role}
                                                            selected={
                                                                selectedRole === role.id
                                                            }
                                                            onSelect={() =>
                                                                handleSelect(
                                                                    'role',
                                                                    role.id,
                                                                )
                                                            }
                                                        />
                                                    ))}
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                ></FormField>
                            </motion.div>

                            {/* Usage selection */}
                            <motion.div variants={itemVariants}>
                                <FormField
                                    control={control}
                                    name="role"
                                    render={() => (
                                        <FormItem className="gap-2">
                                            <FormLabel className="text-sm font-medium">
                                                Your Primary Goal
                                            </FormLabel>
                                            <FormControl>
                                                <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-2">
                                                    {GOAL_OPTIONS.map((goal) => (
                                                        <SelectionCard
                                                            key={goal.id}
                                                            option={goal}
                                                            selected={
                                                                selectedGoal === goal.id
                                                            }
                                                            onSelect={() =>
                                                                handleSelect(
                                                                    'goal',
                                                                    goal.id,
                                                                )
                                                            }
                                                        />
                                                    ))}
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                ></FormField>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Button
                                    type="submit"
                                    disabled={!selectedGoal || !selectedRole || loading}
                                    className="mt-5 w-full py-5 text-base"
                                >
                                    {loading ? 'Saving...' : 'Finish Onboarding'}
                                </Button>
                            </motion.div>
                        </form>
                    </Form>
                </CardContent>
            </motion.div>
        </Card>
    );
}
