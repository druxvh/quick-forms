'use client';

import {
    Type,
    Hash,
    Calendar,
    Heading1,
    Heading2,
    FileText,
    Minus,
    Space,
    CheckSquare,
    AlignLeft,
    ChevronDown,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const formFields = [
    { icon: Type, name: 'Text', description: 'Single-line text input' },
    { icon: Hash, name: 'Number', description: 'Numeric input field' },
    { icon: Calendar, name: 'Date', description: 'Date picker' },
    { icon: Heading1, name: 'Title', description: 'Large heading text' },
    { icon: Heading2, name: 'Subtitle', description: 'Section subtitle' },
    { icon: FileText, name: 'Paragraph', description: 'Multi-line text block' },
    { icon: Minus, name: 'Separator', description: 'Visual divider' },
    { icon: Space, name: 'Spacer', description: 'Horizontal spacing' },
    { icon: CheckSquare, name: 'Checkbox', description: 'Multiple selection' },
    { icon: AlignLeft, name: 'Text Area', description: 'Large text input' },
    { icon: ChevronDown, name: 'Select', description: 'Dropdown menu' },
];

export default function FormFields() {
    return (
        <section id="fields" className="bg-secondary/20 border-border/50 border-t py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 text-center"
                >
                    <h2 className="mb-4 text-4xl font-bold md:text-5xl">
                        All the fields you need
                    </h2>
                    <p className="text-muted-foreground mx-auto mb-4 max-w-2xl text-xl">
                        A comprehensive collection of form fields to capture any type of
                        data
                    </p>
                    <Badge variant="outline" className="border-border/50 text-sm">
                        More fields coming soon
                    </Badge>
                </motion.div>

                <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {formFields.map((field, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.2, delay: 0.03 }}
                            whileHover={{ y: -4, scale: 1.08 }}
                            className="border-border/50 bg-card/50 hover:bg-accent hover:border-foreground/20 group cursor-pointer rounded-lg border p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
                        >
                            <motion.div
                                whileHover={{ rotate: 5, scale: 1.1 }}
                                transition={{ duration: 0.15 }}
                            >
                                <field.icon className="mb-3 h-8 w-8" />
                            </motion.div>
                            <h3 className="mb-1 font-semibold">{field.name}</h3>
                            <p className="text-muted-foreground text-sm">
                                {field.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
