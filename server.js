// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/analyze', async (req, res) => {
    const functionInput = req.body.code;
    const prompt = `Analyze the following function and provide its time and space complexity:\n\n${functionInput}`;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log("Response from Gemini:", text);
        res.json({ result: text });
    } catch (err) {
        console.error("Gemini API Error:", err);
        res.status(500).json({ error: "Failed to analyze function." });
    }
});

app.listen(port, () => console.log(`Gemini API backend running at http://localhost:${port}`));

