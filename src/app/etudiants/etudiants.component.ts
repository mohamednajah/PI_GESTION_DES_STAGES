import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {EtudiantsService} from "../services/etudiants.service";
import * as XLSX from 'xlsx'
import {etudiants} from "../models/etudiant";
import {Router} from "@angular/router";
@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  styleUrls: ['./etudiants.component.css'],
})
export class EtudiantsComponent implements OnInit {

  displayedColumns: string[] = [
    'codeApogee',
    'cne',
    'cni',
    'nom',
    'prenom',
    'dateNaissance',
    'ville',
    'adresse',
    'telephone',
    'email'
  ];
  isCardVisible = false;


  newEtudiantFormGroup!: FormGroup;
  showSuccessMessage: boolean = false;
  successMessage: string = '';
  showProgressBar: boolean = false;
  progressValue: number = 0;
  ExcelData: any;
  etudiantList: etudiants[] = [];
  allStudents: etudiants[] = [];

  constructor(private http: HttpClient, private etudiantsService: EtudiantsService, private fb: FormBuilder, private router: Router
  ) {
  }

  showForm = false;

  importUsers() {
    this.ExcelData.forEach((row: any) => {
      const etudiant: etudiants = {
        codeApogee: row.codeApogee,
        cne: row.cne,
        cni: row.cni,
        nom: row.nom,
        prenom: row.prenom,
        dateNaissance: row.dateNaissance,
        ville: row.ville,
        adresse: row.adresse,
        telephone: row.telephone,
        email: row.email

      };
      this.etudiantList.push(etudiant);
    });

    this.etudiantList.forEach((etudiant: etudiants, index: number) => {
      console.log(etudiant)
      this.etudiantsService.addEtudiant(etudiant).subscribe(
        () => {
          console.log('Import successful!');
          this.progressValue = Math.round(((index + 1) / this.etudiantList.length) * 100);
          if (index === this.etudiantList.length - 1) {
            this.showProgressBar = false;
            this.showSuccessMessage = true;
            this.successMessage = 'Importation avec succée!';
            setTimeout(() => {
              this.showSuccessMessage = false;
            }, 3000);
          }
        },
        (error: any) => {
          // Error handling
          console.error('Error occurred while importing:', error);
        }
      );
    });
  }

  exportToCSV() {
    this.etudiantsService.getEtudiants().subscribe((etudiants: any[]) => {
      console.log(etudiants);
      const csvData = this.convertToCSV(etudiants);
      const blob = new Blob([csvData], {type: 'text/csv;charset=utf-8;'});
      const downloadLink = document.createElement('a');
      const url = URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.download = 'etudiants.csv';
      downloadLink.click();
      URL.revokeObjectURL(url);
    });
  }

  convertToCSV(data: any[]) {
    const header = Object.keys(data[0]).join(',') + '\n';
    const rows = data.map(obj => Object.values(obj).join(',') + '\n');
    return header + rows.join('');
  }


  readexcel(event: any) {

    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (e) => {
      var workBook = XLSX.read(fileReader.result, {type: "binary"});
      var sheetNames = workBook.SheetNames;
      this.ExcelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]])
      this.showProgressBar = true;
      this.progressValue = 0;
      console.log(this.ExcelData);

    }

  }


  ngOnInit(): void {
    this.newEtudiantFormGroup = this.fb.group({
      codeApogee: this.fb.control(null, [Validators.required]),
      cne: this.fb.control(null, [Validators.required]),
      cni: this.fb.control(null, [Validators.required]),
      nom: this.fb.control(null, [Validators.required]),
      prenom: this.fb.control(null, [Validators.required]),
      dateNaissance: this.fb.control(null, [Validators.required]),
      ville: this.fb.control(null, [Validators.required]),
      adresse: this.fb.control(null, [Validators.required]),
      telephone: this.fb.control(null, [Validators.required]),
      email: this.fb.control(null, [Validators.required, Validators.email])
    });
  }

  handleSaveStudent() {
    this.showProgressBar = true;
    this.progressValue = 0;
    let student: etudiants = this.newEtudiantFormGroup.value;
    this.etudiantsService.addEtudiant(student).subscribe({
      next: data => {
        this.progressValue = Math.round(100);
        this.showSuccessMessage = true;
        this.successMessage = 'Etudiant enregistré avec succée!';
        setTimeout(() => {
          this.showSuccessMessage = false;
          this.showProgressBar = false;
        }, 3000);
        this.newEtudiantFormGroup.reset();
        this.newEtudiantFormGroup.clearValidators();
        this.router.navigateByUrl("/etudiants");
      },
      error: err => {
        console.log(err);
      }
    });
  }

  fetchStudents() {
    this.isCardVisible = true;
    console.log("fetchStudents called")
    this.etudiantsService.getEtudiants().subscribe((students) => {
      console.log(students)
      this.allStudents = students;
    });
    console.log(this.allStudents);

  }
  closeCard() {
    this.isCardVisible = false;
  }
}
