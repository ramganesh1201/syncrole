import { n as getDocument, r as version, t as GlobalWorkerOptions } from "../_libs/pdfjs-dist.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pdf-FGxUDQXw.js
GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;
async function extractTextFromPDF(file) {
	try {
		const arrayBuffer = await file.arrayBuffer();
		const pdf = await getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
		let fullText = "";
		for (let i = 1; i <= pdf.numPages; i++) {
			const pageText = (await (await pdf.getPage(i)).getTextContent()).items.map((item) => item.str).join(" ");
			fullText += pageText + "\n";
		}
		return fullText;
	} catch (error) {
		console.error("Error extracting PDF text:", error);
		throw new Error("Failed to parse PDF document.");
	}
}
//#endregion
export { extractTextFromPDF };
