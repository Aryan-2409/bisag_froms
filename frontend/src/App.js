import { useEffect, useState } from "react";
import axios from "axios";
import { pdfjs } from "react-pdf";
import PdfComp from "./PdfComp";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function App() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [allImage, setAllImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    getPdf();
  }, []);

  const getPdf = async () => {
    try {
      const result = await axios.get("http://localhost:3000/get-files");
      console.log(result.data.data);
      setAllImage(result.data.data);
    } catch (error) {
      console.error("Error fetching PDFs:", error.message);
    }
  };

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      const result = await axios.post("http://localhost:3000/upload-files", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (result.data.status === "ok") {
        alert("Uploaded Successfully!!!");
        getPdf();
      }
    } catch (error) {
      console.error("Error uploading file:", error.message);
    }
  };

  const deletePdf = async (id) => {
    try {
      const result = await axios.delete(`http://localhost:3000/delete-file/${id}`);
      if (result.data.status === "ok") {
        alert("File deleted successfully");

        // Filter out the deleted file from the state
        setAllImage((prevImages) => prevImages.filter((image) => image._id !== id));

        // Reset the PDF file preview
        setPdfFile(null);
      }
    } catch (error) {
      console.error("Error deleting file:", error.message);
    }
  };

  const showPdf = (pdf) => {
    setPdfFile(`http://localhost:3000/files/${pdf}`);
  };

  return (
    <div className="App">
      <form className="formStyle" onSubmit={submitImage}>
        <h4>Upload Pdf in React</h4>
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          type="file"
          className="form-control"
          accept="application/pdf"
          required
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
      <div className="uploaded">
        <h4>Uploaded PDF:</h4>
        <div className="output-div">
          {allImage == null
            ? ""
            : allImage.map((data) => {
                return (
                  <div className="inner-div" key={data._id}>
                    <h6>Title: {data.title}</h6>
                    <button
                      className="btn btn-primary"
                      onClick={() => showPdf(data.pdf)}
                    >
                      Show Pdf
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deletePdf(data._id)}
                    >
                      Delete Pdf
                    </button>
                  </div>
                );
              })}
        </div>
      </div>
      <PdfComp pdfFile={pdfFile} />
    </div>
  );
}

export default App;
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { pdfjs } from "react-pdf";
// import PdfComp from "./PdfComp";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.js",
//   import.meta.url
// ).toString();

// function App() {
//   const [title, setTitle] = useState("");
//   const [file, setFile] = useState("");
//   const [allImage, setAllImage] = useState(null);
//   const [pdfFile, setPdfFile] = useState(null);

//   useEffect(() => {
//     getPdf();
//   }, []);

//   const getPdf = async () => {
//     try {
//       const result = await axios.get("http://localhost:3000/get-files");
//       console.log(result.data.data);
//       setAllImage(result.data.data);
//     } catch (error) {
//       console.error("Error fetching PDFs:", error.message);
//     }
//   };

//   const submitImage = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("file", file);

//     try {
//       const result = await axios.post("http://localhost:3000/upload-files", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (result.data.status === "ok") {
//         alert("Uploaded Successfully!!!");
//         getPdf();
//       }
//     } catch (error) {
//       console.error("Error uploading file:", error.message);
//     }
//   };

//   const deletePdf = async (id) => {
//     try {
//       const result = await axios.delete(`http://localhost:3000/delete-file/${id}`);
//       if (result.data.status === "ok") {
//         alert("File deleted successfully");
//         getPdf(); // Refresh the list of PDFs after deletion
//       }
//     } catch (error) {
//       console.error("Error deleting file:", error.message);
//     }
//   };

//   const showPdf = (pdf) => {
//     setPdfFile(`http://localhost:3000/files/${pdf}`);
//   };

//   return (
//     <div className="App">
//       <form className="formStyle" onSubmit={submitImage}>
//         <h4>Upload Pdf in React</h4>
//         <br />
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Title"
//           required
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <br />
//         <input
//           type="file"
//           className="form-control"
//           accept="application/pdf"
//           required
//           onChange={(e) => setFile(e.target.files[0])}
//         />
//         <br />
//         <button className="btn btn-primary" type="submit">
//           Submit
//         </button>
//       </form>
//       <div className="uploaded">
//         <h4>Uploaded PDF:</h4>
//         <div className="output-div">
//           {allImage == null
//             ? ""
//             : allImage.map((data) => {
//                 return (
//                   <div className="inner-div" key={data._id}>
//                     <h6>Title: {data.title}</h6>
//                     <button
//                       className="btn btn-primary"
//                       onClick={() => showPdf(data.pdf)}
//                     >
//                       Show Pdf
//                     </button>
//                     <button
//                       className="btn btn-danger"
//                       onClick={() => deletePdf(data._id)}
//                     >
//                       Delete Pdf
//                     </button>
//                   </div>
//                 );
//               })}
//         </div>
//       </div>
//       <PdfComp pdfFile={pdfFile} />
//     </div>
//   );
// }

// export default App;