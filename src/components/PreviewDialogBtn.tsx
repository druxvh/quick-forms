'use client';

import { useDesignerElements } from '@/hooks/use-designer';
import { Button } from './ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';
import { FormElements } from '@/types/form';

export default function PreviewDialogBtn() {
    const elements = useDesignerElements();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    disabled={elements.length === 0 || !elements}
                    variant={'outline'}
                    className="cursor-pointer text-xs sm:text-sm"
                >
                    Preview
                </Button>
            </DialogTrigger>
            <DialogContent className="z-50 flex h-dvh max-h-screen min-w-full flex-col gap-0 border-none p-0">
                <DialogHeader className="min-h-fit truncate">
                    <DialogTitle asChild>
                        <div className="border-b px-4 py-2">
                            <p className="text-muted-foreground truncate text-left text-base leading-tight font-bold sm:text-lg">
                                Form preview
                            </p>
                            <p className="text-muted-foreground mt-2 text-left text-xs leading-tight text-pretty sm:text-sm">
                                This is how your form will look like to your users.
                            </p>
                        </div>
                    </DialogTitle>
                </DialogHeader>
                <div className="mx-auto flex h-full w-full max-w-2xl grow flex-col gap-4 overflow-y-auto px-4 py-8">
                    {elements.map((element) => {
                        const FormComponent = FormElements[element.type].formComponent;

                        return (
                            <FormComponent key={element.id} elementInstance={element} />
                        );
                    })}
                    <div className="cursor-not-allowed py-5">
                        <Button disabled className="w-full p-4">
                            Submit
                        </Button>
                    </div>
                </div>
                {/* </div> */}
            </DialogContent>
        </Dialog>
    );
}
