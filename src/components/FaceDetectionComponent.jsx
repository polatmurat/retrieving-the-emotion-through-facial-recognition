import "./FaceDetectionComponent.css";
import { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setDominantEmotion } from "../features/changeMoodSlice";
import * as faceapi from "face-api.js";
import { useNavigate } from "react-router-dom";

const FaceDetectionComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [lastDetectedEmotion, setLastDetectedEmotion] = useState(null);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
      webcamRef.current.srcObject = stream;
      setVideoLoaded(true);
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  useEffect(() => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]).then(startVideo);

    return stopVideo;
  }, []);

  const stopVideo = () => {
    const video = webcamRef.current;
    if (video && video.srcObject) {
      const stream = video.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  const detectFace = async () => {
    if (!videoLoaded) return;
    const video = webcamRef.current;
    if (!video) return;
    const displaySize = { width: video.width, height: video.height };

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) {
      console.error("Cannot get 2D context from canvas.");
      return;
    }

    faceapi.matchDimensions(canvas, displaySize);

    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptors()
      .withFaceExpressions();

    context.clearRect(0, 0, video.width, video.height);

    if (detections.length > 0) {
      const expressions = detections[0].expressions;
      const maxExpression = Object.keys(expressions).reduce((a, b) =>
        expressions[a] > expressions[b] ? a : b
      );

      // storing the last detected emotion in the state
      setLastDetectedEmotion(maxExpression);

      const text = `Emotion: ${maxExpression}`;
      context.font = "24px Arial";
      context.fillStyle = "#FF0000";
      context.fillText(text, 10, 50);

      const box = detections[0].detection.box;
      context.strokeStyle = "#00FF00";
      context.lineWidth = 2;
      context.strokeRect(box.x, box.y, box.width, box.height);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(detectFace, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [videoLoaded]);

  const onSubmit = () => {
    if (lastDetectedEmotion) {
      dispatch(setDominantEmotion(lastDetectedEmotion));
      stopVideo();
      navigate("/mood");
    }
  };

  return (
    <>
      <div className="full-container">
        <video
          ref={webcamRef}
          autoPlay
          onLoadedMetadata={() => setVideoLoaded(true)}
          style={{ display: "block", margin: "auto" }}
          width="720"
          height="480"
        />
        <canvas ref={canvasRef} width="720" height="480" />
        <button onClick={onSubmit}>Send Dominant Emotion to Redux</button>
      </div>
    </>
  );
};

export default FaceDetectionComponent;
