import React from 'react'
import Wavesurfer from "wavesurfer.js";
import { useState } from 'react'

import { useRef } from 'react'
import * as WaveformRegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions";
import * as WaveformCursorPlugin from "wavesurfer.js/dist/plugin/wavesurfer.cursor";
import * as WaveformTimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline";
import {GrPlayFill} from "react-icons/gr";
import {GiPauseButton} from "react-icons/gi"

import data from "./data/data.json"
import "./App.css"
import { icons } from 'react-icons';
const WaveForm = () => {
    const [waveformLoaded,setWaveformLoaded]=useState(false)

    const waveform=useRef(null)
    const audioData=useRef(null)
    var filData=data.map(data => {
        var obj={
          start:data.start_time,
          end:data.end_time,
          color:'hsla(400, 100%, 30%, 0.5)',
          attributes: {
            label: data["hi-IN"]
          }
        }
        return obj
      })


    const createWaveForm = (e) => {
     

setWaveformLoaded(false);
var file=e.target.files[0];
if(file){
    var reader = new FileReader();
    reader.onload = async (event) =>{
    audioData.current=event.target.result;
    let blob=new window.Blob([new Uint8Array(event.target.result)],{
        type:"audio/mp3"
    })
    waveform.current.loadBlob(blob);

    };
    reader.readAsArrayBuffer(file)
    waveform.current = Wavesurfer.create({
        container: "#waveform",
        barWidth: 3,
        barRadius: 2,
        barHeight:3,
        hideScrollbar: true,
        cursorWidth: 0,
        progressColor: "#4159FB",
        waveColor: "rgba(65, 89, 251, 0.4)",
        responsive: true,
               cursorColor: "#567FFF",
        plugins: [
            WaveformCursorPlugin.create({
                showTime: true,
                opacity: 1,
                customShowTimeStyle: {
                    'background-color': '#000',
                
                    color: '#fff',
                    padding: '2px',
                    'font-size': '10px'
                }
            }),WaveformTimelinePlugin.create({
                container: "#wave-timeline",
                primaryLabelInterval:1,
            }), WaveformRegionsPlugin.create({
                regionsMinLength: 2,
                regions:filData
            })
              
         
           
        ]
      });
      waveform.current.on("ready",() => {
          setWaveformLoaded(true)
      });
    

}
    }

 
    function handleClick(){
        if (waveform.current.isPlaying()) {
            waveform.current.pause();
          } else {
            waveform.current.play();
          }
    }
  

  return (
    <div className='container'>
    <div className='heading'
  >
    <h2>Hi there!</h2>
    <h3>Convert audio/video file to a waveform!</h3>
    </div>
    <input type='file'  onChange={createWaveForm} className="file-input">

    </input>
    <div id='wave-timeline'>
    </div>
    <div id='waveform'>
  
    </div>
 
    
   
    
    
    <div className='btn'style={{visibility: `${waveformLoaded ? "visible" :"hidden"}`}} >
  
 <GrPlayFill onClick={handleClick} size={20}  />
 <GiPauseButton onClick={handleClick} size={20} />
</div>
    
    </div>
  )
}

export default WaveForm