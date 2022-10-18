import React, { useState, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib'
import DownloadLink from "react-download-link";
import { jsPDF } from "jspdf";

import Parse from 'html-react-parser';


const pdf = {
    download: async function download() {
        const name = document.getElementsByClassName('name')[0].value;

        const content = document.getElementsByClassName('ql-editor')[0].innerHTML;
        const parsedContent = Parse(content).props.children;

        let doc = new jsPDF("portrait", 'pt', 'A4');

        const fontSizeName = 24;
        const fontSizeContent = 14;

        doc.setFontSize(fontSizeName);
        const xOffsetName = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(name) * doc.internal.getFontSize() / 2);
        doc.setFontSize(fontSizeContent);
        const xOffsetContent = 100;

        const contentWrap = doc.splitTextToSize(parsedContent, doc.internal.pageSize.width - xOffsetContent * 2);

        doc.setFontSize(fontSizeName);
        doc.text(name, xOffsetName, 100);
        doc.setFontSize(fontSizeContent);
        doc.text(contentWrap, xOffsetContent, 150);
        doc.save(name);
    }
}


export default pdf;



// export default function PdfLink() {

//     function pdfDownload() {
//         const name = document.getElementsByClassName('name')[0].value;

//         const content = document.getElementsByClassName('ql-editor')[0].innerHTML;
//         const parsedContent = Parse(content).props.children;

//         let doc = new jsPDF("portrait", 'pt', 'A4');

//         const fontSizeName = 28;
//         const fontSizeContent = 16;

//         doc.setFontSize(fontSizeName);
//         const xOffsetName = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(name) * doc.internal.getFontSize() / 2);
//         doc.setFontSize(fontSizeContent);
//         const xOffsetContent = 60;

//         const contentWrap = doc.splitTextToSize(parsedContent, doc.internal.pageSize.width - xOffsetContent * 2);

//         doc.setFontSize(fontSizeName);
//         doc.text(name, xOffsetName, 150);
//         doc.setFontSize(fontSizeContent);
//         doc.text(contentWrap, xOffsetContent, 190);
//         doc.save(name);
//     }


//     return (
//         <button onClick={pdfDownload}>DOWNLOAD</button>
//     )

// }



// TESTAR PDF-DOCUMENT OCH REACT-DOWNLOAD-LINK

// export default function PdfLink() {

//     const [docPdf, setDocPdf] = useState(null);

//     useEffect(() => {
//         (async () => {
//             const nameHolder = document.getElementsByClassName('name')[0];
//             const contentHolder = document.getElementsByClassName('ql-editor')[0];

//             const pdfDoc = await PDFDocument.create()
//             const page = pdfDoc.addPage()
//             page.drawText(nameHolder.value)
//             page.drawText(contentHolder.innerHTML)
//             const pdfBytes = await pdfDoc.save()
//             setDocPdf(pdfBytes);

//             // todo: https://www.geeksforgeeks.org/how-to-download-pdf-file-in-reactjs/  FAST.. palla?
//         })();
//     }, []);

//     // async function createPdf() {
//     //     console.log("clicked");
//     //     const nameHolder = document.getElementsByClassName('name')[0];
//     //     const contentHolder = document.getElementsByClassName('ql-editor')[0];

//     //     const pdfDoc = await PDFDocument.create()
//     //     const page = pdfDoc.addPage()
//     //     page.drawText(nameHolder.value)
//     //     page.drawText(contentHolder.innerHTML)
//     //     const pdfBytes = await pdfDoc.save()
//     //     // window.open(pdfBytes, "test.pdf");
//     //     // window.open("data:application/pdf;base64, " + pdfBytes);

//     //     // var blob = new Blob([pdfBytes], { type: "application/pdf" });// change resultByte to bytes
//     // }


//     return (
//         // <button onClick={createPdf}></button>
//         <DownloadLink
//             label="save"
//             filename="myFile.pdf"
//             exportFile={() => docPdf }
//         />
//     )
// }

