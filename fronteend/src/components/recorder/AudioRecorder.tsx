import { useReactMediaRecorder } from "react-media-recorder";
import { useEffect, useState, useRef } from "react";

type AudioRecorderProps = {
  ready: boolean;
};

const AudioRecorder = ({ ready }: AudioRecorderProps) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const liveAudioRef = useRef<HTMLAudioElement | null>(null);

  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      audio: true,
      blobPropertyBag: { type: "audio/wav" },
      // @ts-expect-error react-media-recorder typings are wrong
      onStart: (mediaStream: unknown) => {
        setStream(mediaStream as MediaStream);
      },
    });

  // Start/stop recording automatically when `ready` changes
  // useEffect(() => {
  //   if (ready) {
  //     startRecording();
  //   } else {
  //     stopRecording();
  //   }
  // }, [ready, startRecording, stopRecording]);

  useEffect(() => {
    if (liveAudioRef.current && stream) {
      liveAudioRef.current.srcObject = stream;
      liveAudioRef.current.play().catch(() => {}); // autoplay safeguard
    }
  }, [stream]);
  return (
    <div>
      <p>Status: {status}</p>

      <audio ref={liveAudioRef} controls />

      <div>
        <button onClick={startRecording}>Start Recording</button>
        <button onClick={stopRecording}>Stop Recording</button>
      </div>
    </div>
  );
};

export default AudioRecorder;
