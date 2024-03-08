import { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import Pdf from "./Action.pdf";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

export default function PdfComp() {
  const location = useLocation();
  const { state } = location;
  const [pdfFile, setPdfFile] = useState();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      if (state) {
        console.log(state);
        const data = await axios.get(
          `${process.env.PUBLIC_URL}/${state?.bookData}`
        );
        // console.log(data?.data);
        setPdfFile(data?.data);
      }
    };
    fetchData();
    // Log the state to verify if it's correctly retrieved
  }, [state]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    // setPageNumber(numPages)
  }

  return (
    <div className="flex flex-col h-full p-6 overflow-hidden rounded-lg shadow-lg ">
      <div className="text-center text-gray-600 ">
        Page {pageNumber} of {numPages}
      </div>
      <div className="flex justify-center w-full p-5 overflow-auto border rounded grow h-96">
        <Document
          file={`${process.env.PUBLIC_URL}/${state?.bookData}`}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array?.apply(null, Array(numPages))
            .map((x, i) => i + 1)
            .map((page) => (
              <Page
                key={page}
                pageNumber={page}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="mb-4"
              />
            ))}
        </Document>
      </div>
    </div>
  );
}
