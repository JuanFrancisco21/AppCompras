import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PresupuestosService } from 'src/app/servicios/presupuestos.service';
import { EditpresComponent } from '../editpres/editpres.component';

@Component({
  selector: 'app-presupuestos',
  templateUrl: './presupuestos.component.html',            
  styleUrls: ['./presupuestos.component.css']
})
export class PresupuestosComponent implements OnInit {
  presupuestos: any;
  constructor(private presupuestosService: PresupuestosService) { }

  ngOnInit(): void {
    this.presupuestos = this.presupuestosService.getPresupuestos();
  }
  eliminarPresupuesto(id$: any) {
    this.presupuestosService.delPresupuesto(id$);
    this.presupuestos = this.presupuestosService.getPresupuestos();
  }

}
