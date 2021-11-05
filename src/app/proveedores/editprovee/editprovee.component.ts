import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PresupuestosService } from 'src/app/servicios/presupuestos.service';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';

@Component({
  selector: 'app-editprovee',
  templateUrl: './editprovee.component.html',
  styleUrls: ['./editprovee.component.css']
})
export class EditproveeComponent implements OnInit {
  proveedorForm: FormGroup | any;
  proveedor!: any;
  id:string="";
  load:boolean=false;
  provincias: any[] = [
    'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz', 'Barcelona',
    'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba',
    'La Coruña', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara',
    'Guipúzcoa', 'Huelva', 'Huesca', 'IslasBaleares', 'Jaén', 'León', 'Lérida', 'Lugo',
    'Madrid', 'Málaga', 'Murcia', 'Navarra', 'Orense', 'Palencia', 'Las Palmas',
    'Pontevedra', 'La Rioja', 'Salamanca', 'Segovia', 'Sevilla', 'Soria', 'Tarragona',
    'Santa Cruz de Tenerife', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya',
    'Zamora', 'Zaragoza']

  constructor(private proveedoresService: ProveedoresService,private pf: FormBuilder, 
    private router: Router, private activateRoute:ActivatedRoute,private cdref:ChangeDetectorRef) {
      this.activateRoute.params.subscribe((param)=>{
        this.id=param['key'];
      });
  }

  async ngOnInit(): Promise<void> {
    this.proveedorForm = this.pf.group({
      nombre: ['', Validators.required],
      cif: ['', Validators.required],
      direccion: ['', [Validators.required]],
      cp: ['', Validators.required],
      localidad: ['', Validators.required],
      provincia: ['', Validators.required],
      telefono: [ '', Validators.required],
      email: ['', Validators.required],
      contacto: ['', Validators.required]
    });
    this.cdref.detectChanges();

    //loading
    let tmp= await this.proveedoresService.getProveedor(this.id);
    this.proveedor=tmp.val();
    setTimeout(() => {
      this.load=true
      this.cdref.detectChanges();

    }, 400);
    //Ocultar loading

  }
  onSubmit() {
    this.proveedor = this.savePresupuesto();
    this.proveedoresService.putProveedor(this.proveedor, this.id);
    this.router.navigate(['/proveedores'])
  }
  savePresupuesto() {
    const savePresupuesto = {
      nombre: this.proveedorForm.get('nombre').value,
      cif: this.proveedorForm.get('cif').value,
      direccion: this.proveedorForm.get('direccion').value,
      cp: this.proveedorForm.get('cp').value,
      localidad: this.proveedorForm.get('localidad').value,
      provincia: this.proveedorForm.get('provincia').value,
      telefono: this.proveedorForm.get('telefono').value,
      email: this.proveedorForm.get('email').value,
      contacto: this.proveedorForm.get('contacto').value
    };
    return savePresupuesto;
  }
}
