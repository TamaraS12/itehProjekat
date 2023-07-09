import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Accommodation } from 'src/app/model/accommodation';

@Component({
  selector: 'app-accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrls: ['./accommodation-card.component.scss']
})
export class AccommodationCardComponent implements OnInit {
  @Input() accommodation: Accommodation;

  @Output() accommodationClicked = new EventEmitter<void>();
  @Output() accommodationDelete = new EventEmitter<void>();

  @Input() loggedUserRole: number | null;

  imageSource: any;

  constructor(private sanitizer: DomSanitizer) {

  }
  ngOnInit(): void {
    console.log(this.accommodation);
    this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.accommodation.photo}`);
    console.log(this.imageSource);
    
  }

  handleClick(): void {
    this.accommodationClicked.emit();
  }

  handleDelete(): void {
    this.accommodationDelete.emit();
  }
}
