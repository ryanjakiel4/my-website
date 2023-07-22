import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import styled from "styled-components";
import "react-pdf/dist/esm/Page/TextLayer.css";
import Button from "react-bootstrap/Button";
import {
    IoMdDownload
  } from "react-icons/io";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Resume() {
  return (
    <div>
        <Button
            variant="primary"
            href={require("./RyanJakielResume.pdf")}
            target="_blank"
            style={{ maxWidth: "250px" }}
          >
            <IoMdDownload />
            &nbsp;Download Resume
          </Button>
          <Document file={require("./RyanJakielResume.pdf")}>
            <ResumeView.Page pageNumber={1}  />
          </Document>  
    </div>
  );
}

const ResumeView = {
    Page: styled(Page)`
    `
  }

export default Resume;