import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core'
import {AnalyticsService} from '../shared/services/analytics.service'
import {AnalyticsPage} from '../shared/interfaces'
import {Chart} from 'chart.js'
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.css']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('gain') gainRef: ElementRef
  @ViewChild('order') orderRef: ElementRef

  aSub: Subscription
  average: number
  pending = true

  constructor(private service: AnalyticsService) {
  }

  ngAfterViewInit() {
    const gainConfig: any = {
      label: 'Виручка',
      color: 'rgb(255, 99, 132)'
    }

    const orderConfig: any = {
      label: 'Замовлення',
      color: 'rgb(54, 162, 235)'
    }

    this.aSub = this.service.getAnalytics().subscribe((data: AnalyticsPage) => {
      this.average = data.average

      gainConfig.labels = data.chart.map(item => item.label)
      gainConfig.data = data.chart.map(item => item.gain)

      orderConfig.labels = data.chart.map(item => item.label)
      orderConfig.data = data.chart.map(item => item.order)

      // **** Gain ****
      // gainConfig.labels.push('20.11.2020');
      // gainConfig.labels.push('21.11.2020');
      // gainConfig.labels.push('22.11.2020');
      // gainConfig.labels.push('23.11.2020');
      // gainConfig.labels.push('24.11.2020');
      // gainConfig.labels.push('25.11.2020');
      // gainConfig.labels.push('26.11.2020');
      // gainConfig.labels.push('27.11.2020');
      // gainConfig.labels.push('28.11.2020');
      // gainConfig.data.push(150);
      // gainConfig.data.push(450);
      // gainConfig.data.push(550);
      // gainConfig.data.push(660);
      // gainConfig.data.push(800);
      // gainConfig.data.push(1050);
      // gainConfig.data.push(850);
      // gainConfig.data.push(900);
      // gainConfig.data.push(1300);
      // **** /Gain ****

      // **** Order ****
      // orderConfig.labels.push('20.11.2020');
      // orderConfig.labels.push('21.11.2020');
      // orderConfig.labels.push('22.11.2020');
      // orderConfig.labels.push('23.11.2020');
      // orderConfig.labels.push('24.11.2020');
      // orderConfig.labels.push('25.11.2020');
      // orderConfig.labels.push('26.11.2020');
      // orderConfig.labels.push('27.11.2020');
      // orderConfig.labels.push('28.11.2020');
      // orderConfig.data.push(5);
      // orderConfig.data.push(9);
      // orderConfig.data.push(11);
      // orderConfig.data.push(8);
      // orderConfig.data.push(15);
      // orderConfig.data.push(16);
      // orderConfig.data.push(17);
      // orderConfig.data.push(11);
      // orderConfig.data.push(12);
      // **** /Order ****

      const gainCtx = this.gainRef.nativeElement.getContext('2d');
      const orderCtx = this.orderRef.nativeElement.getContext('2d')
      gainCtx.canvas.height = '300px'
      orderCtx.canvas.height = '300px'

      new Chart(gainCtx, createChartConfig(gainConfig))
      new Chart(orderCtx, createChartConfig(orderConfig))

      this.pending = false
    })
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

}


function createChartConfig({labels, data, label, color}) {
  return {
    type: 'line',
    options: {
      responsive: true
    },
    data: {
      labels,
      datasets: [
        {
          label, data,
          borderColor: color,
          steppedLine: false,
          fill: false
        }
      ]
    }
  }
}
