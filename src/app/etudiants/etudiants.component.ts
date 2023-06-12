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

  newEtudiantFormGroup! : FormGroup;

  ExcelData:any;
  constructor(private http: HttpClient,private etudiantsSerive:EtudiantsService, private fb: FormBuilder, private router:Router
  ) {}

  showForm = false;
  importUsers() {
    // Logic for importing users
  }

  exportToCSV() {
    this.etudiantsSerive.getEtudiants().subscribe((etudiants: any[]) => {
      console.log(etudiants);
      const csvData = this.convertToCSV(etudiants);
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
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





readexcel(event:any){
   let file=event.target.files[0];
   let fileReader=new FileReader();
   fileReader.readAsBinaryString(file);
  fileReader.onload=(e)=>{
    var workBook = XLSX.read(fileReader.result, {type: "binary"});
      var sheetNames= workBook.SheetNames;
      this.ExcelData= XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]])
      console.log(this.ExcelData);

  }
}

  ngOnInit(): void {
    this.newEtudiantFormGroup=this.fb.group({
      codeApogee : this.fb.control(null, [Validators.required]),
      cne : this.fb.control(null, [Validators.required]),
      cni : this.fb.control(null, [Validators.required]),
      nom : this.fb.control(null, [Validators.required]),
      prenom : this.fb.control(null, [Validators.required]),
      dateNaissance : this.fb.control(null, [Validators.required]),
      ville : this.fb.control(null, [Validators.required]),
      adresse : this.fb.control(null, [Validators.required]),
      telephone : this.fb.control(null, [Validators.required]),
      email : this.fb.control(null,[Validators.required, Validators.email])
    });
  }

  handleSaveStudent() {
    let student:etudiants=this.newEtudiantFormGroup.value;
    this.etudiantsSerive.addEtudiant(student).subscribe({
      next : data=>{
        alert("Etudiant enregistré avec succée!");
        this.newEtudiantFormGroup.reset();
        this.router.navigateByUrl("/etudiants");
      },
      error : err => {
        console.log(err);
      }
    });
  }
}
