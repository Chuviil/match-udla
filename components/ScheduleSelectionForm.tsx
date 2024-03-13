"use client";

import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {CalendarIcon} from "@radix-ui/react-icons"
import {format} from "date-fns"
import {es} from 'date-fns/locale';
import {Calendar} from "@/components/ui/calendar";
import {ToggleGroup, ToggleGroupItem,} from "@/components/ui/toggle-group"
import {horariosDisponibles} from "@/constants";
import {toast} from "@/components/ui/use-toast"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea";
import {useState} from "react";
import {useRouter} from "next/navigation";

const formSchema = z.object({
    canchaId: z.string(),
    fechaReserva: z.coerce.date(),
    horaReservaId: z.string().regex(/^M(?:1[0-3]|[0-9])$/, "Necesitas seleccionar un horario para la reserva"),
    email: z.string().email().endsWith("@udla.edu.ec", {message: "Necesitas un email institucional"}),
    idBanner: z.string().startsWith('A', {message: "Necesitas un idBanner válido"}),
    motivo: z.string({required_error: "Escribe el motivo por el que deseas reservar esta cancha"})
        .max(500, {message: "El motivo no puede exceder los 500 caracteres"}),
});

interface ScheduleSelectionFormProps {
    canchaId: string;
}

const ScheduleSelectionForm = ({canchaId}: ScheduleSelectionFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            canchaId,
        }
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    async function onSubmit(data: z.infer<typeof formSchema>) {
        setIsLoading(true);
        try {
            const response = await fetch('/api/reservas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error();
            }

            const result = await response.json();

            toast({
                title: "Reserva Exitosa!",
                description: `ID de la reservación: ${result.id}`
            });

            router.push("/");
        } catch (error) {
            toast({
                title: "Error!",
                description: 'Algo salió mal, por favor intenta de nuevo.',
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
                <div className={"grid grid-cols-1 gap-2 md:grid-cols-2"}>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email Institucional</FormLabel>
                                <FormControl>
                                    <Input placeholder="clubes@udla.edu.ec" {...field} type={"email"}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="idBanner"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>ID Banner</FormLabel>
                                <FormControl>
                                    <Input placeholder="A00000000" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name={"fechaReserva"}
                    render={({field}) => (
                        <FormItem className={"flex flex-col"}>
                            <FormLabel>Fecha de Reserva</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP", {locale: es})
                                            ) : (
                                                <span>Selecciona una Fecha</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) => {
                                            const today = new Date();
                                            today.setHours(0, 0, 0, 0);
                                            return date < today;
                                        }}
                                        locale={es}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"horaReservaId"}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Horarios de reserva</FormLabel>
                            <FormControl>
                                <ToggleGroup
                                    type="single"
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    variant={"outline"}
                                    className={"grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 justify-start"}
                                >
                                    {horariosDisponibles.map((horario) => (
                                        <ToggleGroupItem key={horario.id} value={horario.id}
                                                         aria-description={`Horario Modulo ${horario.id}`}>
                                            {horario.inicio} -{horario.fin}
                                        </ToggleGroupItem>
                                    ))}
                                </ToggleGroup>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="motivo"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Motivo</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="¿Cuál es el motivo de la reserva?"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type={"submit"} disabled={isLoading}>
                    {isLoading && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-4 w-4 animate-spin"
                        >
                            <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                        </svg>
                    )}
                    Reservar
                </Button>
            </form>
        </Form>
    );
};

export default ScheduleSelectionForm;