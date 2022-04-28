import { Component, OnInit } from '@angular/core';
import { ResolveStart } from '@angular/router';
import { Model } from './model';
import { TodoItem } from './todoitem';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    if (localStorage.getItem("baslik")) {
      setTimeout(() => {
        let x = document.getElementById("inputton")
        if(x?.style.visibility=="visible"){
          x.style.visibility="hidden"
        }
        let y = document.getElementById("inputtonn")
        if(y?.style.visibility=="visible"){
          y.style.visibility="hidden"
        }
      }, 1);
      
        
    }
    
    
    
  }

  baslik:string=localStorage.getItem("baslik")?.slice(1,Number(localStorage.getItem("baslik")?.length)-1)||"";
  
  // items=[
  //   "İtem 1","İtem 2","İtem 3","İtem 4"
  // ];

  displayAll:boolean=false;
  inputText:string="";

  

  constructor(){
    this.model.items=this.getItemsFromLS();
    
  }
  

  model =new Model();


  getName(){
      this.baslik==this.model.name;
      localStorage.setItem("baslik",JSON.stringify(this.baslik))
      let x = document.getElementById("inputton")
      if(x?.style.visibility=="visible"){
        x.style.visibility="hidden"
      }
      let y = document.getElementById("inputtonn")
      if(y?.style.visibility=="visible"){
        y.style.visibility="hidden"
      }
      
      
      
  }
  

  getItems(){
    if(this.displayAll){
      return this.model.items;

    }
    return this.model.items.filter(item=>!item.action);
  }

  // addItem(input:any){
  //   console.log(input.value);
  // }



  message="";

  addItem(){
    if(this.inputText!=""){
      let data={description:this.inputText, action:false};
      this.model.items.push(data);

      let items=this.getItemsFromLS();
      items.push(data);
      localStorage.setItem("items",JSON.stringify(items))
      this.inputText='';
    }
    else{
       alert("Bilgi giriniz.");
    }
    
   }

   onActionChanged(item:TodoItem){
     let items=this.getItemsFromLS();
     localStorage.clear();
     items.forEach(i=>{
       if(i.description==item.description){
         i.action=item.action;
       }
     })
     localStorage.setItem("items",JSON.stringify(items))
   }

   getItemsFromLS(){
     let items:TodoItem[]=[];
     let value=localStorage.getItem("items")
     if(value!=null){
       items=JSON.parse(value);
     }
     return items;
   }

   deleteall(){
    let items:TodoItem[]=[];
    this.model.items=[];
    console.log(this.model.items);
    localStorage.clear();
    
   }
  //  if(this.model.items[index]==null){
  //   localStorage.removeItem('null');
  // }
   
   deleteone(a:any){
    
    this.model.items.forEach((i,index)=>{
      if(i.description==a){
        console.log(index);
        this.model.items.splice(index,1);
        
        localStorage.setItem("items",JSON.stringify(this.model.items));
      }
      
    })
   }

   displayCount(){
      
          return this.model.items.filter(i=>i.action).length;
      
   }

   getBtnClasses(){
    return{
      'disabled':this.inputText.length==0,
      'btn-secondary':this.inputText.length==0,
      'btn-primary':this.inputText.length>0
    }
   }

   getBtnNameClasses(){
    return{
      'disabled':this.baslik.length==0,
      'btn-secondary':this.baslik.length==0,
      'btn-success':this.baslik.length>0
    }
   }

  
}
