"use client"

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
    ChevronDown
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const formFields = [
    { icon: Type, name: "Text", description: "Single-line text input" },
    { icon: Hash, name: "Number", description: "Numeric input field" },
    { icon: Calendar, name: "Date", description: "Date picker" },
    { icon: Heading1, name: "Title", description: "Large heading text" },
    { icon: Heading2, name: "Subtitle", description: "Section subtitle" },
    { icon: FileText, name: "Paragraph", description: "Multi-line text block" },
    { icon: Minus, name: "Separator", description: "Visual divider" },
    { icon: Space, name: "Spacer", description: "Horizontal spacing" },
    { icon: CheckSquare, name: "Checkbox", description: "Multiple selection" },
    { icon: AlignLeft, name: "Text Area", description: "Large text input" },
    { icon: ChevronDown, name: "Select", description: "Dropdown menu" },
];

export default function FormFields() {
    return (
        <section id="fields" className="py-24 bg-secondary/20 border-t border-border/50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        All the fields you need
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
                        A comprehensive collection of form fields to capture any type of data
                    </p>
                    <Badge variant="outline" className="text-sm border-border/50">
                        More fields coming soon
                    </Badge>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                    {formFields.map((field, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.2, delay: 0.03 }}
                            whileHover={{ y: -4, scale: 1.08 }}
                            className="p-6 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-accent hover:border-foreground/20 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                        >
                            <motion.div
                                whileHover={{ rotate: 5, scale: 1.1 }}
                                transition={{ duration: 0.15 }}
                            >
                                <field.icon className="h-8 w-8 mb-3" />
                            </motion.div>
                            <h3 className="font-semibold mb-1">{field.name}</h3>
                            <p className="text-sm text-muted-foreground">
                                {field.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
