import { useEffect, useRef, useState } from "react";

type RecorderProps = {
  countdown: number;
  setCountdown: React.Dispatch<React.SetStateAction<number>>;
  recordTime: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  prepTime: number;
  timeLeft: number;
  phase: string;
  setPhase: React.Dispatch<React.SetStateAction<"prep" | "recording" | "done">>;
};

const PTEAudioRecorder: React.FC<RecorderProps> = ({
  countdown,
  setCountdown,
  recordTime,
  setTimeLeft,
  prepTime,
  timeLeft,
  phase,
  setPhase,
}) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    console.log("phase", phase);
    console.log("countdown", countdown);
    if (phase === "prep" && countdown > 0) {
      const timer = setTimeout(() => setCountdown((c: number) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (phase === "prep" && countdown === 0) {
      startRecording();
    }
  }, [countdown, phase]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioUrl(URL.createObjectURL(blob));
      };

      recorder.start();
      setPhase("recording");
      setTimeLeft(recordTime);

      // setup analyser for waveform
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      analyserRef.current.fftSize = 1024;

      const bufferLength = analyserRef.current.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);

      drawWaveform();

      timerRef.current = setInterval(() => {
        setTimeLeft((t: number) => {
          if (t <= 1) {
            stopRecording();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } catch (err) {
      console.error("Mic access denied:", err);
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop());
    }
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase("done");
  };

  const drawWaveform = () => {
    if (!canvasRef.current || !analyserRef.current || !dataArrayRef.current)
      return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    const draw = () => {
      if (phase !== "recording") return; // stop drawing when done
      requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);

      ctx.fillStyle = "rgb(240, 240, 240)";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgb(0, 150, 255)";
      ctx.beginPath();

      let sliceWidth = WIDTH / dataArray.length;
      let x = 0;

      for (let i = 0; i < dataArray.length; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * HEIGHT) / 2;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);

        x += sliceWidth;
      }
      ctx.lineTo(WIDTH, HEIGHT / 2);
      ctx.stroke();
    };
    draw();
  };
  const percent = Math.max(
    0,
    phase === "prep"
      ? Math.min(100, ((prepTime - countdown) / prepTime) * 100)
      : phase === "recording"
      ? Math.min(100, ((recordTime - timeLeft) / recordTime) * 100)
      : 0
  );
  const isWarn = countdown <= 10;

  return (
    <div className="p-4 max-w-md mx-auto text-center border rounded-xl shadow">
      {phase === "recording" && (
        <div>
          <p className="text-red-600 font-bold mb-2">● Recording...</p>

          <canvas
            ref={canvasRef}
            width={500}
            height={100}
            className="border rounded mb-2"
          />

          <button
            className="mt-3 px-4 py-2 bg-red-500 text-white rounded"
            onClick={stopRecording}
          >
            Stop
          </button>
        </div>
      )}

      {phase === "done" && audioUrl && (
        <div>
          <p className="mb-2 font-medium">Recording finished</p>
          <audio controls src={audioUrl}></audio>
        </div>
      )}
    </div>
  );
};

export default PTEAudioRecorder;
