import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  option:EChartsOption = {
    title: {
      text: 'TAUX D\'ADMISSIBILITE',
      subtext: '',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      left: 'center',
      top: 'bottom',
      data: [
        'Entreprise1',
        'Entreprise2',
        'Entreprise3',
        'Entreprise4',
        'Entreprise5',
        'Entreprise6',
        'Entreprise7',
        'Entreprise8'
      ]
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: 'Radius Mode',
        type: 'pie',
        radius: [20, 140],
        center: ['25%', '50%'],
        roseType: 'radius',
        itemStyle: {
          borderRadius: 5
        },
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: true
          }
        },
        data: [
          { value: 40, name: 'Adria ' },
          { value: 33, name: 'Inwi' },
          { value: 28, name: 'Capgemini' },
          { value: 22, name: 'SAP' },
          { value: 20, name: 'Nimbleways' },
          { value: 15, name: 'Entreprise 6' },
          { value: 12, name: 'Entreprise 7' },
          { value: 10, name: 'Entreprise 8' }
        ]
      },
      {
        name: 'Area Mode',
        type: 'pie',
        radius: [20, 140],
        center: ['75%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 5
        },
        data: [
          { value: 30, name: 'Adria' },
          { value: 28, name: 'Inwi' },
          { value: 26, name: 'Capgemini' },
          { value: 24, name: 'SAP' },
          { value: 22, name: 'Nimbleways' },
          { value: 20, name: 'Entreprise 6' },
          { value: 18, name: 'Entreprise 7' },
          { value: 16, name: 'Entreprise 8' }
        ]
      }
    ]
  };
  option1:EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['React', 'Angular', 'View', 'PHP', 'NET', 'PYTHON', 'JAVA']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  };



  ngOnInit(): void {

  }


}
