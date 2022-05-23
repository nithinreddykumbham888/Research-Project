import React, { useState} from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';

// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/` + pdfjs.version + `/pdf.worker.js`

function ViewPdf(fileURl) {



    // console.log(pdfjs.GlobalWorkerOptions.workerSrc)

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    // console.log(fileURl.fileURl)

    return (
        <div>
            {/* <Document file={"https://cors-anywhere.herokuapp.com/"+fileURl.fileURl} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
            </Document>
            <p>
                Page {pageNumber} of {numPages}
            </p> */}
            <object data={fileURl.fileURl} type="application/pdf" width="100%" height="600px">
                <p>Alternative text - include a link <a href={fileURl.fileURl}>to the PDF!</a></p>
            </object>
        </div>
    );
}

export default ViewPdf;
