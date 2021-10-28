import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonLabel } from '@ionic/react';
import './Home.css';
import {
  Bar,
  Line,
  Doughnut,
} from 'react-chartjs-2';
import moment from 'moment'
import _ from 'lodash'

import pdfConverter from 'jspdf';
import domtoimage, { Options } from 'dom-to-image';

const ScheduleEventShortName: { [key: number]: any } = {
  1: { label: 'Wake', order: 4},
  2: { label: 'Dose 2', order: 2},
  3: { label: 'Dose 1', order: 1},
  4: { label: 'Eat By', order: 0},
  5: { label: 'Dose 3', order: 3},
}

const testData = [
  {
    "date": "2021-09-20 00:00",
    "score": 21,
    "id": 18
  },
  {
    "date": "2021-09-15 00:00",
    "score": 19,
    "id": 17
  },
  {
    "date": "2021-09-10 00:00",
    "id": 16,
    "score": 23
  },
  {
    "date": "2021-09-05 00:00",
    "id": 15,
    "score": 11
  },
  {
    "date": "2021-08-10 00:00",
    "id": 14,
    "score": 5
  },
  {
    "id": 13,
    "score": 23,
    "date": "2021-07-31 00:00"
  },
  {
    "score": 20,
    "date": "2021-07-01 00:00",
    "id": 12
  },
  {
    "id": 11,
    "score": 26,
    "date": "2021-06-23 00:00"
  },
  {
    "id": 10,
    "date": "2021-06-15 00:00",
    "score": 20
  },
  {
    "score": 18,
    "id": 9,
    "date": "2021-06-12 00:00"
  },
  {
    "score": 5,
    "id": 8,
    "date": "2021-04-05 00:00"
  },
  {
    "score": 16,
    "date": "2021-03-19 00:00",
    "id": 7
  },
  {
    "date": "2021-03-06 00:00",
    "id": 6,
    "score": 13
  },
  {
    "date": "2021-03-02 00:00",
    "id": 5,
    "score": 5
  }
]

const reportData = [
  {
    "event_config_id": 25,
    "last_modified": null,
    "created_at": 1632329746,
    "reminder": "0",
    "deleted_at": null,
    "event_type_id": 2,
    "repeat": "",
    "confirmed_at": null,
    "day_of_week": 6,
    "id": 45,
    "not_confirmed": null,
    "sound": "./public/assets/sounds/alarm_1.wav",
    "time_of_event": "2021-09-26 03:00:00"
  },
  {
    "time_of_event": "2021-09-26 07:00:00",
    "confirmed_at": null,
    "not_confirmed": null,
    "deleted_at": null,
    "event_type_id": 1,
    "reminder": "0",
    "event_config_id": 24,
    "sound": "./public/assets/sounds/alarm_1.wav",
    "id": 44,
    "repeat": "",
    "created_at": 1632329746,
    "last_modified": null,
    "day_of_week": 6
  },
  {
    "time_of_event": "2021-09-26 21:00:00",
    "created_at": 1632675581,
    "last_modified": null,
    "day_of_week": 0,
    "confirmed_at": "2021-09-26 19:00:37",
    "event_config_id": 3,
    "not_confirmed": null,
    "reminder": "60",
    "repeat": "",
    "sound": "./public/assets/sounds/alarm_1.wav",
    "deleted_at": null,
    "id": 61,
    "event_type_id": 4
  },
  {
    "sound": "./public/assets/sounds/alarm_1.wav",
    "id": 60,
    "deleted_at": null,
    "time_of_event": "2021-09-26 22:00:15",
    "last_modified": null,
    "not_confirmed": null,
    "confirmed_at": "2021-09-26 19:00:37",
    "created_at": 1632675581,
    "day_of_week": 0,
    "reminder": "15",
    "event_type_id": 3,
    "repeat": "",
    "event_config_id": 2
  },
  {
    "confirmed_at": "2021-09-26 19:00:37",
    "event_type_id": 2,
    "event_config_id": 1,
    "time_of_event": "2021-09-27 03:00:00",
    "last_modified": null,
    "created_at": 1632675581,
    "sound": "./public/assets/sounds/alarm_1.wav",
    "day_of_week": 0,
    "reminder": "0",
    "not_confirmed": null,
    "deleted_at": null,
    "repeat": "",
    "id": 59
  },
  {
    "repeat": "",
    "deleted_at": null,
    "time_of_event": "2021-09-27 06:00:58",
    "not_confirmed": null,
    "confirmed_at": "2021-09-26 19:00:37",
    "reminder": "",
    "sound": "",
    "last_modified": null,
    "event_config_id": 29,
    "event_type_id": 5,
    "created_at": 1632675675,
    "day_of_week": 0,
    "id": 86
  },
  {
    "day_of_week": 0,
    "confirmed_at": null,
    "event_type_id": 1,
    "created_at": 1632675581,
    "last_modified": null,
    "id": 58,
    "repeat": "",
    "event_config_id": 0,
    "reminder": "0",
    "time_of_event": "2021-09-27 07:00:00",
    "deleted_at": null,
    "sound": "./public/assets/sounds/alarm_1.wav",
    "not_confirmed": null
  },
  {
    "event_type_id": 4,
    "deleted_at": null,
    "created_at": 1632675581,
    "id": 65,
    "reminder": "60",
    "not_confirmed": null,
    "confirmed_at": "2021-09-26 19:00:37",
    "last_modified": null,
    "event_config_id": 7,
    "time_of_event": "2021-09-27 21:00:00",
    "sound": "./public/assets/sounds/alarm_1.wav",
    "day_of_week": 1,
    "repeat": ""
  },
  {
    "deleted_at": null,
    "time_of_event": "2021-09-27 23:00:00",
    "last_modified": null,
    "confirmed_at": null,
    "id": 64,
    "day_of_week": 1,
    "created_at": 1632675581,
    "event_type_id": 3,
    "repeat": "",
    "not_confirmed": null,
    "reminder": "15",
    "event_config_id": 6,
    "sound": "./public/assets/sounds/alarm_1.wav"
  },
  {
    "event_config_id": 5,
    "sound": "./public/assets/sounds/alarm_1.wav",
    "not_confirmed": null,
    "reminder": "0",
    "event_type_id": 2,
    "time_of_event": "2021-09-28 03:00:00",
    "confirmed_at": null,
    "repeat": "",
    "deleted_at": null,
    "last_modified": null,
    "created_at": 1632675581,
    "day_of_week": 1,
    "id": 63
  },
  {
    "event_type_id": 1,
    "not_confirmed": null,
    "time_of_event": "2021-09-28 07:00:00",
    "reminder": "0",
    "repeat": "",
    "day_of_week": 1,
    "confirmed_at": "2021-09-26 19:00:37",
    "deleted_at": null,
    "created_at": 1632675581,
    "sound": "./public/assets/sounds/alarm_1.wav",
    "event_config_id": 4,
    "last_modified": null,
    "id": 62
  },
  {
    "repeat": "",
    "id": 69,
    "time_of_event": "2021-09-28 21:00:00",
    "day_of_week": 2,
    "event_type_id": 4,
    "deleted_at": null,
    "event_config_id": 11,
    "sound": "./public/assets/sounds/alarm_1.wav",
    "reminder": "60",
    "not_confirmed": null,
    "created_at": 1632675581,
    "confirmed_at": "2021-09-26 19:00:37",
    "last_modified": null
  },
  {
    "reminder": "15",
    "created_at": 1632675581,
    "time_of_event": "2021-09-28 23:00:00",
    "confirmed_at": null,
    "day_of_week": 2,
    "deleted_at": null,
    "event_type_id": 3,
    "id": 68,
    "last_modified": null,
    "not_confirmed": null,
    "sound": "./public/assets/sounds/alarm_1.wav",
    "repeat": "",
    "event_config_id": 10
  },
  {
    "time_of_event": "2021-09-29 03:00:00",
    "day_of_week": 2,
    "id": 67,
    "deleted_at": null,
    "sound": "./public/assets/sounds/alarm_1.wav",
    "confirmed_at": "2021-09-26 19:00:37",
    "reminder": "0",
    "event_config_id": 9,
    "repeat": "",
    "event_type_id": 2,
    "last_modified": null,
    "not_confirmed": null,
    "created_at": 1632675581
  },
  {
    "event_type_id": 1,
    "created_at": 1632675581,
    "last_modified": null,
    "confirmed_at": null,
    "id": 66,
    "not_confirmed": null,
    "time_of_event": "2021-09-29 07:00:00",
    "repeat": "",
    "event_config_id": 8,
    "sound": "./public/assets/sounds/alarm_1.wav",
    "deleted_at": null,
    "reminder": "0",
    "day_of_week": 2
  },
  {
    "repeat": "",
    "last_modified": null,
    "event_config_id": 15,
    "time_of_event": "2021-09-29 21:00:00",
    "deleted_at": null,
    "id": 73,
    "created_at": 1632675581,
    "sound": "./public/assets/sounds/alarm_1.wav",
    "day_of_week": 3,
    "reminder": "60",
    "confirmed_at": null,
    "event_type_id": 4,
    "not_confirmed": null
  },
  {
    "last_modified": null,
    "event_config_id": 14,
    "id": 72,
    "confirmed_at": null,
    "time_of_event": "2021-09-29 23:00:00",
    "repeat": "",
    "reminder": "15",
    "not_confirmed": null,
    "deleted_at": null,
    "event_type_id": 3,
    "sound": "./public/assets/sounds/alarm_1.wav",
    "day_of_week": 3,
    "created_at": 1632675581
  },
  {
    "event_config_id": 13,
    "event_type_id": 2,
    "deleted_at": null,
    "repeat": "",
    "reminder": "0",
    "time_of_event": "2021-09-30 03:00:00",
    "not_confirmed": null,
    "created_at": 1632675581,
    "last_modified": null,
    "id": 71,
    "confirmed_at": "2021-09-26 19:00:37",
    "day_of_week": 3,
    "sound": "./public/assets/sounds/alarm_1.wav"
  },
  {
    "deleted_at": null,
    "event_type_id": 1,
    "id": 70,
    "not_confirmed": null,
    "created_at": 1632675581,
    "confirmed_at": null,
    "sound": "./public/assets/sounds/alarm_1.wav",
    "last_modified": null,
    "event_config_id": 12,
    "day_of_week": 3,
    "repeat": "",
    "reminder": "0",
    "time_of_event": "2021-09-30 07:00:00"
  },
  {
    "confirmed_at": null,
    "time_of_event": "2021-09-30 21:00:00",
    "id": 77,
    "sound": "./public/assets/sounds/alarm_1.wav",
    "last_modified": null,
    "created_at": 1632675581,
    "event_config_id": 19,
    "event_type_id": 4,
    "reminder": "60",
    "repeat": "",
    "day_of_week": 4,
    "not_confirmed": null,
    "deleted_at": null
  },
  {
    "deleted_at": null,
    "sound": "./public/assets/sounds/alarm_1.wav",
    "day_of_week": 4,
    "event_config_id": 18,
    "repeat": "",
    "created_at": 1632675581,
    "event_type_id": 3,
    "id": 76,
    "reminder": "15",
    "last_modified": null,
    "time_of_event": "2021-09-30 23:00:00",
    "confirmed_at": null,
    "not_confirmed": null
  },
  {
    "last_modified": null,
    "created_at": 1632675581,
    "reminder": "0",
    "repeat": "",
    "day_of_week": 4,
    "time_of_event": "2021-10-01 03:00:00",
    "deleted_at": null,
    "sound": "./public/assets/sounds/alarm_1.wav",
    "event_type_id": 2,
    "id": 75,
    "confirmed_at": null,
    "event_config_id": 17,
    "not_confirmed": null
  },
  {
    "deleted_at": null,
    "reminder": "0",
    "last_modified": null,
    "not_confirmed": null,
    "sound": "./public/assets/sounds/alarm_1.wav",
    "time_of_event": "2021-10-01 07:00:00",
    "day_of_week": 4,
    "event_config_id": 16,
    "id": 74,
    "confirmed_at": null,
    "repeat": "",
    "event_type_id": 1,
    "created_at": 1632675581
  },
  {
    "created_at": 1632675581,
    "repeat": "",
    "not_confirmed": null,
    "event_config_id": 23,
    "id": 81,
    "reminder": "60",
    "day_of_week": 5,
    "time_of_event": "2021-10-01 21:00:00",
    "last_modified": null,
    "sound": "./public/assets/sounds/alarm_1.wav",
    "event_type_id": 4,
    "deleted_at": null,
    "confirmed_at": null
  },
  {
    "last_modified": null,
    "confirmed_at": null,
    "reminder": "15",
    "day_of_week": 5,
    "time_of_event": "2021-10-01 23:00:00",
    "sound": "./public/assets/sounds/alarm_1.wav",
    "deleted_at": null,
    "id": 80,
    "not_confirmed": null,
    "repeat": "",
    "event_config_id": 22,
    "event_type_id": 3,
    "created_at": 1632675581
  },
  {
    "deleted_at": null,
    "created_at": 1632675581,
    "repeat": "",
    "id": 79,
    "sound": "./public/assets/sounds/alarm_1.wav",
    "confirmed_at": null,
    "time_of_event": "2021-10-02 03:00:00",
    "event_config_id": 21,
    "reminder": "0",
    "last_modified": null,
    "not_confirmed": null,
    "event_type_id": 2,
    "day_of_week": 5
  },
  {
    "day_of_week": 5,
    "id": 78,
    "not_confirmed": null,
    "event_config_id": 20,
    "reminder": "0",
    "sound": "./public/assets/sounds/alarm_1.wav",
    "confirmed_at": null,
    "time_of_event": "2021-10-02 07:00:00",
    "last_modified": null,
    "event_type_id": 1,
    "created_at": 1632675581,
    "deleted_at": null,
    "repeat": ""
  },
  {
    "event_config_id": 27,
    "repeat": "",
    "day_of_week": 6,
    "confirmed_at": null,
    "event_type_id": 4,
    "deleted_at": null,
    "created_at": 1632675581,
    "reminder": "60",
    "id": 85,
    "sound": "./public/assets/sounds/alarm_1.wav",
    "last_modified": null,
    "time_of_event": "2021-10-02 18:00:00",
    "not_confirmed": null
  },
  {
    "reminder": "15",
    "not_confirmed": null,
    "repeat": "",
    "day_of_week": 6,
    "time_of_event": "2021-10-02 18:30:00",
    "created_at": 1632675581,
    "id": 84,
    "confirmed_at": null,
    "event_type_id": 3,
    "last_modified": null,
    "event_config_id": 26,
    "sound": "./public/assets/sounds/alarm_1.wav",
    "deleted_at": null
  }
]

const dataLine = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

const optionsLine = {
  scales: {
    y: {
      beginAtZero: true
    }
  }
};
const Home: React.FC = () => {
  const [labels, setLabels] = useState(['S', 'M', 'T', 'W', 'T', 'F', 'S'])
  const [pieLabels, setPieLabels] = useState(['S', 'M', 'T'])
  const [doughnutData, setDoughnutData] = useState([
    {
      label: 'Duration1',
      data: [25, 0, 75],
      backgroundColor: ['#FFF', '#896ABE', '#F6F6F8'],
      borderColor: ['#FFF', '#AE95DA', '#F6F6F8'],
      // hoverBackgroundColor: ['#FFF', '#AE95DA', '#F6F6F8'],
      hoverBorderWidth: [0, 0, 0]
    }
  ])
  const [datasets, setDatasets] = useState([{
    label: 'Duration1',
    backgroundColor: '#AE95DA',
    borderColor: '#AE95DA',
    borderWidth: 1,
    hoverBackgroundColor: '#AE95DA',
    hoverBorderColor: '#AE95DA',
    barPercentage: 0.2,
    borderRadius: 10,
    borderSkipped: 'top',
    data: [10, 10, 10, 10, 10, 10, 10]
  }, {
    label: 'Duration2',
    backgroundColor: '#896ABE',
    borderColor: '#896ABE',
    borderWidth: 1,
    hoverBackgroundColor: '#896ABE',
    hoverBorderColor: '#896ABE',
    barPercentage: 0.2,
    borderRadius: 10,
    borderSkipped: 'top',
    data: [15, 15, 15, 15, 15, 15, 15]
  }, {
    label: 'Duration3',
    backgroundColor: '#6847A1',
    borderColor: '#6847A1',
    borderWidth: 1,
    hoverBackgroundColor: '#6847A1',
    hoverBorderColor: '#6847A1',
    barPercentage: 0.2,
    borderRadius: 10,
    borderSkipped: 'top',
    data: [20, 20, 20, 20, 20, 20, 20]
  }, {
    label: 'Max Occurance',
    backgroundColor: '#F6F6F8',
    borderColor: '#F6F6F8',
    borderWidth: 1,
    hoverBackgroundColor: '#F6F6F8',
    hoverBorderColor: '#F6F6F8',
    barPercentage: 0.2,
    borderRadius: 10,
    borderSkipped: false,
    data: [24, 24, 24, 24, 24, 24, 24]
  }])

  const updateWeeklyData = () => {
    const normalLevelValues = [0, 0, 0, 0, 0, 0, 0]
    const excessiveLevelValues = [0, 0, 0, 0, 0, 0, 0]
    const highLevelValues = [0, 0, 0, 0, 0, 0, 0]
    const maxLevelValues = [24, 24, 24, 24, 24, 24, 24]
    const labels = ['', '', '', '', '', '', '']
    const updatedData = testData.map(item => {
      return {
        ...item,
        month: moment(item.date).format('YYYY-MM')
      }
    })
    const groupedData = _.groupBy(updatedData, (item: any) => item.month)

    const maxCount = 7;
    for (let i = 6; i >= 0; i--) {
      const month = moment().subtract(i, 'month').format('YYYY-MM')
      labels[maxCount - i - 1] = moment(month).format('MMM')
      if (!groupedData[month]) {
        normalLevelValues[maxCount - i - 1] = 0
        excessiveLevelValues[maxCount - i - 1] = 0
        highLevelValues[maxCount - i - 1] = 0

        continue
      }

      let sumOfMonth = 0

      for (const item of groupedData[month]) {
        sumOfMonth += item.score
      }

      const averageMonth = Number((sumOfMonth / groupedData[month].length).toFixed(0))

      if (averageMonth <= 10) {
        normalLevelValues[maxCount - i - 1] = averageMonth
        excessiveLevelValues[maxCount - i - 1] = 0
        highLevelValues[maxCount - i - 1] = 0
      } else if (averageMonth <= 16) {
        normalLevelValues[maxCount - i - 1] = 10
        excessiveLevelValues[maxCount - i - 1] = averageMonth
        highLevelValues[maxCount - i - 1] = 0
      } else {
        normalLevelValues[maxCount - i - 1] = 10
        excessiveLevelValues[maxCount - i - 1] = 16
        highLevelValues[maxCount - i - 1] = averageMonth
      }
    }

    setDatasets([{
      label: 'Duration1',
      backgroundColor: '#AE95DA',
      borderColor: '#AE95DA',
      borderWidth: 1,
      hoverBackgroundColor: '#AE95DA',
      hoverBorderColor: '#AE95DA',
      barPercentage: 0.2,
      borderRadius: 10,
      borderSkipped: 'top',
      data: normalLevelValues
    }, {
      label: 'Duration2',
      backgroundColor: '#896ABE',
      borderColor: '#896ABE',
      borderWidth: 1,
      hoverBackgroundColor: '#896ABE',
      hoverBorderColor: '#896ABE',
      barPercentage: 0.2,
      borderRadius: 10,
      borderSkipped: 'top',
      data: excessiveLevelValues
    }, {
      label: 'Duration3',
      backgroundColor: '#6847A1',
      borderColor: '#6847A1',
      borderWidth: 1,
      hoverBackgroundColor: '#6847A1',
      hoverBorderColor: '#6847A1',
      barPercentage: 0.2,
      borderRadius: 10,
      borderSkipped: 'top',
      data: highLevelValues
    }, {
      label: 'Max Occurance',
      backgroundColor: '#F6F6F8',
      borderColor: '#F6F6F8',
      borderWidth: 1,
      hoverBackgroundColor: '#F6F6F8',
      hoverBorderColor: '#F6F6F8',
      barPercentage: 0.2,
      borderRadius: 10,
      borderSkipped: false,
      data: maxLevelValues
    }])
    setLabels(labels)
  }

  const parseScheduleData = () => {
    const groupData = _.groupBy(reportData, (item: any) => item.event_type_id)
    let tempHeaderData: any = []

    for (const key in ScheduleEventShortName) {
      if (!groupData[key]) {
        continue
      }

      tempHeaderData.push({
        label: ScheduleEventShortName[key].label,
        eventId: Number(key),
        order: ScheduleEventShortName[key].order
      })

      tempHeaderData = _.orderBy(tempHeaderData, 'order')
    }

    const parsedData: any = []
    for (const report of reportData) {
      const dayOfWeek = moment(report.time_of_event).day()
      if (!parsedData[dayOfWeek]) {
        parsedData[dayOfWeek] = {}
      }

      if (report.confirmed_at) {
        parsedData[dayOfWeek][report.event_type_id] = 1
      }
    }
  }

  const parseTopData = () => {
    const confirmedData = reportData.filter(item => item.confirmed_at)
    const groupData = _.groupBy(confirmedData, (item) => item.event_type_id)

    const dataWithEventLength = []
    for (const key in groupData) {
      dataWithEventLength.push([key, groupData[key].length ])
    }

    dataWithEventLength.sort((a: any, b: any) => {
      return b[1] - a[1]
    })

    console.log(dataWithEventLength)

    const topData = dataWithEventLength.filter((item: any, index: number) => index < 3).map((item: any) => {
      const percent = Number(((item[1] / confirmedData.length) * 100).toFixed(0))
      return {
        name: ScheduleEventShortName[item[0]].label,
        count: item[1],
        percent
      }
    })

    console.log(topData)
  }

  const drawDoughnutChart = () => {
    if (reportData.length === 0) {
      return
    }

    const confirmedData = reportData.filter(item => item.confirmed_at)
    const confirmedPercent = Number((confirmedData.length / reportData.length).toFixed(2))
    const confirmedChartValue = Number((75 * confirmedPercent).toFixed(0))
    const unconfirmedChartValue = 75 - confirmedChartValue
    setDoughnutData([{
      label: 'Duration1',
      data: [25, confirmedChartValue, unconfirmedChartValue],
      backgroundColor: ['#FFF', '#896ABE', '#F6F6F8'],
      borderColor: ['#FFF', '#896ABE', '#F6F6F8'],
      // hoverBackgroundColor: ['#FFF', '#AE95DA', '#F6F6F8'],
      hoverBorderWidth: [0, 0, 0]
    }])
  }

  const exportPDF = async () => {
    const container = document.getElementById("chart-section")
    if (!container) {
      return
    }

    const jsPDF = new pdfConverter('p', 'px', [container.offsetWidth, container.clientHeight]);
    const ratio = container.clientHeight / container.clientWidth;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    const options: Options = {
      bgcolor: 'white',
      height: height + 20,
      width,
      cacheBust: true,
      // filter: (node: Node) => {
      //   let hideElement = false
      //   node.childNodes.forEach(item => {
      //     if (item.parentElement?.className === 'hide-in-report') {
      //       hideElement = true
      //     }
      //   });
      //   return !hideElement
      // }
    };

    domtoimage
      .toPng(container, options)
      .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'my-image-name.png';
        link.href = dataUrl;
        link.click();
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });

    // await domtoimage.toPng(container, options).then(
    //   async (dataUrl: string | HTMLImageElement | HTMLCanvasElement) => {
    //     jsPDF.addImage(dataUrl, 'PNG', 20, 0, width - 40, height - 40);
    //     writePDF(jsPDF)
    //   })
  }

  const writePDF = async (jsPDF: pdfConverter, title: string = 'test') => {
    const fileName = `${title.replace(' ', '_')
      .concat(new Date().toISOString())}.pdf`

    jsPDF.save(`${fileName}.pdf`);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div id="chart-section" className="chart-section">
          <h1>Line Chart Top</h1>
          {/* <Bar data={{
            labels,
            datasets,

          }} /> */}
          <Line data={dataLine} options={optionsLine} />
        </div>

        {/* <div className="chart-section">
          <Doughnut
            data={{
              labels: pieLabels,
              datasets: doughnutData
            }}
            options={{
              responsive: true,
              animation: false,
              plugins: {
                legend: {
                  display: false
                },
                tooltip: {
                  enabled: false
                },
                title: {
                  display: false,
                  text: 'Chart.js Doughnut Chart'
                }
              },
              rotation: 135,
              cutout: 130,
              opacity: 1,
            }}
          />
          <div className="chart-comment">
            <IonLabel className="percent">82%</IonLabel>
            <IonLabel className="comment">
              of your events have been confirmed
            </IonLabel>
          </div>
        </div> */}
        <IonButton color="primary" onClick={updateWeeklyData}>Weekly</IonButton>
        <IonButton color="primary" onClick={parseScheduleData}>Schedule</IonButton>
        <IonButton color="primary" onClick={parseTopData}>Top Data</IonButton>
        <IonButton color="primary" onClick={drawDoughnutChart}>Doughnut</IonButton>
        <IonButton color="primary" onClick={exportPDF}>PDF</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
