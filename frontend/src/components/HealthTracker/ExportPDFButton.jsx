import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ExportPDFButton = ({ entries }) => {
  const handleExport = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Health Tracker Report', 14, 16);
    doc.setFontSize(12);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 24);

    const tableColumn = [
      'Date',
      'Systolic',
      'Diastolic',
      'Glucose',
      'Weight',
      'Temperature',
      'Heart Rate',
      'Oxygen',
      'Symptoms',
      'Medications',
      'Notes',
    ];
    const tableRows = entries.map(entry => [
      new Date(entry.createdAt).toLocaleDateString(),
      entry.metrics?.bloodPressure?.systolic || '',
      entry.metrics?.bloodPressure?.diastolic || '',
      entry.metrics?.bloodGlucose || '',
      entry.metrics?.weight || '',
      entry.metrics?.temperature || '',
      entry.metrics?.heartRate || '',
      entry.metrics?.oxygenLevel || '',
      (entry.symptoms || []).join(', '),
      (entry.medications || []).map(m => `${m.name} (${m.dosage}, ${m.timing})`).join('; '),
      entry.notes || '',
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 32,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [95, 111, 255] },
      margin: { left: 8, right: 8 },
      tableWidth: 'auto',
    });

    doc.save('health-tracker-report.pdf');
  };

  return (
    <button
      onClick={handleExport}
      className="bg-primary hover:bg-secondary text-white font-semibold px-6 py-2 rounded-lg shadow transition button-animate mb-4"
      disabled={!entries || entries.length === 0}
    >
      Export PDF Report
    </button>
  );
};

export default ExportPDFButton; 