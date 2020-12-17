import { PDFDocument } from "https://cdn.pika.dev/pdf-lib@^1.6.0";

console.log("Working on it... ");

let pdf = await PDFDocument.create({});
for (const file of Deno.readDirSync(Deno.args[0])) {
    try {
        let doc = await PDFDocument.load(
            Deno.readAllSync(
                Deno.openSync(`${Deno.args[0]}/${file.name}`, { read: true })
            ).buffer,
            {}
        );
        doc = await pdf.copyPages(doc, doc.getPageIndices());

        doc.forEach((e: any) => {
            pdf.addPage(e);
        });
    } catch (e) {}
}

// Save the PDFDocument and write it to a file
const pdfBytes = await pdf.save();
await Deno.writeFile(Deno.args[1], pdfBytes);

console.log("Done! 😊");
