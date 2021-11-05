import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PresupuestosService } from 'src/app/servicios/presupuestos.service';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';

@Component({
  selector: 'app-addpres',
  templateUrl: './addpres.component.html',
  styleUrls: ['./addpres.component.css']
})
export class AddpresComponent implements OnInit {

  presupuestoForm: FormGroup|any;
  presupuesto: any;
  base: any;
  tipo: any;
  iva: any = 0;
  total: any = 0;
  proveedores: any []=[];
  
  constructor(private pf: FormBuilder,private proveedoresService:ProveedoresService ,private presupuestoService:PresupuestosService) { }

  async ngOnInit() {
    this.proveedores=this.proveedoresService.getProveedores();
    this.presupuestoForm = this.pf.group({
     proveedor: ['', Validators.required ],
     fecha: ['', Validators.required ],
     concepto: ['', [ Validators.required, Validators.minLength(10)] ],
     base: ['', Validators.required ],
     tipo: ['', Validators.required ],
     iva: this.iva , 
     total: this.total
     });
    this.onChanges(); 
  }
  onChanges():void{
    this.presupuestoForm.valueChanges.subscribe((valor: { base: any; tipo: any; }) => { 
    this.base = valor.base; 
    this.tipo = valor.tipo;
    this.presupuestoForm.value.iva = this.base * this.tipo; 
    this.presupuestoForm.value.total = this.base + (this.base * this.tipo);
    });
  }
  onSubmit() {
    this.presupuesto = this.savePresupuesto();
    this.presupuestoService.postPresupuesto(this.presupuesto);
    this.presupuestoForm.reset();
  }
  savePresupuesto() {
    const savePresupuesto = {
      proveedor: this.presupuestoForm.get('proveedor').value,
      fecha: this. presupuestoForm.get('fecha').value,
      concepto: this.presupuestoForm.get('concepto').value,
      base: this.presupuestoForm.get('base').value,
      tipo: this.presupuestoForm.get('tipo').value,
      iva: this.presupuestoForm.get('iva').value,
      total: this.presupuestoForm.get('total').value
    };
    return savePresupuesto;
  }
}
