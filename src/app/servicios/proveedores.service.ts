import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Proveedor } from '../Model/Proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  proveedor: Proveedor|any={};
  proveedores: Proveedor[]|any []= [];
  constructor(private router:Router, private db:AngularFireDatabase) { }

  public getProveedores(){
    this.proveedores=[];
    this.db.database.ref().child("proveedores").get().then((data)=>{
      const proveedores=data.val();
      for(let proveedor in proveedores){
        const p=proveedores[proveedor];
        p.id$=proveedor;
        this.proveedores.push(proveedores[proveedor])
      }
    })
    return this.proveedores;
  }
  async getProveedor(id:string):Promise<firebase.default.database.DataSnapshot> {
    return this.db.database.ref().child("proveedores").child(id).get();
  }

  public postProveedor(proveedor:any):void{
    this.db
    .database.ref()
    .child("proveedores").push(proveedor);
  }

  public putProveedor(proveedor:any, id:string){
    this.db
    .database.ref()
    .child("proveedores").child(id).update(proveedor);
  }

  public delProveedor(id: any){
    this.db.list("/proveedores/"+id).remove();
  }
  /*getProveedores(){
    return this.proveedores;
  }*/
}
