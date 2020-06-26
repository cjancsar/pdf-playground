import { Request, Response } from 'express';
import path from 'path';

const express = require('express');
const app = express();
const port = 3000;

// Serve local versions of static files
app.get('/pdf_viewer.css', (req: Request, res: Response) =>
  res.sendFile(path.join(__dirname, '../node_modules/pdfjs-dist/web/pdf_viewer.css'))
);
app.get('/pdf.js', (req: Request, res: Response) =>
  res.sendFile(path.join(__dirname, '../node_modules/pdfjs-dist/build/pdf.js'))
);
app.get('/pdf.js.map', (req: Request, res: Response) =>
  res.sendFile(path.join(__dirname, '../node_modules/pdfjs-dist/build/pdf.js.map'))
);
app.get('/pdf_viewer.js', (req: Request, res: Response) =>
  res.sendFile(path.join(__dirname, '../node_modules/pdfjs-dist/web/pdf_viewer.js'))
);
app.get('/pdf_viewer.js.map', (req: Request, res: Response) =>
  res.sendFile(path.join(__dirname, '../node_modules/pdfjs-dist/web/pdf_viewer.js.map'))
);
app.get('/form.js', (req: Request, res: Response) => res.sendFile(path.join(__dirname, '../dist/form.js')));
app.get('/pdf.worker.js', (req: Request, res: Response) =>
  res.sendFile(path.join(__dirname, '../node_modules/pdfjs-dist/build/pdf.worker.js'))
);
app.get('/pdf.worker.js.map', (req: Request, res: Response) =>
  res.sendFile(path.join(__dirname, '../node_modules/pdfjs-dist/build/pdf.worker.js.map'))
);

// Test PDFs
app.get('/pdfs/fw4.pdf', (req: Request, res: Response) => res.sendFile(path.join(__dirname, '../public/pdfs/fw4.pdf')));

// Serve our basic test html file
app.get('/', (req: Request, res: Response) => res.sendFile(path.join(__dirname, '../public/form.html')));

app.listen(port, () => console.log(`PDF form example app listening at http://localhost:${port}`));
