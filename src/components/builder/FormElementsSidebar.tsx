'use client';

import { SidebarBtnElement } from './SidebarBtnElement';
import { FormElements } from '@/types/form';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

export default function FormElementsSidebar() {
    return (
        <div className="flex w-full flex-col gap-2 sm:w-48 md:w-60 lg:w-72">
            <div className="flex items-center justify-between">
                <p className="text-foreground/70 text-sm">Elements</p>
                <Button variant={'ghost'}></Button>
            </div>
            <Separator className="sm:mb-4" />
            <div className="flex h-full grid-cols-2 place-items-center gap-3 overflow-x-auto scroll-smooth py-8 sm:grid sm:overflow-visible sm:py-0">
                {Object.values(FormElements).map((el, idx) => (
                    <SidebarBtnElement key={idx} formElement={el} />
                ))}
            </div>
        </div>
    );
}
