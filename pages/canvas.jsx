import { useRef, useEffect, useState } from "react";

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const [scale, setScale] = useState(1);
  let isDragging = false;
  let initialPosition = { x: 0, y: 0 };
  const imageSize = { width: 200, height: 100 };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw image with scaled size
      if (imageRef.current) {
        const scaledWidth = imageSize.width * scale;
        const scaledHeight = imageSize.height * scale;
        ctx.drawImage(
          imageRef.current,
          initialPosition.x,
          initialPosition.y,
          scaledWidth,
          scaledHeight
        );
      }
    };

    // Load image
    const image = new Image();
    image.src = "/assets/images/Alok Verma.jpg";
    image.onload = () => {
      imageRef.current = image;
      draw();
    };

    const handleMouseDown = (e) => {
      isDragging = true;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      initialPosition = { x, y };
    };

    const handleMouseMove = (e) => {
      if (isDragging) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        initialPosition = { x, y };
        draw();
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    // Attach event listeners
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    // Cleanup event listeners on component unmount
    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, [scale]);

  const increaseSize = () => {
    setScale((prevScale) => prevScale + 0.1);
  };

  const decreaseSize = () => {
    setScale((prevScale) => prevScale - 0.1);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <canvas
        className="bg-yellow-200"
        ref={canvasRef}
        width={500}
        height={500}
      />
      <div>
        <button onClick={increaseSize}>Increase Size</button>
        <button onClick={decreaseSize}>Decrease Size</button>
      </div>
    </div>
  );
};

export default CanvasComponent;
