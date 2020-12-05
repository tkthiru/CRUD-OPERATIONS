import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../crud-service.service';
import { MatDialog} from '@angular/material/dialog';
import { SuccessComponent } from '../success/success.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  Topics = this.apiService.getCategory();
  columns = [
    { name: 'Category Type', prop: 'categoryType', width: 120, minWidth: 120 },
    { name: 'Description', prop: 'description', width: 125, minWidth: 120 },
    { name: 'Name', prop: 'name', width: 125, minWidth: 120 },
    { name: 'Remarks', prop: 'remarks', width: 125, minWidth: 120 },
  ];
  FDcount = 5;
  pageLimit = 5;
  rowDatas: any;
  rowCount: any;
  showTable = false;
  constructor(private formBuilder: FormBuilder, private router: Router, public dialog: MatDialog, private apiService: CrudService) { }

  ngOnInit(): void {
    this.apiService.addItem('');

    this.searchForm = this.formBuilder.group({
      categoryType: ['', Validators.required]
    });

  }

  onSearchSubmit() {
    if (this.searchForm.valid) {
      this.showTable = true;
      this.apiService.getAll(this.searchForm.value).subscribe((data) => {
        this.rowDatas = data;
        this.rowCount = this.rowDatas.length;
      });
    }
  }

  onEdit(data) {
    this.apiService.addItem(data);
    this.router.navigate(['/create']);
  }


  onDelete(data) {

    this.apiService.delete(data).subscribe(() => {
      const dialogRef = this.dialog.open(SuccessComponent, {
        height: 'auto',
        width: '25%',
        data: 'Record has been deleted successfully'
      });
      dialogRef.afterClosed().subscribe(result => {
        // with api call
        this.apiService.getAll(this.searchForm.value).subscribe((data) => {
          this.rowDatas = data;
          this.rowCount = this.rowDatas.length;
        });

        // without api call 
        //  this.rowDatas = this.rowDatas.filter(item => item !== data);

      });
    }, (error) => {
      console.log("error:", error);
    });


  }

}
