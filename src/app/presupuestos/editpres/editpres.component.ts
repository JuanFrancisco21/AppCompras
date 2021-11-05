import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PresupuestosService } from 'src/app/servicios/presupuestos.service';

@Component({
  selector: 'app-editpres',
  templateUrl: './editpres.component.html',
  styleUrls: ['./editpres.component.css']
})
export class EditpresComponent implements OnInit {
  presupuestoForm: FormGroup | any;
  presupuesto!: any;
  base: any;
  tipo: any;
  iva: any = 0;
  total: any = 0;
  id:string="";
  load:boolean=false;

  constructor(private presupuestoService: PresupuestosService,private pf: FormBuilder, 
    private router: Router, private activateRoute:ActivatedRoute,private cdref:ChangeDetectorRef) {
      this.activateRoute.params.subscribe((param)=>{
        this.id=param['key'];
      });
  }
  async ngOnInit(): Promise<void> {
    this.presupuestoForm = this.pf.group({
      proveedor: ['', Validators.required],
      fecha: ['', Validators.required],
      concepto: ['', [Validators.required, Validators.minLength(10)]],
      base: ['', Validators.required],
      tipo: ['', Validators.required],
      iva: this.iva,
      total: this.total
    });

    //loading
    let tmp= await this.presupuestoService.getPresupuesto(this.id);
    this.presupuesto=tmp.val();
    setTimeout(() => {
      this.load=true
      this.cdref.detectChanges();

    }, 400);
    //Ocultar loading

    this.onChanges();
    this.cdref.detectChanges();
  }
  onChanges(): void {
    this.presupuestoForm.valueChanges.subscribe((valor: { base: any; tipo: any; }) => {
      this.base = valor.base;
      this.tipo = valor.tipo;
      this.presupuestoForm.value.iva = this.base * this.tipo;
      this.presupuestoForm.value.total = this.base + (this.base * this.tipo);
    });
  }

  onSubmit() {
    this.presupuesto = this.savePresupuesto();
    this.presupuestoService.putPresupuesto(this.presupuesto, this.id);
    this.router.navigate(['/presupuestos'])
  }

  savePresupuesto() {
    const savePresupuesto = {
      proveedor: this.presupuestoForm.get('proveedor').value,
      fecha: this.presupuestoForm.get('fecha').value,
      concepto: this.presupuestoForm.get('concepto').value,
      base: this.presupuestoForm.get('base').value,
      tipo: this.presupuestoForm.get('tipo').value,
      iva: this.presupuestoForm.get('iva').value,
      total: this.presupuestoForm.get('total').value
    };
    return savePresupuesto;
  }

}
