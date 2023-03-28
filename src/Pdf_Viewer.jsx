import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Document, Page,pdfjs } from 'react-pdf/dist/esm/entry.vite';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// default layout plugin
// Import styles of default layout plugin
const Pdf_Viewer = () => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
  
    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }
    const {pdf}= useParams();

    const [pdfUrl, setPdfUrl] = useState("");
    useEffect(() => {
        const pdfKey = pdf+".pdf";
        console.log(pdfKey)
        getFile(pdfKey).then(url => {
          setPdfUrl(url);
        }).catch(err => {
          console.log('Error retrieving Pdf URL:', err);
        });
      }, [pdf]);
    const bucket = import.meta.env.VITE_AWS_BUCKET;
    const region = import.meta.env.VITE_AWS_REGION;
    const secret = import.meta.env.VITE_AWS_SECRET;
    const key = import.meta.env.VITE_AWS_KEY;
    const s3 = new AWS.S3({
        region: region,
        accessKeyId:key,
        secretAccessKey: secret
      });
      async function getFile(pdfKey) {
        try {
          const params = {
            Bucket: bucket+"/pdf",
            Key: pdfKey
          };
      
          const response = await s3.getSignedUrlPromise('getObject',params);
          console.log('File retrieved successfully:', response);
          return response;
        } catch (err) {
          console.log(err);
          return null;
        }
      }

  return (
<div>
      {pdfUrl && <><Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      </>}</div>)
}

export default Pdf_Viewer