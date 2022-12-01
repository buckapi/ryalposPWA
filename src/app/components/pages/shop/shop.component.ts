import { Component, AfterViewInit } from '@angular/core';
import {Butler} from '@app/services/butler.service';
import { Router } from '@angular/router';
import { Apollo } from "apollo-angular";
import { DataService } from '@app/services/data.service'; 
import { DataApiService } from '@app/services/data-api.service'; 
import gql from "graphql-tag";
import { ScriptService } from '@app/services/script.service';
import { ScriptStore } from '@app/services/script.store';
import {CATEGORIES} from '@app/services/categories.service';
import { SwiperOptions } from 'swiper';
import { DealInterface } from '@app/interfaces/deal';
    import { ChangeDetectorRef } from '@angular/core';
    import { CapitalizeFirstPipe } from '@pipes/capitalizefirst.pipe';
    //import * as $ from 'jquery';
   declare var $: any;
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements AfterViewInit {
    members$: any;
  date="Nov 30, 2022 00:00:00";
    config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30
  };
  products: any;
  products$: any;  
  categories: any;
  categories$: any;
  deal:any={
    name:"",
    price:""
  };
  constructor(    private cdRef:ChangeDetectorRef,
      public script:ScriptService,
      private apollo: Apollo,
    public dataApi: DataService,
    public dataApiService: DataApiService,
      public _butler: Butler,
      public router:Router
    ) { 
  this.categories=CATEGORIES

    }

  openModal(i:any){
    this._butler.modalOption=i;
    // this._butler.skip=0;
    // this._butler.limit=9;

     
  }
  loadProducts(){
    this._butler.skip=0;
    this._butler.limit=9;

     
  }

  setPreview(member:any){
    this._butler.preview=member;
     this.router.navigate(['/member']);

     
  }
   public viewChange(option:any){
    if(option=='grid'){
      this._butler.grid=true;
      this._butler.list=false;
    }if(option=='list'){
      this._butler.grid=false;
      this._butler.list=true;
    }
  }

  ngAfterViewInit(): void {
this._butler.medio=true;
    
     // this.products$=this.dataApi.products$;   
     this.categories$=this.dataApi.categories$;   
     this.deal=this.dataApiService.getProduct('63690c39f5378a17fb721fae') 
     .subscribe((
      deal$:DealInterface) => (
        this.deal=deal$
        // this._butler.idBuckapicard=this._butler.cards[0].id,
        // this._butler.idApp=this._butler.cards[0].idApp,
        // this._butler.idBranch=this._butler.cards[0].idBranch,
 //       console.log(JSON.stringify(this.deal))
      ),      
    );
 this.cdRef.detectChanges();
   // this.loadProducts();
    this.loadFromRestUniversal();
  }


public quick(tix:any){
    let tixToView = tix;
    this._butler.preview=tixToView;
    // this._butler.preview.quantity=1; 
    this._butler.imagePreviewProduct=this._butler.preview.images[0];
      // this.router.navigate(['/product']);
  } 
 public viewProduct(tix:any){
    let tixToView = tix;
    this._butler.preview=tixToView;
    // this._butler.preview.quantity=1; 
    this._butler.imagePreviewProduct=this._butler.preview.images[0];
      this.router.navigate(['/product']);
  } 
  public loadFromRestUniversal(){
      this.members$=this.dataApiService.getAllMembers();
  }
  loadmore(indice:any
    ){
    // this.products$=[];
    //console.log(indice);
     this._butler.skip=this._butler.skip+9; 
      this.dataApi.getDataAPI(this._butler.skip,this._butler.limit);   
     this.products$=this.dataApi.products$;  
     // this._butler.limit=this._butler.limit+9; 
  }
}
