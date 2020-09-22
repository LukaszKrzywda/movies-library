import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/movie.service';
import { NgForm } from '@angular/forms';
import { faTrashAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  faTrashAlt = faTrashAlt;
  faInfoCircle = faInfoCircle;
  fileName = 'Pobierzdane.xlsx';
  constructor(public service: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.service.refreshList();
  }

  restForm(form?: NgForm) {
    if (form != null) form.form.reset();
    this.service.formData = {
      Id: 0,
      Title: null,
      Director: null,
      Plot: '',
      Date: '',
      Mark: '',
    };
  }

  onDelete(id) {
    this.service.deleteMovie(id).subscribe(
      (res) => {
        this.service.refreshList();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openDetails(id) {
    this.router.navigate(['/details', id]);
  }

  excelExport(): void {
    let element = document.getElementById('excel');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }
}
