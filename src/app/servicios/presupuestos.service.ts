import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import { Presupuesto } from '../Model/Presupuesto';


@Injectable({
  providedIn: 'root'
})
export class PresupuestosService {
  presupuestos: Presupuesto[]|any[]= [];
  presupuesto: Presupuesto|any={};


  constructor(private router:Router,
    private db:AngularFireDatabase) { }

    public getPresupuestos(){
      this.presupuestos=[];
      this.db.database.ref().child("presupuestos").get().then((data)=>{
        const presupuestos=data.val();
        for(let presupuesto in presupuestos){
          const p=presupuestos[presupuesto];
          p.id$=presupuesto;
          this.presupuestos.push(presupuestos[presupuesto])
        }
      })
      return this.presupuestos;
    }
    async getPresupuesto(id:string):Promise<firebase.default.database.DataSnapshot> {
      return this.db.database.ref().child("presupuestos").child(id).get();
    }

    public postPresupuesto(presupuesto:any):void{
      this.db
      .database.ref()
      .child("presupuestos").push(presupuesto);
    }

    public putPresupuesto(presupuesto:any, id:string){
      this.db
      .database.ref()
      .child("presupuestos").child(id).update(presupuesto);
    }

    public delPresupuesto(id: any){
      this.db.list("/presupuestos/"+id).remove();
    }

}
