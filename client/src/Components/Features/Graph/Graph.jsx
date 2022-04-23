import "./Graph.css";
import { useLayoutEffect, useContext, useState } from "react";
import { getsCoinHistoricGraph } from "../../../Services/Crypto-Data";
import { ReducersContext } from "../../../Contexts/Context";
import { Line } from "react-chartjs-2" ;
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

const Graph = () => {

  const {cryptoStats} = useContext(ReducersContext);
  const [graphData , setGraphData] = useState([]);

  useLayoutEffect(() => {
    cryptoStats.id && getsCoinHistoricGraph(cryptoStats.id , setGraphData)
  } , [cryptoStats])

  return (
    graphData.length ?
    <div className="graph-Container">
      <Line className="graph"
      data={{
        labels : graphData.map(data => {
          let date = new Date(data[0]) ;
          return date.toLocaleDateString(); 
        }) ,
        datasets : [{
          data : graphData.map(data => data[1]) ,
          borderColor: "white" ,
          label:"Price" ,
        }]
      }} 
      options = {{
        scales : {
           y : {
             ticks : {
               color:"white" ,
               callback : function (value) {
                 return `${value}$`
              }
             }
           } ,

           x: {
             ticks : {
               color: "white" ,
             }
           } ,
        } ,
        elements:{
          point:{
            radius:1 ,
          }
        } 
      }}
      />
    </div>
         :
     <Stack sx={{ width: '100%', color: 'grey.100' }} spacing={2}>
        <LinearProgress color="inherit" />
     </Stack>
  )
}

export default Graph ;