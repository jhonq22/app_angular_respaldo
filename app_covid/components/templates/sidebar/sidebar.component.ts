import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  
  constructor() { }

  ngOnInit(): void {
    $('.button-menu-mobile').on('click', function (event) {
      event.preventDefault();
      $("body").toggleClass("enlarged");
  });
  }

  

}
