'use client';

// import {
//     Accordion,
//     AccordionContent,
//     AccordionItem,
//     AccordionTrigger,
// } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
// import { Slider } from '@/components/ui/slider';
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from '@/components/ui/select';
// import { Input } from '@/components/ui/input';
// import { FormStyle } from '@/types/form-style';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
// import { useBuilderStore } from '@/store/builder.store';

// export function FormSidebar() {
//     // const { style, updateStyle } = useBuilderStore();

//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const handleChange = (key: keyof FormStyle, value: any) => {
//         updateStyle({ [key]: value });
//     };
//     console.log(style);

//     return (
//         <aside className="h-full overflow-y-auto">
//             <Accordion
//                 type="multiple"
//                 defaultValue={['colors', 'layout']}
//                 className="space-y-2"
//             >
//                 {/* Color Section */}
//                 <AccordionItem value="colors" className="border-none">
//                     <AccordionTrigger className="py-2 text-sm font-medium">
//                         Colors & Theme
//                     </AccordionTrigger>
//                     <AccordionContent className="space-y-4">
//                         <ColorPicker
//                             label="Primary"
//                             value={style.primaryColor}
//                             onChange={(v) => handleChange('primaryColor', v)}
//                         />
//                         <ColorPicker
//                             label="Background"
//                             value={style.bgColor}
//                             onChange={(v) => handleChange('bgColor', v)}
//                         />
//                         {/* <ColorPicker
//                             label="Text"
//                             value={style.textColor}
//                             onChange={(v) => handleChange('textColor', v)}
//                         /> */}

//                         <ColorPicker
//                             label="Border"
//                             value={style.borderColor}
//                             onChange={(v) => handleChange('borderColor', v)}
//                         />
//                     </AccordionContent>
//                 </AccordionItem>

//                 {/* Layout Section */}
//                 <AccordionItem value="layout" className="border-none">
//                     <AccordionTrigger className="py-2 text-sm font-medium">
//                         Layout & Spacing
//                     </AccordionTrigger>
//                     <AccordionContent className="space-y-4 pt-2">
//                         <div className="space-y-2">
//                             <Label>Form Width</Label>
//                             <Select defaultValue="md">
//                                 <SelectTrigger>
//                                     <SelectValue />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectItem value="sm">Compact (sm)</SelectItem>
//                                     <SelectItem value="md">Balanced (md)</SelectItem>
//                                     <SelectItem value="lg">Wide (lg)</SelectItem>
//                                 </SelectContent>
//                             </Select>
//                         </div>
//                         <div className="space-y-2">
//                             <Label>Padding (px)</Label>
//                             <Slider defaultValue={[16]} max={64} step={4} />
//                         </div>
//                     </AccordionContent>
//                 </AccordionItem>
//             </Accordion>
//         </aside>
//     );
// }

type ColorPickerProps = { label: string; value: string; onChange: (val: string) => void };

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
    // 1. Maintain local state for the "Input" so it feels instant
    const [localValue, setLocalValue] = useState(value);

    // 2. Sync local state if the store changes externally
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    // 3. Debounce the actual "onChange" call
    const [debouncedValue] = useDebounce(localValue, 200);

    useEffect(() => {
        if (debouncedValue !== value) {
            onChange(debouncedValue);
        }
    }, [debouncedValue, onChange, value]);

    //  <div className="space-y-2">
    //                         <Label htmlFor="textColor" className="text-xs">
    //                             Text
    //                         </Label>
    //                         <input
    //                             id="textColor"
    //                             type="color"
    //                             value={style.textColor}
    //                             onChange={(e) =>
    //                                 handleChange('textColor', e.target.value)
    //                             }
    //                             className="h-full w-full cursor-pointer rounded-xl outline"
    //                         />
    //                     </div>

    return (
        <div className="flex flex-col gap-1.5">
            <Label className="text-muted-foreground text-[10px] font-medium tracking-tight uppercase">
                {label}
            </Label>
            {/* <div className="group bg-background focus-within:ring-ring flex h-9 items-center gap-2 rounded-md border px-2 transition-all focus-within:ring-1">
                <div className="relative flex items-center justify-center">
                    <input
                        type="color"
                        value={localValue}
                        onChange={(e) => setLocalValue(e.target.value)}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    />
                    <div
                        className="h-4 w-4 rounded-full border border-black/10 shadow-sm"
                        style={{ backgroundColor: value }}
                    />
                </div>
                <input
                    type="text"
                    value={localValue}
                    onChange={(e) => setLocalValue(e.target.value)}
                    className="w-full border-none bg-transparent p-0 font-mono text-[11px] uppercase focus:ring-0"
                />
            </div> */}
            <div className="flex h-10 items-center gap-1 outline">
                <input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="h-8 w-8 rounded-md"
                />
                <input type="text" className="h-8 w-full rounded-md border" />
            </div>
        </div>
    );
}

// export function FormSidebar() {
//     return (
//         <div className="bg-card/50 flex h-full w-80 flex-col border-r backdrop-blur-sm">
//             <header className="flex items-center gap-3 border-b p-6">
//                 <div className="bg-primary/10 rounded-lg p-2">
//                     <Settings2 className="text-primary h-4 w-4" />
//                 </div>
//                 <div>
//                     <h2 className="text-sm font-semibold">Form Editor</h2>
//                     <p className="text-muted-foreground text-[11px] leading-tight">
//                         Customize your form&apos;s look & feel
//                     </p>
//                 </div>
//             </header>

//             <ScrollArea className="flex-1">
//                 <Tabs defaultValue="theme" className="w-full">
//                     <TabsList className="grid h-12 w-full grid-cols-3 rounded-none border-b bg-transparent">
//                         <TabsTrigger
//                             value="theme"
//                             className="data-[state=active]:border-primary rounded-none data-[state=active]:border-b-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
//                         >
//                             <Paintbrush className="h-4 w-4" />
//                         </TabsTrigger>
//                         <TabsTrigger
//                             value="layout"
//                             className="data-[state=active]:border-primary rounded-none data-[state=active]:border-b-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
//                         >
//                             <LayoutTemplate className="h-4 w-4" />
//                         </TabsTrigger>
//                         <TabsTrigger
//                             value="buttons"
//                             className="data-[state=active]:border-primary rounded-none data-[state=active]:border-b-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
//                         >
//                             <MousePointer2 className="h-4 w-4" />
//                         </TabsTrigger>
//                     </TabsList>

//                     <div className="p-6">
//                         {/* Theme Tab */}
//                         <TabsContent value="theme" className="mt-0 space-y-2">
//                             <SettingRow label="Color Palette">
//                                 <ColorInput label="Background" value="#ffffff" />
//                                 <ColorInput label="Text" value="#0f172a" />
//                                 <ColorInput label="Primary" value="#6366f1" />
//                                 <ColorInput label="Border" value="#e2e8f0" />
//                             </SettingRow>

//                             <Separator className="my-6 opacity-50" />

//                             <SettingRow label="Typography">
//                                 <Select defaultValue="inter">
//                                     <SelectTrigger className="h-9 w-full text-sm">
//                                         <SelectValue placeholder="Font Family" />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectItem value="inter">
//                                             Inter (Default)
//                                         </SelectItem>
//                                         <SelectItem value="roboto">Roboto</SelectItem>
//                                         <SelectItem value="serif">
//                                             Lora (Serif)
//                                         </SelectItem>
//                                         <SelectItem value="mono">
//                                             JetBrains Mono
//                                         </SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             </SettingRow>
//                         </TabsContent>

//                         {/* Layout Tab */}
//                         <TabsContent value="layout" className="mt-0 space-y-6">
//                             <SettingRow label="Form Width">
//                                 <Tabs defaultValue="md" className="w-full">
//                                     <TabsList className="bg-muted/50 grid h-8 w-full grid-cols-3 p-1">
//                                         <TabsTrigger value="sm" className="text-xs">
//                                             Small
//                                         </TabsTrigger>
//                                         <TabsTrigger value="md" className="text-xs">
//                                             Med
//                                         </TabsTrigger>
//                                         <TabsTrigger value="lg" className="text-xs">
//                                             Large
//                                         </TabsTrigger>
//                                     </TabsList>
//                                 </Tabs>
//                             </SettingRow>

//                             <div className="space-y-6">
//                                 <div className="space-y-4">
//                                     <div className="flex items-center justify-between">
//                                         <Label className="text-[11px] font-medium">
//                                             Padding
//                                         </Label>
//                                         <span className="bg-muted rounded px-1.5 py-0.5 text-[10px]">
//                                             24px
//                                         </span>
//                                     </div>
//                                     <Slider defaultValue={[24]} max={64} step={4} />
//                                 </div>

//                                 <div className="space-y-4">
//                                     <div className="flex items-center justify-between">
//                                         <Label className="text-[11px] font-medium">
//                                             Field Spacing
//                                         </Label>
//                                         <span className="bg-muted rounded px-1.5 py-0.5 text-[10px]">
//                                             16px
//                                         </span>
//                                     </div>
//                                     <Slider defaultValue={[16]} max={48} step={4} />
//                                 </div>
//                             </div>

//                             <Separator className="my-6 opacity-50" />

//                             <SettingRow label="Rounding & Corners">
//                                 <div className="space-y-6">
//                                     <div className="space-y-3">
//                                         <Label className="text-[11px]">
//                                             Input Radius
//                                         </Label>
//                                         <Slider defaultValue={[8]} max={24} step={2} />
//                                     </div>
//                                     <div className="space-y-3">
//                                         <Label className="text-[11px]">
//                                             Media Radius
//                                         </Label>
//                                         <Slider defaultValue={[12]} max={32} step={2} />
//                                     </div>
//                                 </div>
//                             </SettingRow>
//                         </TabsContent>

//                         {/* Buttons Tab */}
//                         <TabsContent value="buttons" className="mt-0 space-y-6">
//                             <SettingRow label="Button Style">
//                                 <Select defaultValue="solid">
//                                     <SelectTrigger className="h-9">
//                                         <SelectValue />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectItem value="solid">Solid</SelectItem>
//                                         <SelectItem value="outline">Outline</SelectItem>
//                                         <SelectItem value="ghost">Ghost</SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             </SettingRow>

//                             <SettingRow label="Button Colors">
//                                 <ColorInput label="Background" value="#6366f1" />
//                                 <ColorInput label="Text" value="#ffffff" />
//                             </SettingRow>

//                             <div className="space-y-4">
//                                 <div className="flex items-center justify-between">
//                                     <Label className="text-[11px] font-medium">
//                                         Button Radius
//                                     </Label>
//                                     <span className="bg-muted rounded px-1.5 py-0.5 text-[10px]">
//                                         6px
//                                     </span>
//                                 </div>
//                                 <Slider defaultValue={[6]} max={40} step={2} />
//                             </div>
//                         </TabsContent>
//                     </div>
//                 </Tabs>
//             </ScrollArea>

//             <div className="bg-muted/20 border-t p-4">
//                 <button className="bg-primary text-primary-foreground shadow-primary/20 w-full rounded-md py-2 text-xs font-semibold shadow-lg transition-all hover:opacity-90">
//                     Save Changes
//                 </button>
//             </div>
//         </div>
//     );
// }

// export function StyleCustom() {
//     const { style, updateStyle } = useBuilderStore();

//     // Modern width selector with icons
//     const widthOptions = [
//         { value: 'sm', label: 'S', desc: '640px', icon: Square },
//         { value: 'md', label: 'M', desc: '768px', icon: Square },
//         { value: 'lg', label: 'L', desc: '1024px', icon: Square },
//     ];

//     // Button style options
//     const buttonStyles = [
//         { value: 'solid', label: 'Solid', icon: Brush },
//         { value: 'outline', label: 'Outline', icon: Square },
//         { value: 'ghost', label: 'Ghost', icon: Eye },
//     ];

//     // Color preset quick picks
//     const colorPresets = {
//         bgColor: ['#ffffff', '#f9fafb', '#f3f4f6', '#1f2937', '#000000'],
//         primaryColor: ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#10b981'],
//     };

//     return (
//         <div className="w-full space-y-4">
//             {/* Header with reset */}
//             {/* <div className="flex items-center justify-between">
//                 <h3 className="text-sm font-medium">Style Settings</h3>
//                 <Button
//                     variant="ghost"
//                     size="sm"
//                     // onClick={}
//                     className="text-muted-foreground hover:text-foreground h-7 gap-1 px-2 text-xs"
//                 >
//                     <RotateCcw className="h-3.5 w-3.5" />
//                     Reset
//                 </Button>
//             </div> */}

//             {/* Layout Section */}

//             {/* Colors Section - Modern color picker */}
//             <div className="w-full min-w-full space-y-4 p-4">
//                 <div className="flex items-center gap-2 text-sm font-medium">
//                     <Palette className="text-muted-foreground h-4 w-4" />
//                     <span>Colors</span>
//                 </div>

//                 {/* Background Color */}
//                 <div className="space-y-2">
//                     <Label className="text-muted-foreground text-xs">Background</Label>
//                     <div className="flex gap-2">
//                         <Popover>
//                             <PopoverTrigger asChild>
//                                 <Button
//                                     variant="outline"
//                                     className="h-10 w-10 border-2 p-0"
//                                     style={{ backgroundColor: style.bgColor }}
//                                 />
//                             </PopoverTrigger>
//                             <PopoverContent className="w-64">
//                                 <div className="space-y-3">
//                                     <Input
//                                         type="color"
//                                         value={style.bgColor}
//                                         onChange={(e) =>
//                                             updateStyle({ bgColor: e.target.value })
//                                         }
//                                         className="h-32 w-full p-1"
//                                     />
//                                     <div className="grid grid-cols-5 gap-1">
//                                         {colorPresets.bgColor.map((color) => (
//                                             <Button
//                                                 key={color}
//                                                 variant="outline"
//                                                 className="h-8 w-8 border-2 p-0"
//                                                 style={{ backgroundColor: color }}
//                                                 onClick={() =>
//                                                     updateStyle({ bgColor: color })
//                                                 }
//                                             />
//                                         ))}
//                                     </div>
//                                 </div>
//                             </PopoverContent>
//                         </Popover>
//                         <Input
//                             value={style.bgColor}
//                             onChange={(e) => updateStyle({ bgColor: e.target.value })}
//                             className="flex-1 font-mono text-xs"
//                         />
//                     </div>
//                 </div>

//                 {/* Primary Color */}
//                 <div className="space-y-2">
//                     <Label className="text-muted-foreground text-xs">Primary</Label>
//                     <div className="flex gap-2">
//                         <Popover>
//                             <PopoverTrigger asChild>
//                                 <Button
//                                     variant="outline"
//                                     className="h-10 w-10 border-2 p-0"
//                                     style={{ backgroundColor: style.primaryColor }}
//                                 />
//                             </PopoverTrigger>
//                             <PopoverContent className="w-64">
//                                 <div className="space-y-3">
//                                     <Input
//                                         type="color"
//                                         value={style.primaryColor}
//                                         onChange={(e) =>
//                                             updateStyle({ primaryColor: e.target.value })
//                                         }
//                                         className="h-32 w-full p-1"
//                                     />
//                                     <div className="grid grid-cols-5 gap-1">
//                                         {colorPresets.primaryColor.map((color) => (
//                                             <Button
//                                                 key={color}
//                                                 variant="outline"
//                                                 className="h-8 w-8 border-2 p-0"
//                                                 style={{ backgroundColor: color }}
//                                                 onClick={() =>
//                                                     updateStyle({ primaryColor: color })
//                                                 }
//                                             />
//                                         ))}
//                                     </div>
//                                 </div>
//                             </PopoverContent>
//                         </Popover>
//                         <Input
//                             value={style.primaryColor}
//                             onChange={(e) =>
//                                 updateStyle({ primaryColor: e.target.value })
//                             }
//                             className="flex-1 font-mono text-xs"
//                         />
//                     </div>
//                 </div>

//                 {/* Quick color rows */}
//                 <div className="grid grid-cols-2 gap-2">
//                     <div className="space-y-1">
//                         <Label className="text-muted-foreground text-xs">Text</Label>
//                         <Input
//                             type="color"
//                             value={style.textColor}
//                             onChange={(e) => updateStyle({ textColor: e.target.value })}
//                             className="h-8 w-full p-1"
//                         />
//                     </div>
//                     <div className="space-y-1">
//                         <Label className="text-muted-foreground text-xs">Border</Label>
//                         <Input
//                             type="color"
//                             value={style.borderColor}
//                             onChange={(e) => updateStyle({ borderColor: e.target.value })}
//                             className="h-8 w-full p-1"
//                         />
//                     </div>
//                 </div>
//             </div>

//             <div className="w-full min-w-full space-y-4 p-4">
//                 <div className="flex items-center gap-2 text-sm font-medium">
//                     <Brush className="text-muted-foreground h-4 w-4" />
//                     <span>Button</span>
//                 </div>

//                 {/* Button Style Toggle Group */}
//                 <div className="space-y-3">
//                     <Label className="text-muted-foreground text-xs">Style</Label>
//                     <ToggleGroup
//                         type="single"
//                         value={style.buttonStyle}
//                         onValueChange={(value) =>
//                             value && updateStyle({ buttonStyle: value as any })
//                         }
//                         className="grid grid-cols-3 gap-1"
//                     >
//                         {buttonStyles.map((opt) => {
//                             const Icon = opt.icon;
//                             return (
//                                 <ToggleGroupItem
//                                     key={opt.value}
//                                     value={opt.value}
//                                     className="data-[state=on]:border-primary data-[state=on]:bg-primary/5 h-auto flex-col gap-1 py-2"
//                                 >
//                                     <Icon className="h-4 w-4" />
//                                     <span className="text-xs">{opt.label}</span>
//                                 </ToggleGroupItem>
//                             );
//                         })}
//                     </ToggleGroup>
//                 </div>

//                 {/* Button Colors */}
//                 <div className="grid grid-cols-2 gap-3">
//                     <div className="space-y-2">
//                         <Label className="text-muted-foreground text-xs">
//                             Button color
//                         </Label>
//                         <div className="flex gap-1">
//                             <Popover>
//                                 <PopoverTrigger asChild>
//                                     <Button
//                                         variant="outline"
//                                         className="h-8 w-8 border-2 p-0"
//                                         style={{ backgroundColor: style.buttonBgColor }}
//                                     />
//                                 </PopoverTrigger>
//                                 <PopoverContent className="w-40 p-2">
//                                     <Input
//                                         type="color"
//                                         value={style.buttonBgColor}
//                                         onChange={(e) =>
//                                             updateStyle({ buttonBgColor: e.target.value })
//                                         }
//                                         className="h-24 w-full p-1"
//                                     />
//                                 </PopoverContent>
//                             </Popover>
//                             <Input
//                                 value={style.buttonBgColor}
//                                 onChange={(e) =>
//                                     updateStyle({ buttonBgColor: e.target.value })
//                                 }
//                                 className="h-8 flex-1 font-mono text-xs"
//                             />
//                         </div>
//                     </div>

//                     <div className="space-y-2">
//                         <Label className="text-muted-foreground text-xs">
//                             Text color
//                         </Label>
//                         <div className="flex gap-1">
//                             <Popover>
//                                 <PopoverTrigger asChild>
//                                     <Button
//                                         variant="outline"
//                                         className="h-8 w-8 border-2 p-0"
//                                         style={{ backgroundColor: style.buttonTextColor }}
//                                     />
//                                 </PopoverTrigger>
//                                 <PopoverContent className="w-48 p-2">
//                                     <Input
//                                         type="color"
//                                         value={style.buttonTextColor}
//                                         onChange={(e) =>
//                                             updateStyle({
//                                                 buttonTextColor: e.target.value,
//                                             })
//                                         }
//                                         className="h-24 w-full p-1"
//                                     />
//                                 </PopoverContent>
//                             </Popover>
//                             <Input
//                                 value={style.buttonTextColor}
//                                 onChange={(e) =>
//                                     updateStyle({ buttonTextColor: e.target.value })
//                                 }
//                                 className="h-8 flex-1 font-mono text-xs"
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export function StyleSidebar() {
//     const { style, updateStyle } = useBuilderStore();

//     // Things to consider

//     //  bgColor: '#ffffff',
//     // textColor: '#1f2937',
//     // primaryColor: '#3b82f6',
//     // borderColor: '#e5e7eb',

//     // formWidth: 'md',

//     // padding: 4,
//     // spacing: 4,

//     // inputRadius: 4,
//     // mediaRadius: 4,

//     // buttonStyle: 'solid',
//     // buttonBgColor: '#3b82f6',
//     // buttonTextColor: '#ffffff',
//     // buttonRadius: 4,

//     // fontFamily: 'Inter, sans-serif',

//     return (
//         <div className="w-full outline">
//             <div className="">hey</div>
//             <div className="">hey</div>
//             <div className="">hey</div>
//             <div className="">hey</div>
//             <div className="">hey</div>
//         </div>
//     );
// }
