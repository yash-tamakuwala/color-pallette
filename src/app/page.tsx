'use client'
import {useEffect, useRef, useState} from "react";
import clustering from "src/app/clustering";

export default function Home() {

  const handleGenerateColors = () => {
    let video = document.querySelector('video');
    if(video){
      clustering(video.currentTime);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold">Color Palette</h1>
      <video width="400" controls>
        Your browser does not support HTML video.
        <source src="goose.mp4" type="video/mp4" />
      </video>

      <button
        className={"w-auto min-w-[280px] flex p-3 justify-center items-center rounded-full bg-[#333333] text-[#FCFCFC]"}
        onClick={handleGenerateColors}
      >
        <div className={'flex gap-4 items-center justify-center'}>
          <div
            id={'loader'}
            style={{display: "none"}}
            className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
              className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >
              Loading...
            </span>
          </div>
          <span>
            Generate color palette
          </span>
        </div>
      </button>

      <canvas id="colorCanvas" width="400" height="100"></canvas>
    </main>
  )
}
