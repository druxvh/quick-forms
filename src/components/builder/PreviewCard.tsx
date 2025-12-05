'use client';

import { useDesignerElements } from '@/hooks/use-designer';
import { Button } from '../ui/button';
import { FormElements } from '@/types/form';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Separator } from '../ui/separator';
import { LaptopMinimal, Smartphone } from 'lucide-react';

export default function PreviewCard() {
    const elements = useDesignerElements();
    const [device, setDevice] = useState<'mobile' | 'tablet'>('mobile');

    return (
        <div className="relative hidden h-full w-fit flex-col rounded-md border lg:flex">
            {/* Left: Live Preview (only visible on md+) */}
            <div className="flex items-center justify-between p-4">
                <h2 className="text-base font-semibold">Live Preview</h2>

                {/* Device toggle */}
                <div className="hidden gap-1 lg:flex">
                    <Button
                        variant={'ghost'}
                        size={'icon'}
                        onClick={() => setDevice('mobile')}
                        className={`${device === 'mobile' ? 'bg-muted text-primary' : 'text-primary/80'}`}
                    >
                        <Smartphone className="size-5 stroke-2" />
                    </Button>
                    <Button
                        variant={'ghost'}
                        size={'icon'}
                        onClick={() => setDevice('tablet')}
                        className={`${device === 'tablet' ? 'bg-muted text-primary' : 'text-primary/80'}`}
                    >
                        <LaptopMinimal className="size-5 stroke-2" />
                    </Button>
                </div>
            </div>
            <Separator />

            <div
                className={cn(
                    'flex h-full w-full grow flex-col gap-4 overflow-y-auto scroll-smooth p-4',
                    device === 'mobile' ? 'w-[320px]' : 'w-xl',
                )}
            >
                {elements.map((element) => {
                    const FormComponent = FormElements[element.type].formComponent;

                    return <FormComponent key={element.id} elementInstance={element} />;
                })}
                {elements.length > 0 && (
                    <div className="cursor-not-allowed py-5">
                        <Button disabled className="w-full p-4">
                            Submit
                        </Button>
                    </div>
                )}
                {elements.length === 0 && (
                    <div className="text-muted-foreground m-auto text-center text-sm text-pretty">
                        Add form elements from the sidebar to see a live preview here.
                    </div>
                )}
            </div>
        </div>
    );
}
