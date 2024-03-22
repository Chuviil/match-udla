"use client"

import {ColumnDef, flexRender, getCoreRowModel, useReactTable,} from "@tanstack/react-table"

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {Reservation, ReservationStatus} from "@/types";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {FaEllipsis} from "react-icons/fa6";
import {useMemo} from "react";
import {useRouter} from "next/navigation";

interface DataTableProps {
    data: Reservation[]
}

export function ReservationsTable({data}: DataTableProps) {
    const router = useRouter();

    const handleReservationAccept = async (reservationId: string) => {
        try {
            const response = await fetch(`/api/reservas/${reservationId}/estado`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({estado: ReservationStatus.ACEPTADA}),
            });

            if (!response.ok) {
                throw new Error('Failed to update reservation status');
            }

            router.refresh();
        } catch (error) {
            console.error(error);
        }
    };

    const columns = useMemo<ColumnDef<Reservation>[]>(() =>
        [
            {
                accessorKey: "canchaId",
                header: "ID Cancha",
            },
            {
                accessorKey: "idBanner",
                header: "ID Banner",
            },
            {
                accessorKey: "email",
                header: "Email Institucional",
            },
            {
                accessorKey: "fechaReserva",
                header: "Fecha de Reserva",
                cell: ({row}) => {
                    const date = new Date(row.getValue("fechaReserva"));
                    return date.toLocaleDateString();
                }
            },
            {
                accessorKey: "horaReservaId",
                header: "Hora de Reserva",
            },
            {
                id: "review",
                cell: ({row}) => {
                    const reservation = row.original;

                    return (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>Revisar</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>¿Desea aceptar esta solicitud de reserva?</DialogTitle>
                                    <DialogDescription>
                                        <strong className={"font-bold"}>Solicitante</strong><br/>
                                        <span>{reservation.email}</span><br/>
                                        <strong className={"font-bold"}>Fecha de Reserva</strong><br/>
                                        <span>{reservation.fechaReserva.toLocaleDateString()}</span><br/>
                                        <strong className={"font-bold"}>Hora de Reserva</strong><br/>
                                        <span>{reservation.horaReservaId}</span><br/>
                                        <strong className={"font-bold text-justify"}>Motivo</strong><br/>
                                        <span>{reservation.motivo}</span>
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type={"button"} variant={"outline"}>Cancelar</Button>
                                    </DialogClose>
                                    <Button type={"button"} variant={"destructive"}>Rechazar</Button>
                                    <Button type={"button"}
                                            onClick={() => handleReservationAccept(reservation.id)}>Aceptar</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    )
                }
            },
            {
                id: "actions",
                cell: ({row}) => {
                    const reservation = row.original

                    return (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant={"ghost"} className={"h-8 w-8 p-0"}>
                                    <span className={"sr-only"}>Abrir Opciones</span>
                                    <FaEllipsis className={"h-4 w-4"}/>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align={"end"}>
                                <DropdownMenuLabel>
                                    Acciones
                                </DropdownMenuLabel>
                                <DropdownMenuItem
                                    onClick={() => navigator.clipboard.writeText(reservation.email)}
                                >
                                    Copiar Correo
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )
                }
            }
        ], []);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No hay datos
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
