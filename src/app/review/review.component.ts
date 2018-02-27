import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  public expands = [false, false, false, false];
  public displays = [true, true, true, true];

  constructor() { }

  ngOnInit() {
  }

  buttonClick(position: number) {
    const expand = this.expands[position];
    if (!expand) {
      this.expands[position] = true;
      for (let i = 0; i < this.expands.length; i++) {
        if (i !== position) {
          this.displays[i] = false;
        }
      }
    } else {
      this.expands[position] = false;
      for (let i = 0; i < this.expands.length; i++) {
        if (i !== position) {
          this.displays[i] = true;
        }
      }
    }
  }

}
