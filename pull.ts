import { PDFDocument } from "https://cdn.pika.dev/pdf-lib@^1.6.0";

let pdf = await PDFDocument.create({});

for (let i = 1; i < 20; i++) {
  if (i == 9) i = 13;
  if (i == 15) i++;

  console.log(i);

  let bytes = await fetch(
    `http://www.macs.hw.ac.uk/~fairouz/foundations-2019/slides/lect${i}.pdf`
  ).then((res) => res.arrayBuffer());

  // Load an existing PDFDocument

  let doc = await PDFDocument.load(bytes, {});
  doc = await pdf.copyPages(doc, doc.getPageIndices());

  doc.forEach((e: any) => {
    pdf.addPage(e);
  });
}

// Save the PDFDocument and write it to a file
const pdfBytes = await pdf.save();
await Deno.writeFile("lectures.pdf", pdfBytes);

console.log("Done! 😊");


