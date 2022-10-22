import React, { useState, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib'
import DownloadLink from "react-download-link";
import { jsPDF } from "jspdf";

import Parse from 'html-react-parser';


const pdf = {
    download: async function download() {
        const name = document.getElementsByClassName('name')[0].value;

        const content = document.getElementsByClassName('ql-editor')[0].innerHTML;

        const parsedContent = Parse(content);


        let allLines = "";
        let firstLine = true;

        // console.log(typeof (parsedContent));
        // console.log(parsedContent.length);

        if (parsedContent.length != undefined) {
            parsedContent.forEach(line => {
                if (firstLine) {
                    firstLine = false;
                    allLines += line.props.children;
                } else {
                    allLines += `
${line.props.children}`;
                }
            });
        } else {
            allLines = parsedContent.props.children;
        }


        console.log(allLines);




        let doc = new jsPDF("portrait", 'pt', 'A4');

        const fontSizeName = 24;
        const fontSizeContent = 14;

        doc.setFontSize(fontSizeName);
        const xOffsetName = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(name) * doc.internal.getFontSize() / 2);
        doc.setFontSize(fontSizeContent);
        const xOffsetContent = 100;

        const contentWrap = doc.splitTextToSize(allLines, doc.internal.pageSize.width - xOffsetContent * 2);

        doc.setFontSize(fontSizeName);
        doc.text(name, xOffsetName, 100);
        doc.setFontSize(fontSizeContent);
        doc.text(contentWrap, xOffsetContent, 150);
        doc.save(name);
    }
}


export default pdf;