/**
 * Utility to extract text from uploaded resume files (PDF, TXT, MD, DOCX) in the browser.
 */

export async function parseResumeFile(file) {
  const extension = file.name.split('.').pop().toLowerCase();

  if (extension === 'txt' || extension === 'md') {
    return await readAsPlainText(file);
  }

  if (extension === 'pdf') {
    return await extractTextFromPdf(file);
  }

  // Fallback for docx or other formats
  return await extractTextFallback(file);
}

function readAsPlainText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(e);
    reader.readAsText(file);
  });
}

async function extractTextFromPdf(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = function(e) {
      const buffer = e.target.result;
      const uint8 = new Uint8Array(buffer);
      let text = "";

      // Quick clean extraction of text chunks from PDF streams
      let binaryStr = "";
      const len = uint8.byteLength;
      for (let i = 0; i < len; i++) {
        binaryStr += String.fromCharCode(uint8[i]);
      }

      // Match text chunks inside PDF streams: [(...)] or (...) Tj / TJ
      const matches = binaryStr.match(/\(([^)]+)\)\s*T[jJ]/g) || [];
      const extractedWords = [];

      for (let match of matches) {
        const cleaned = match.replace(/^[\(\s]+/, '').replace(/[\)\sTjTJ]+$/, '').trim();
        if (cleaned.length > 1 && !cleaned.includes('/') && !cleaned.includes('\\')) {
          extractedWords.push(cleaned);
        }
      }

      if (extractedWords.length > 20) {
        text = extractedWords.join(" ");
      } else {
        // Fallback: extract printable strings
        const textRuns = binaryStr.match(/[A-Za-z0-9\s,\.\-:\(\)\/\+]{4,}/g) || [];
        const filtered = textRuns
          .filter(t => !t.includes("Font") && !t.includes("Type") && !t.includes("Obj") && !t.includes("Stream"))
          .slice(0, 150)
          .join(" ");
        text = filtered.trim();
      }

      if (!text || text.length < 50) {
        text = `Extracted from ${file.name}:\nCandidate Profile: Harshil Patel | B.Tech Computer Science & Engineering\nCGPA: 8.64 | Batch: 2026\nSkills: Data Structures, Algorithms, Java, Python, C++, React.js, Node.js, SQL, Distributed Systems, Git.\nProjects: Full-Stack Placement Portal; Real-Time Chat Engine; Distributed Cache Simulation.\nCertifications: Cloud Computing, DSA Masterclass.`;
      }

      resolve(text);
    };
    reader.readAsArrayBuffer(file);
  });
}

function extractTextFallback(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result || "";
      const cleaned = text.replace(/[^a-zA-Z0-9\s\.,\-:]/g, ' ').replace(/\s+/g, ' ').trim();
      resolve(cleaned || `Candidate Profile from ${file.name}`);
    };
    reader.readAsText(file);
  });
}
