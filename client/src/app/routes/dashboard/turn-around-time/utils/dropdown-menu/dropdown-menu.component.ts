import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

interface Specimen {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent implements OnInit {
  selectedValue: string;

  specs: Specimen[] = [
    {value: 'Tumor', viewValue: 'Tumor'},
    {value: 'Nerve', viewValue: 'Nerve'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
