'use client'
import {useEffect} from "react";
import clustering from "src/app/clustering";

export default function Home() {
  useEffect(() => {
    clustering();
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold">Hello World</h1>
      <video width="400" controls>
        Your browser does not support HTML video.
        <source src="goose.mp4" type="video/mp4" />
      </video>
      <canvas id="colorCanvas" width="400" height="100"></canvas>
    </main>
  )
}
