// import React, { useRef, useEffect, useState } from "react";
// import { SketchPicker } from "react-color";
// import { fabric } from "fabric";

// function CanvasWithImage() {
//   const canvasRef = useRef(null);
//   const fabricImgRef = useRef(null);
//   const canvasInstanceRef = useRef(null);
//   const [textColor, setTextColor] = useState("#000000");
//   const [fontChoice, setFontChoice] = useState("Arial");
//   const [showPicker, setShowPicker] = useState(false);
//   const [showTextPicker, setShowTextPicker] = useState(false);

//   const [cardColor, setCardColor] = useState("#000000");
//   const handleChangeComplete = (color) => {
//     setCardColor(color.hex);
//   };

//   const colorPickerRef = useRef();
//   const textPickerRef = useRef();

//   const handleParentClick = (event) => {
//     if (
//       showPicker &&
//       (!colorPickerRef.current ||
//         !colorPickerRef.current.contains(event.target))
//     ) {
//       setShowPicker(false);
//     }
//   };
// const handleTextClick = (e) => {
//   if (
//     showTextPicker &&
//     (!textPickerRef.current || !textPickerRef.current.contains(e.target))
//   ) {
//     setShowTextPicker(false);
//   }
// };

//   useEffect(() => {
//     const canvas = new fabric.Canvas(canvasRef.current, {
//       width: 400,
//       height: 300,
//     });

//     canvasInstanceRef.current = canvas;

//     return () => {
//       canvas.dispose();
//     };
//   }, []);

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();

//     reader.onload = () => {
//       const imgData = reader.result;

//       fabric.Image.fromURL(imgData, (img) => {
//         const canvas = canvasInstanceRef.current;

//         if (fabricImgRef.current) {
//           canvas.remove(fabricImgRef.current);
//         }

//         const maxWidth = canvas.getWidth();
//         const maxHeight = canvas.getHeight();

//         const aspectRatio = img.width / img.height;
//         let width = maxWidth / 4;
//         let height = maxWidth / 4;

//         if (height > maxHeight) {
//           height = maxHeight;
//           width = maxHeight * aspectRatio;
//         }

//         const fabricImg = img.set({
//           left: 0,
//           top: 0,
//           scaleX: width / img.width,
//           scaleY: height / img.height,
//         });

//         fabricImgRef.current = fabricImg;

//         canvas.add(fabricImg);
//         canvas.renderAll();
//       });
//     };

//     reader.readAsDataURL(file);
//   };

//   const addText = () => {
//     const canvas = canvasInstanceRef.current;
//     const text = new fabric.Textbox("Your Text", {
//       left: canvas.getWidth() / 3,
//       top: canvas.getHeight() / 3,
//       fontSize: 12,
//       fill: textColor, // Set text color
//       fontFamily: fontChoice, // Set font family
//       borderColor: textColor, // Set border color
//       cornerColor: textColor, // Set corner color
//       cornerSize: 6,
//       transparentCorners: false,
//     });

//     canvas.add(text);
//     canvas.setActiveObject(text);
//     canvas.renderAll();
//   };
// const handleTextColorChange = (color) => {
//   setTextColor(color.hex);
//     const canvas = canvasInstanceRef.current;
//     const activeObject = canvas.getActiveObject();

//     if (activeObject && activeObject.type === "textbox") {
//       activeObject.set("fill", color.hex);
//       activeObject.set("borderColor", color.hex);
//       activeObject.set("cornerColor", color.hex);

//       canvas.renderAll();
//     }
//   };

//   const handleFontChoiceChange = (event) => {
//     const newFontChoice = event.target.value;
//     setFontChoice(newFontChoice);
//     const canvas = canvasInstanceRef.current;
//     const activeObject = canvas.getActiveObject();

//     if (activeObject && activeObject.type === "textbox") {
//       activeObject.set("fontFamily", newFontChoice);
//       canvas.renderAll();
//     }
//   };

//   const deleteImage = () => {
//     const canvas = canvasInstanceRef.current;
//     const fabricImg = fabricImgRef.current;

//     if (fabricImg) {
//       canvas.remove(fabricImg);
//       fabricImgRef.current = null;
//       const fileInput = document.querySelector('input[type="file"]');
//       if (fileInput) {
//         fileInput.value = "";
//       }
//       canvas.renderAll();
//     }
//   };
//   const deleteText = () => {
//     const canvas = canvasInstanceRef.current;
//     const activeObject = canvas.getActiveObject();

//     if (activeObject && activeObject.type === "textbox") {
//       canvas.remove(activeObject);
//       canvas.discardActiveObject();
//       canvas.renderAll();
//     }
//   };
//   useEffect(() => {
//     // ... existing code ...

//     const handleKeyDown = (event) => {
//       if (event.key === "Delete") {
//         deleteActiveObject();
//       }
//     };

//     document.addEventListener("keydown", handleKeyDown);

//     return () => {
//       // ... existing code ...
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);
//   const deleteActiveObject = () => {
//     const canvas = canvasInstanceRef.current;
//     const activeObject = canvas.getActiveObject();

//     if (activeObject) {
//       if (activeObject === fabricImgRef.current) {
//         deleteImage();
//       } else {
//         canvas.remove(activeObject);
//         canvas.discardActiveObject();
//         canvas.renderAll();
//       }
//     }
//   };

//   return (
//     <div
// onClick={(event) => {
//   handleParentClick(event);
//   handleTextClick(event);
// }}
//       className="  flex md:flex-row flex-col justify-center items-center h-screen gap-10 "
//     >
//       <div
//         className="rounded-xl"
//         style={{
//           backgroundColor: cardColor,
//           width: "400px",
//           height: "300px",
//           overflow: "hidden", // Hide overflow from the container
//         }}
//       >
//         <canvas ref={canvasRef} height={300} width={400} />
//       </div>
//       <div className="px-5 py-4 ">
//         <button className="bg-red-500 text-white mx-4" onClick={deleteImage}>
//           Delete Image
//         </button>
//         <button className="bg-red-500 text-white" onClick={deleteText}>
//           Delete Text
//         </button>
//         <input className="" type="file" onChange={handleImageUpload} />
//         <div className="flex gap-4">
//           <button onClick={() => setShowPicker(!showPicker)}>
//             Color Picker
//           </button>
//           <button onClick={addText}>Add Text</button>
//           {showPicker && (
//             <div className="absolute bottom-0 right-0" ref={colorPickerRef}>
//               <SketchPicker
//                 color={cardColor}
//                 onChangeComplete={handleChangeComplete}
//               />
//             </div>
//           )}
//           <div className="flex ">
//             <div>
//               <label
//                 onClick={() => setShowTextPicker(!showTextPicker)}
//                 htmlFor="text-color"
//               >
//                 Text Color:
//               </label>
//               {showTextPicker && (
//                 <div
//                   className="absolute right-[250px] bottom-0"
//                   ref={textPickerRef}
//                 >
//                   <SketchPicker
//                     id="text-color"
//                     color={textColor}
//                     onChangeComplete={handleTextColorChange}
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//         <div>
//           <label htmlFor="font-choice">Font Choice:</label>
//           <select
//             id="font-choice"
//             value={fontChoice}
//             onChange={handleFontChoiceChange}
//           >
//             <option value="Arial">Arial</option>
//             <option value="Verdana">Verdana</option>
//             <option value="Helvetica">Helvetica</option>
//             <option value="Times New Roman">Times New Roman</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CanvasWithImage;
import React from "react";

const CanvasWithImage = () => {
  return <div>CanvasWithImage</div>;
};

export default CanvasWithImage;
