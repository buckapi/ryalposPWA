import { Component, AfterViewInit } from '@angular/core';
import {Butler} from '@app/services/butler.service';
@Component({
  selector: 'app-sumary',
  templateUrl: './sumary.component.html',
  styleUrls: ['./sumary.component.css']
})
export class SumaryComponent implements AfterViewInit {

  constructor(
      public _butler: Butler
    ) { }

  ngAfterViewInit(): void {
    this._butler.medio=false;
  }

}
