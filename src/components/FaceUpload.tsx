import { useState, useRef, useEffect } from "react";

type Props = {
  onFaceCaptured?: (id: string) => void;
};

export default function FaceUpload({ onFaceCaptured }: Props) {
  const [loading, setLoading] = useState(false);
  const [faceId, setFaceId] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const meshRef = useRef<any>(null);
  const processingRef = useRef(false);
  const startedRef = useRef(false);

  useEffect(() => {
    const mesh = new (window as any).FaceMesh({
      locateFile: (file: string) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    mesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
    });

    meshRef.current = mesh;

    return () => {
      meshRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    startCameraAndCapture();
  }, []);

  const generateFaceId = (landmarks: any[]) => {
    const simplified = landmarks.map((p) => [
      Number(p.x.toFixed(3)),
      Number(p.y.toFixed(3)),
      Number(p.z.toFixed(3)),
    ]);

    const str = JSON.stringify(simplified);

    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }

    return `FACE-${Math.abs(hash)}`;
  };

  const drawMesh = (landmarks: any[]) => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const video = videoRef.current!;

    const width = video.clientWidth;
    const height = video.clientHeight;

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    (window as any).drawConnectors(
      ctx,
      landmarks,
      (window as any).FACEMESH_TESSELATION,
      { color: "rgba(0,255,0,0.4)", lineWidth: 0.1 }
    );

    (window as any).drawLandmarks(ctx, landmarks, {
      color: "rgba(255,0,0,0.4)",
      radius: 0.3,
    });
  };

  const processImage = async (img: HTMLImageElement) => {
    const mesh = meshRef.current;
    if (!mesh || processingRef.current) return null;

    processingRef.current = true;

    return new Promise<any>((resolve) => {
      mesh.onResults((results: any) => {
        processingRef.current = false;

        if (results.multiFaceLandmarks?.length > 0) {
          resolve(results.multiFaceLandmarks[0]);
        } else {
          resolve(null);
        }
      });

      try {
        mesh.send({ image: img });
      } catch {
        processingRef.current = false;
        resolve(null);
      }
    });
  };

  const capturePhoto = async () => {
    const video = videoRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const width = video.videoWidth;
    const height = video.videoHeight;

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(video, 0, 0, width, height);

    const img = new Image();
    img.src = canvas.toDataURL("image/png");

    setLoading(true);

    img.onload = async () => {
      const landmarks = await processImage(img);

      if (!landmarks || !Array.isArray(landmarks)) {
        alert("Nenhum rosto detectado");
        setLoading(false);
        return;
      }

      drawMesh(landmarks);

      const id = generateFaceId(landmarks);
      setFaceId(id);
      console.log(faceId)

      // 🔥 ESSENCIAL
      onFaceCaptured?.(id);

      setLoading(false);

      const stream = video.srcObject as MediaStream;
      stream?.getTracks().forEach((track) => track.stop());
    };
  };

  const startCameraAndCapture = async () => {
    try {
      setFaceId(null);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      let time = 3;
      setCountdown(time);

      const interval = setInterval(() => {
        time--;
        setCountdown(time);

        if (time === 0) {
          clearInterval(interval);
          setCountdown(null);
          capturePhoto();
        }
      }, 1000);
    } catch {
      alert("Permita o uso da câmera");
    }
  };

  return (
    <div className="rounded-xl text-white font-bold text-center">
      <h2 className="text-sm mb-4">Reconhecimento facial</h2>

      <div className="relative rounded-xl overflow-hidden">
        <video ref={videoRef} className="max-w-64 w-full rounded-xl mx-auto" />

        <canvas
          ref={canvasRef}
          className="max-w-64 w-full absolute top-0 left-[50%] translate-x-[-50%]"
        />
      </div>

      {countdown !== null && countdown > 0 && (
        <div className="text-4xl mt-4 font-bold">{countdown}</div>
      )}

      {loading && <p className="text-sm mt-2">Processando...</p>}
    </div>
  );
}