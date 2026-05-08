import { useState, useRef } from "react";

export default function FaceUpload() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawMesh = (landmarks: any[]) => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const img = imgRef.current!;

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // LINHAS (malha)
    (window as any).drawConnectors(
      ctx,
      landmarks,
      (window as any).FACEMESH_TESSELATION,
      {
        color: "rgba(0,255,0,0.9)",
        lineWidth: 0.5,
        radius: 0.5
      }
    );

    // PONTOS pequenos por cima
    (window as any).drawLandmarks(ctx, landmarks, {
      color: "rgba(255,0,0,0.9)",
      lineWidth: 0.5,
      radius: 0.5
    });
  };

  const drawPoints = (landmarks: any[]) => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const img = imgRef.current!;

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // desenha pontos
    landmarks.forEach((point) => {
      const x = point.x * canvas.width;
      const y = point.y * canvas.height;

      ctx.beginPath();
      ctx.arc(x, y, 2, 0, 2 * Math.PI);
      ctx.fillStyle = "#00FF00";
      ctx.fill();
    });
  };

  const processImage = async (img: HTMLImageElement) => {
    const mesh = new (window as any).FaceMesh({
      locateFile: (file: string) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    mesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
    });

    return new Promise<any>((resolve) => {
      mesh.onResults((results: any) => {
        if (results.multiFaceLandmarks?.length > 0) {
          resolve(results.multiFaceLandmarks[0]);
        } else {
          resolve(null);
        }
      });

      mesh.send({ image: img });
    });
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImage(url);
    setLoading(true);

    const img = new Image();
    img.src = url;

    img.onload = async () => {
      const landmarks = await processImage(img);

      if (!landmarks) {
        alert("Nenhum rosto detectado");
        setLoading(false);
        return;
      }

      console.log("Landmarks:", landmarks);

      drawMesh(landmarks);

      setLoading(false);
    };
  };

  return (
    <div className="bg-dark-green p-6 rounded-xl text-white">
      <h2 className="text-xl mb-4">Upload de rosto</h2>

      <input type="file" accept="image/*" onChange={handleFile} />

      {loading && <p>Processando...</p>}

      {image && (
        <div style={{ position: "relative" }}>
          <img
            src={image}
            ref={imgRef}
            alt="preview"
            className="max-w-128 rounded"
          />

          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </div>
      )}
    </div>
  );
}