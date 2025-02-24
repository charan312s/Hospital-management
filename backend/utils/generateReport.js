const PDFDocument = require("pdfkit");
const fs = require("fs");

const generateReport = async (patient) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });

    let buffers = [];
    doc.on("data", (chunk) => buffers.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(buffers)));
    doc.on("error", reject);

    // ✅ Hospital Header
    doc.fontSize(12).text("123, Health Street, City, Country", { align: "center" });
    doc.text("Phone: +123-456-7890 | Email: info@apollohospital.com", { align: "center" });

    doc.moveDown(1);
    doc
      .fontSize(18)
      .fillColor("blue")
      .text("Patient Medical Report", { align: "center", underline: true });
    doc.moveDown(1);

    // ✅ Patient Details
    doc.fillColor("black").fontSize(14).text("Patient Information", { underline: true });
    doc.moveDown(0.5);

    doc
      .fontSize(12)
      .text(`Name: ${patient.name}`, { continued: true })
      .text(`  |  Age: ${patient.age}`)
      .moveDown(0.3);
    doc.text(`Gender: ${patient.gender}`).moveDown(0.3);
    doc.text(`Symptoms: ${patient.symptoms}`).moveDown(0.3);
    doc.text(`Status: ${patient.status}`).moveDown(0.3);
    doc.text(`Appointment Time: ${patient.registrationDateIST} ${patient.registrationTimeIST}`).moveDown(1);

    // ✅ Remarks Section
    doc.fillColor("black").fontSize(14).text("Doctor's Remarks", { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).text(patient.remarks || "No remarks available");

    // ✅ Footer with Page Number
    doc.fontSize(10).fillColor("gray").text("Apollo Hospital | www.apollohospital.com", 50, 750, {
      align: "center",
    });

    doc.end();
  });
};

module.exports = generateReport;
