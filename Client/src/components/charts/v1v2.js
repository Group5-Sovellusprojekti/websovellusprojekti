import '../../css/App.css'
import React, { useState, useEffect, useContext } from 'react';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import { DatasetsContext } from '../../App.js';


Chart.register(...registerables);

function V1V2(props) {

  const datasets = useContext(DatasetsContext);

  const [v1Data, setV1Data] = useState([]);
  const [v2Data, setV2Data] = useState([]);
  const [visible, setVisible] = useState(false);
  const [v2Toggle, setV2Toggle] = useState(true);

  useEffect(() => {
    if (datasets.length !== 0) {

      for (let i = 0; i < datasets.v1data[0].globalAnnual.length; i++) {
        datasets.v1data[0].globalAnnual[i].time = datasets.v1data[0].globalAnnual[i].time.toString();
        datasets.v1data[0].globalAnnual[i].anomaly = datasets.v1data[0].globalAnnual[i].anomaly.toString();

        datasets.v1data[0].globalMonthly[i].time = datasets.v1data[0].globalMonthly[i].time.toString();
        datasets.v1data[0].globalMonthly[i].anomaly = datasets.v1data[0].globalMonthly[i].anomaly.toString();

        datasets.v1data[0].northernAnnual[i].time = datasets.v1data[0].northernAnnual[i].time.toString();
        datasets.v1data[0].northernAnnual[i].anomaly = datasets.v1data[0].northernAnnual[i].anomaly.toString();

        datasets.v1data[0].northernMonthly[i].time = datasets.v1data[0].northernMonthly[i].time.toString();
        datasets.v1data[0].northernMonthly[i].anomaly = datasets.v1data[0].northernMonthly[i].anomaly.toString();

        datasets.v1data[0].southernAnnual[i].time = datasets.v1data[0].southernAnnual[i].time.toString();
        datasets.v1data[0].southernAnnual[i].anomaly = datasets.v1data[0].southernAnnual[i].anomaly.toString();

        datasets.v1data[0].southernMonthly[i].time = datasets.v1data[0].southernMonthly[i].time.toString();
        datasets.v1data[0].southernMonthly[i].anomaly = datasets.v1data[0].southernMonthly[i].anomaly.toString();
      }

      //because years below 1000 are not supported by chart.js
      //zeros must be added to the beginning of the year
      for (let i = 0; i < datasets.v2data.length; i++) {
        datasets.v2data[i].year = datasets.v2data[i].year.toString();
        datasets.v2data[i].t = datasets.v2data[i].t.toString();

        if (datasets.v2data[i].year.length < 2) {
          datasets.v2data[i].year = "000" + datasets.v2data[i].year;
        }

        if (datasets.v2data[i].year.length < 3) {
          datasets.v2data[i].year = "00" + datasets.v2data[i].year;
        }
        if (datasets.v2data[i].year.length < 4) {
          datasets.v2data[i].year = "0" + datasets.v2data[i].year;
        }
      }

      setV1Data(datasets.v1data[0]);
      setV2Data(datasets.v2data);
    }
  }, [datasets]);


  const options = {

    interaction: {
      mode: 'nearest',
      intersect: false,
    },

    elements: {
      point: {
        radius: 0
      }
    },
    //Only reacts to mousemove events
    events: ['mousemove'],

    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'year'
        },
      }
    },

    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },

    }
  };

  const data = {
    datasets: [
      {
        label: "Maailmalaajuinen vuosittainen",
        data: v1Data.globalAnnual,
        borderColor: 'black',
        borderWidth: 2,
        parsing: {
          xAxisKey: 'time',
          yAxisKey: 'anomaly'
        },
        hidden: visible
      },
      {
        label: "Pohjoisen pallonpuoliskon vuosittainen",
        data: v1Data.northernAnnual,
        borderColor: 'blue',
        borderWidth: 2,
        parsing: {
          xAxisKey: 'time',
          yAxisKey: 'anomaly'
        },
        hidden: visible
      },
      {
        label: "Eteläisen pallonpuolisko vuosittainen",
        data: v1Data.southernAnnual,
        borderColor: 'red',
        borderWidth: 2,
        parsing: {
          xAxisKey: 'time',
          yAxisKey: 'anomaly'
        },
        hidden: visible
      },
      {
        label: "Maailmalaajuinen kuuittainen",
        data: v1Data.globalMonthly,
        borderColor: 'black',
        borderWidth: 2,
        parsing: {
          xAxisKey: 'time',
          yAxisKey: 'anomaly'
        },
        hidden: !visible
      },
      {
        label: "Pohjoisen pallonpuoliskon kuukausittainen",
        data: v1Data.northernMonthly,
        borderColor: 'blue',
        borderWidth: 2,
        parsing: {
          xAxisKey: 'time',
          yAxisKey: 'anomaly'
        },
        hidden: !visible
      },
      {
        label: "Eteläisen pallonpuolisko vuosittainen",
        data: v1Data.southernMonthly,
        borderColor: 'red',
        borderWidth: 2,
        parsing: {
          xAxisKey: 'time',
          yAxisKey: 'anomaly'
        },
        hidden: !visible
      },
      {
        label: "2000 vuoden lämpötilat",
        data: v2Data,
        borderColor: 'green',
        borderWidth: 2,
        parsing: {
          xAxisKey: 'year',
          yAxisKey: 't'
        },
        hidden: v2Toggle
      },

    ]
  }
  return (
    <>
        <Card>
          <Card.Body className='text-center'>
            <Card.Title>Maailmanlaajuinen pintalämpötilojen poikkeavuus tammikuusta 1850 lähtien <br />&<br />Pohjoisen pallonpuoliskon 2000 vuoden lämpötilakonstruktio</Card.Title>
            <div className="d-grid gap-2">
              <Button onClick={() => setVisible(!visible)}>Vaihda näkymä</Button>
              <Button onClick={() => setV2Toggle(!v2Toggle)}>2000 vuoden lämpötilat</Button>
            </div>
            {props.description
              ? <p>{props.description}</p>
              : null
            }
            <Line
              className='chart'
              options={options}
              data={data}
            />
            <Card.Link href="https://www.metoffice.gov.uk/hadobs/hadcrut5/"> Maailmanlaajuinen pintalämpötilojen poikkeavuus data ja kuvaus </Card.Link>
            <Card.Link href="https://www.nature.com/articles/nature03265">Pohjoisen pallonpuoliskon 2000 vuoden lämpötilakonstruktio tutkimus</Card.Link>
          </Card.Body>
        </Card>
    </>
  )
}

export default V1V2;
