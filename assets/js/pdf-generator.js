function print() {
  const base = window.location.pathname.includes("/CV/") ? "/CV" : "";
  const printWindow = window.open(`${base}/print`, "_blank");
  printWindow.onload = function () {
    printWindow.print();
    setTimeout(() => printWindow.close(), 500);
  };
}


function generatePDF() {
  const base = window.location.pathname.includes("/CV/") ? "/CV" : "";
  const printURL = new URL(`${base}/print`, window.location.origin).href;

  fetch(printURL)
    .then((response) => response.text())
    .then((html) => {
      const container = document.createElement("div");
      container.innerHTML = html;
      const name = document.querySelector(".name").textContent;
      const filename = `${name.replace(/\s+/g, "_")}_Resume.pdf`;

      const opt = {
        margin: 10,
        filename: filename,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      html2pdf()
        .set(opt)
        .from(container)
        .save()
        .catch((err) => console.error("Error generating PDF:", err));
    })
    .catch((err) => console.error("Error fetching print layout:", err));
}
