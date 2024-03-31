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
import {toast} from "@/components/ui/use-toast"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {Skeleton} from "@/components/ui/skeleton"
import {HorarioDTO, TipoCancha} from "@/types";
import {FaCheck, FaRegSquare, FaSort, FaSquare} from "react-icons/fa6";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,} from "@/components/ui/command"

const formSchema = z.object({
    canchaId: z.string(),
    tipoCancha: z.string(),
    fechaReserva: z.coerce.date(),
    horaReservaId: z.string().regex(/^M(?:1[0-3]|[0-9])$/, "Para completar la reserva, debes seleccionar un horario"),
    email: z.string().email().endsWith("@udla.edu.ec", {message: "Necesitas un email institucional"}),
    idBanner: z.string().regex(/^A\d{8}$/, {message: "Para completar la reserva, debes proporcionar un ID Banner válido."}),
    motivo: z.string({required_error: "Indica el motivo por el que deseas reservar esta cancha"})
        .max(500, {message: "El motivo no puede exceder los 500 caracteres"}),
});

interface ScheduleSelectionFormProps {
    canchaId: string;
    tiposCancha: TipoCancha[],
}


const ScheduleSelectionForm = ({canchaId, tiposCancha}: ScheduleSelectionFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            canchaId,
        }
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isHoursLoading, setIsHoursLoading] = useState<boolean>(true);
    const [horariosDisponibles, setHorariosDisponibles] = useState<HorarioDTO[]>([]);
    const router = useRouter();

    async function refetchHours() {
        const date = form.getValues("fechaReserva");
        const tipoCancha = form.getValues("tipoCancha");
        if (!date || !tipoCancha) return;
        setIsHoursLoading(true);
        try {
            const urlSearchParams = new URLSearchParams({fecha: date.toISOString(), tipoCancha})
            const response = await fetch(
                `/api/canchas/${canchaId}/horariosDisponibilidad?${urlSearchParams.toString()}`
            );

            if (!response.ok) {
                throw new Error();
            }

            const result = await response.json();

            setIsHoursLoading(false);
            setHorariosDisponibles(result);
        } catch (error) {
            setIsHoursLoading(false);
        }
    }

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

            toast({
                title: "¡Felicidades! Tu solicitud de reserva fue exitosa.",
                description: `Pronto recibirás un correo indicando el estado de tu reserva.`
            });

            router.push("/");
        } catch (error) {
            toast({
                title: "Error!",
                description: '¡Lo siento!,algo salió mal. Por favor, inténtalo de nuevo.',
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
                <div className={"grid grid-cols-1 gap-2 md:grid-cols-2"}>
                    <FormField
                        control={form.control}
                        name="tipoCancha"
                        render={({field}) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Tipo de Cancha</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    "justify-between",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value
                                                    ? tiposCancha.find(
                                                        (tipoCancha) => tipoCancha === field.value
                                                    )
                                                    : "Selecciona una cancha"}
                                                <FaSort className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0">
                                        <Command>
                                            <CommandInput
                                                placeholder="Buscar tipo de cancha..."
                                                className="h-9"
                                            />
                                            <CommandEmpty>Tipo de cancha no encontrada.</CommandEmpty>
                                            <CommandList>
                                                <CommandGroup>
                                                    {tiposCancha.map((tipoCancha) => (
                                                        <CommandItem
                                                            value={tipoCancha}
                                                            key={tipoCancha}
                                                            onSelect={() => {
                                                                form.setValue("tipoCancha", tipoCancha)
                                                                refetchHours();
                                                            }}
                                                        >
                                                            {tipoCancha}
                                                            <FaCheck
                                                                className={cn(
                                                                    "ml-auto h-4 w-4",
                                                                    tipoCancha === field.value
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
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
                                            onSelect={(date) => {
                                                field.onChange(date)
                                                refetchHours();
                                            }
                                            }
                                            disabled={(date) => {
                                                return date < new Date() || date > new Date(new Date().setDate(new Date().getDate() + 7))
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
                </div>
                <FormField
                    control={form.control}
                    name={"horaReservaId"}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Horarios de reserva</FormLabel>
                            <div className={"flex items-center justify-start text-sm gap-5"}>
                                <div className={"inline-flex items-center gap-1"}>
                                    <FaRegSquare/>
                                    <p>Libre</p>
                                </div>
                                <div className={"inline-flex items-center gap-1"}>
                                    <FaSquare className={"text-red-500"}/>
                                    <p>Ocupado</p>
                                </div>
                                <div className={"inline-flex items-center gap-1"}>
                                    <FaSquare className={"text-blue-500"}/>
                                    <p>Reserva Club</p>
                                </div>
                            </div>
                            <FormControl>
                                {!form.getValues("fechaReserva") || !form.getValues("tipoCancha") ? (
                                    <p className={"text-center text-sm"}>Selecciona un tipo de cancha y fecha para ver los horarios
                                        disponibles</p>
                                ) : (isHoursLoading ? (
                                        <div
                                            className={"grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 justify-start"}>
                                            {Array.from({length: 12}).map(() => (
                                                <Skeleton className="w-[110px] h-9 px-3 rounded-md"/>
                                            ))
                                            }
                                        </div>
                                    ) : (
                                        <ToggleGroup
                                            type="single"
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            variant={"outline"}
                                            className={"grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 justify-start"}
                                        >
                                            {horariosDisponibles.map((horario) => {

                                                    if (!horario.disponible) {
                                                        return (
                                                            <div key={horario.id}
                                                                 aria-description={`Horario Modulo ${horario.id}`}
                                                                 className={"horario-container"}
                                                            >
                                                                {horario.inicio} -{horario.fin}
                                                            </div>
                                                        )
                                                    }
                                                    return (
                                                        <ToggleGroupItem key={horario.id} value={horario.id}
                                                                         aria-description={`Horario Modulo ${horario.id}`}>
                                                            {horario.inicio} -{horario.fin}
                                                        </ToggleGroupItem>
                                                    )
                                                }
                                            )
                                            }
                                        </ToggleGroup>
                                    )
                                )}
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