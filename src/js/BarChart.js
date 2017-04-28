import { Bar } from 'vue-chartjs'

export default Bar.extend({
  props: {
    chartData: {
      type: Array | Object,
      required: false
    },
    chartLabels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [ {
            gridLines: {
              display: false
            }
          }]
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted () {
    this.renderChart({
      labels: this.chartLabels,
      datasets: [
        {
          label: 'Bat-first wins',
          borderColor: '#249EBF',
          pointBackgroundColor: 'white',
          borderWidth: 2,
          pointBorderColor: '#249EBF',
          backgroundColor: 'green',
          data: this.chartData.batwins
        },
        {
          label: 'Field-first wins',
          borderColor: '#249EBF',
          pointBackgroundColor: 'white',
          borderWidth: 2,
          pointBorderColor: '#249EBF',
          backgroundColor: '#3c8dbc',
          data: this.chartData.fieldwins
        },
        {
          label: 'Ties',
          borderColor: '#249EBF',
          pointBackgroundColor: 'white',
          borderWidth: 2,
          pointBorderColor: '#249EBF',
          backgroundColor: 'red',
          data: this.chartData.ties
        }
      ]
    }, this.options)
  }
})
