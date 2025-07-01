import fs from 'fs';
import path from 'path';
import Tesseract from 'tesseract.js';

export const extractText = async(responseBuffer)=> {
    const filename = `temp_${Date.now()}.jpg`;
    const tempPath = path.join(process.cwd(), 'temp', filename);

    try {
        fs.mkdirSync(path.dirname(tempPath), { recursive: true });
        fs.writeFileSync(tempPath, responseBuffer);

        const result = await Tesseract.recognize(tempPath, 'eng');
        const extractedText = result.data.text;

        return extractedText;
    } catch (err) {
        console.error("OCR Error:", err);
        throw err;
    } finally {
        if (fs.existsSync(tempPath)) {
            fs.unlinkSync(tempPath); // delete temp file
        }
    }
}

