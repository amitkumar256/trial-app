import { useEffect, useRef } from "react";

const canva = () => {
  const canvasRef = useRef(null);
  //getting mouse posititon respect to window.
  function setCanvasRef(ref) {
    if (!ref) {
      return;
    }
    canvasRef.current = ref;
    initMouseMoveListener();
  }
  function initMouseMoveListener() {
    const mouseMoveListener = (e) => {
      const point = computePointInCanvas(e.clientX, e.clientY);
      console.log(point);
      //console.log({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", mouseMoveListener);
  }

  function computePointInCanvas(clientX, clientY) {
    if (canvasRef.current) {
      const boundingRect = canvasRef.current.getBoundingClientRect();
      return {
        X: clientX - boundingRect.left,
        Y: clientY - boundingRect.top,
      };
    } else {
      return null;
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }
    context.fillStyle = "red";
    context.fillRect(0, 0, 100, 100);
    context.strokeRect(100, 100, 50, 50);
  }, []);
  return (
    <div className="flex justify-center">
      <canvas className="" ref={setCanvasRef} />
    </div>
  );
};

export default canva;
