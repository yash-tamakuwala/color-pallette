'use client'
import VideoPlayer from "src/components/VideoPlayer";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-6xl font-bold">Color Palette</h1>
      <div className={'w-full flex justify-center items-center mt-[100px]'}>
        <VideoPlayer />
      </div>
    </main>
  )
}
