import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

// interface Specimen {
//   value: string;
//   viewValue: string;
// }

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent implements OnInit {
  specType: string;

  // specTypeHandler (event: any) {
  //   this.selectedValue = event.target.value;
  // }
  constructor() { }

  ngOnInit(): void {
  }

}
