import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { CrudService } from '../crud-service.service';
import { SuccessComponent } from '../success/success.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  createForm: FormGroup;
  Topics = this.apiService.getCategory();
  buttonLabel = 'Create';
  updateId: any;
  categoryType: any;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private apiService: CrudService) { }

  ngOnInit(): void {

    // initate the form
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      remarks: '',
      categoryType: ['', Validators.required],
      description: ['', Validators.required]
    });

    // form reset during routing
    this.router.events.subscribe(Event => {
      if (Event instanceof NavigationEnd) {
        this.createForm.reset();
        this.buttonLabel = 'Create';
      }
    });

    // receiving data from search page
    const editData = this.apiService.getItems();
    if (editData && editData.length !== 0) {
      this.createForm.setValue({
        name: this.isKeyInObject(editData, 'name'),
        remarks: this.isKeyInObject(editData, 'remarks'),
        categoryType: this.isKeyInObject(editData, 'categoryType'),
        description: this.isKeyInObject(editData, 'description')
      });
      this.buttonLabel = 'Update';
      this.categoryType = this.isKeyInObject(editData, 'categoryType');
      this.updateId = editData._id;
      this.createForm.get('categoryType').disable();
    }
  }

  onSubmit(formtype) {

    if (formtype === 'Create') {  // create flow
      this.apiService.create(this.createForm.value)
        .subscribe(data => {
          this.showPopup('Record has been created successfully');
        });
    } else { // update flow
      const formInputs = Object.assign(this.createForm.value, {
        categoryType: this.categoryType
      });
      this.apiService.update(this.updateId, formInputs)
        .subscribe(data => {
          this.showPopup('Record has been updated successfully');
        });
    }

  }

  showPopup(data) {
    const dialogRef = this.dialog.open(SuccessComponent, {
      height: 'auto',
      width: '25%',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/search']);
    });
  }

  // Check json key exists or not
  isKeyInObject(obj, key) {
    if (obj !== undefined && obj !== null) {
      const res = Object.keys(obj).some(v => v === key);
      if (res) {
        return obj[key];
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

}
