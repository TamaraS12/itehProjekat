import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Accommodation } from 'src/app/model/accommodation';

@Component({
  selector: 'app-accommodation-dialog',
  templateUrl: './accommodation-dialog.component.html',
  styleUrls: ['./accommodation-dialog.component.scss']
})
export class AccommodationDialogComponent implements OnInit {
  form: FormGroup;

  file: File;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Accommodation,
              public dialogRef: MatDialogRef<AccommodationDialogComponent>,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    if (this.data) {
      this.patchForm();
    }
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      location: [null, Validators.required],
      type: [null, Validators.required],
      capacity: [null, Validators.required],
      price_per_person: [null, Validators.required],
    });
  }

  patchForm(): void {
    this.form.patchValue({
      id: this.data.id,
      name: this.data.name,
      location: this.data.location,
      type: this.data.type,
      capacity: this.data.capacity,
      price_per_person: this.data.price_per_person
    });
  }

  saveAccommodation(): void {
    this.dialogRef.close({accommodation: this.form.getRawValue(), file: this.file});
  }

  setImage(event: any): void {
    this.file = event.target.files[0];
  }
}
