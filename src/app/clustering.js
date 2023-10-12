import clusteringAlgo from 'density-clustering';

const kmeans = new clusteringAlgo.KMEANS();
const dbscan = new clusteringAlgo.DBSCAN();
const clustering = (videoStartingTime) => {
  let allColors = [];

// Process frames at 1 frame per second
  let video = document.querySelector('video');
  video.muted = true;

  function processFrame() {
    let frameData = captureFrame(video, video.videoWidth, video.videoHeight);
    console.log(frameData);
    let colors = extractColors(frameData, video.videoWidth, video.videoHeight, 10);
    console.log(colors);
    allColors.push(...colors);
  }

  function captureFrame(videoElement, width, height) {
    let canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    let ctx = canvas.getContext('2d');
    ctx.drawImage(videoElement, 0, 0, width, height);
    return ctx.getImageData(0, 0, width, height).data;
  }

  function extractColors(frameData, width, height, sampleRate) {
    let colors = [];
    for (let y = 0; y < height; y += sampleRate) {
      for (let x = 0; x < width; x += sampleRate) {
        let index = (y * width + x) * 4;
        let color = [
          frameData[index],
          frameData[index + 1],
          frameData[index + 2]
        ];
        colors.push(color);
      }
    }
    return colors;
  }


  const DURATION = videoStartingTime + 30;  // Duration in seconds
  const INTERVAL = 1;  // Capture frame every 1 second. Change as per requirement

  video.addEventListener('timeupdate', function () {
    if (video.currentTime <= DURATION) {
      console.log(video.currentTime, video.currentTime % INTERVAL);
      if (video.currentTime % INTERVAL < 0.1) {  // To account for slight deviations
        processFrame();
        const loader = document.getElementById('loader');
        loader.style.display='block'
      }
    } else {
      video.pause();  // Pause the video after 30 seconds
    }
  });

  video.addEventListener('pause', function () {
    if (video.currentTime > DURATION) {
      console.log('Video ended', allColors);
      let dominantColors = getDominantColors(allColors);
      paintColors(dominantColors);
      console.log(dominantColors);
    }
  });

  function paintColors(colors) {
    const canvas = document.getElementById('colorCanvas');
    const ctx = canvas.getContext('2d');
    // Set the width of each color block
    const blockWidth = canvas.width / colors.length;

    // Loop through the colors and draw them on the canvas
    colors.forEach((color, index) => {
      ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
      ctx.fillRect(index * blockWidth, 0, blockWidth, canvas.height);
    });
    const loader = document.getElementById('loader');
    loader.style.display='none'
  }

  function getDominantColors(colors, clusterCount = 10) {
    // Convert your colors into an array of arrays
    // Cluster the colors using KMEANS
    let clusters = kmeans.run(colors, clusterCount);

    // Find the centroid (average color) in each cluster to represent the dominant color
    let dominantColors = clusters.map(cluster => {
      let sumR = 0, sumG = 0, sumB = 0;
      for(let idx of cluster) {
        sumR += colors[idx][0];
        sumG += colors[idx][1];
        sumB += colors[idx][2];
      }
      let clusterSize = cluster.length;
      return [
        Math.round(sumR / clusterSize),
        Math.round(sumG / clusterSize),
        Math.round(sumB / clusterSize)
      ];
    });

    return dominantColors;
  }


  video.play().then();  // Start the video
}

export default clustering;
