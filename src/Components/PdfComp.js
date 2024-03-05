import { useState } from "react";
import { Document, Page } from "react-pdf";
import Pdf from "./Action.pdf";

export default function PdfComp({ pdfFile }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

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
        <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
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
