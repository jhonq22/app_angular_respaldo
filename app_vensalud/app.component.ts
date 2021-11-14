import { Component, OnInit } from '@angular/core';
// import * as $ from "jquery";
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'adminlte';
    
    ngOnInit() {
      $('ul').on('expanded.tree');
      
      $.widget.bridge('uibutton', $.ui.button);
    }

    selectedCountry: String = "--Choose Country--";
    
    Countries: Array<any> = [
      { name: 'Germany', states: [ {name: 'A', cities: ['Duesseldorf', 'Leinfelden-Echterdingen', 'Eschborn']} ] },
      { name: 'Spain', states: [ {name: 'B', cities: ['Barcelona']} ] },
      { name: 'USA', states: [ {name: 'C', cities: ['Downers Grove']} ] },
      { name: 'Mexico', states: [ {name: 'D', cities: ['Puebla']} ] },
      { name: 'India', states: [ {name: 'E', cities: ['Delhi', 'Kolkata', 'Mumbai', 'Bangalore']} ] },
    ];
    
    states: Array<any>;
  
    cities: Array<any>;
    
    changeCountry(country) {
      this.states = this.Countries.find(cntry => cntry.name == country).states;
    }
  
    changeState(state) {
      this.cities = this.Countries.find(cntry => cntry.name == this.selectedCountry).states.find(stat => stat.name == state).cities;
    }

}
