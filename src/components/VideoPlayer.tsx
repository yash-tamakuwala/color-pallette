'use client'
import React, {useState, useRef, useEffect, useCallback} from 'react';
import clustering from "src/app/clustering";
import {secondsToHMS} from "src/utils/timeConversion";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const inputRef = useRef(null);
  const sourceRef = useRef<HTMLSourceElement>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(30);
  const [selectedTimeDuration, setSelectedTimeDuration] = useState<string>('0');

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      const videoURL = URL.createObjectURL(file);
      setSelectedVideo(videoURL);
    } else {
      alert('Please select a valid video file (e.g., MP4).');
    }
  };

  const videoInputHandler = () => {
    // @ts-ignore
    inputRef?.current?.click();
  }

  const handleGenerateColors = () => {
    let video = document.querySelector('video');
    if(video){
      clustering(video.currentTime, duration);
    }
  }

  const handleReset = () => {
    setSelectedVideo(null);
    setDuration(30)
  }

  useEffect(() => {
    if(duration) {
      const time = secondsToHMS(duration)
      setSelectedTimeDuration(`${time.minutes}:${time.seconds <=9 ? '0'+time.seconds : time.seconds}`);
    }
  }, [duration])

  return (
    <div className={'flex flex-col gap-8 items-center justify-center'}>
      <input
        ref={inputRef}
        style={{display: "none"}}
        type="file"
        accept="video/*"
        onChange={handleFileChange}
      />
      {
        !selectedVideo && <button
              className={"w-fit flex px-5 py-3 justify-center items-center rounded-full bg-[#333333] text-[#FCFCFC]"}
              onClick={videoInputHandler}
          >
          {'Select Video'}
          </button>
      }

      {selectedVideo && (
        <video
          ref={videoRef}
          width="400"
          controls
        >
          <source id={'videoSrc'} ref={sourceRef} src={selectedVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {selectedVideo && (
        <div className={'w-full'}>
          <label htmlFor="medium-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select duration of video, which you want to capture
          </label>
          <span>Duration: {selectedTimeDuration}</span>
          <input
            id="medium-range"
            type="range"
            // @ts-ignore
            max={videoRef?.current?.duration}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full h-2 mb-6 bg-gray-300 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>
      )}

      {selectedVideo && (<div className={'w-full flex gap-5 flex-col justify-center items-center'}>
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
          <button
            className={"w-auto min-w-[280px] flex py-3 px-5 justify-center items-center rounded-full bg-gray-300 text-[#333333]"}
            onClick={() => handleReset()}
          >
            <div className={'flex gap-4 items-center justify-center'}>
                <span>
                  Reset
                </span>
            </div>
          </button>
        </div>)
      }

      {selectedVideo && <canvas id="colorCanvas" width="400" height="100"></canvas>}
    </div>
  );
};

export default VideoPlayer;
