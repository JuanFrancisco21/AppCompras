export interface Presupuesto {
    proveedor:string|null,
    fecha: string|null,
    concepto: string|null,
    base: number|null,
    tipo: string|null,
    iva: number|null,
    total: string|null
}