import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spinner-container',
  templateUrl: './spinner-container.component.html',
  styleUrls: ['./spinner-container.component.css']
})
export class SpinnerContainerComponent implements OnInit {

  constructor() { }

  @Input() value: number = 100;
  @Input() diameter: number = 100;
  @Input() mode: string = "indeterminate";
  @Input() strokeWidth: number = 10;
  @Input() overlay: boolean = false;
  @Input() color: string = "primary";

  ngOnInit() {

  }

}