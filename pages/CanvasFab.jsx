// import React, { useRef, useEffect } from "react";
// import { fabric } from "fabric";

// function CanvasWithImage() {
//   const canvasRef = useRef(null);
//   let canvas;
//   let fabricImg;

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();

//     reader.onload = () => {
//       const imgData = reader.result;

//       fabric.Image.fromURL(imgData, (img) => {
//         if (fabricImg) {
//           canvas.remove(fabricImg);
//         }

//         const maxWidth = canvas.getWidth();
//         const maxHeight = canvas.getHeight();

//         const aspectRatio = img.width / img.height;
//         let width = maxWidth;
//         let height = maxWidth / aspectRatio;

//         if (height > maxHeight) {
//           height = maxHeight;
//           width = maxHeight * aspectRatio;
//         }

//         fabricImg = img.set({
//           left: 0,
//           top: 0,
//           scaleX: width / img.width,
//           scaleY: height / img.height,
//         });

//         canvas.add(fabricImg);
//         canvas.renderAll();
//       });
//     };

//     reader.readAsDataURL(file);
//   };

//   useEffect(() => {
//     canvas = new fabric.Canvas(canvasRef.current, {
//       width: 800,
//       height: 600,
//     });

//     return () => {
//       canvas.dispose();
//     };
//   }, []);

//   return (
//     <div>
//       <input type="file" onChange={handleImageUpload} />
//       <canvas ref={canvasRef} width={800} height={600} />
//     </div>
//   );
// }

// export default CanvasWithImage;
import React from "react";

const CanvasFab = () => {
  return <div>CanvasFab</div>;
};

export default CanvasFab;
