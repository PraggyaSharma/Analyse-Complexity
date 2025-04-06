// import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from "dotenv";
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv")
dotenv.config();
// dotenv.config(); // If using a .env file for API keys

// Your completed function
async function llm_test(token, functionInput) {
  const prompt = `Analyze the following function and provide its time and space complexity:\n\n${functionInput}`;

  const model = token.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);

  const response = await result.response;
  const text = response.text();

  console.log("Response from Gemini:");
  console.log(text);

  return text;
}

// Initialize Gemini with your API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Example code snippet to analyze
const codeSnippet = `
        int n = edges.size();
        vector<int> indegree(n+2,0);
        cout<<edges[0][0]<<endl;
        cout<<edges[n-1][0]<<endl;
        for(int i=0; i<n; i++){
            indegree[edges[i][0]]++;
            indegree[edges[i][1]]++;
        }
        int ind = 0;
        int maxind = INT_MIN;
        for(int i=0; i<n+2; i++){
            if(indegree[i] > maxind){
                ind =  i;
                maxind = indegree[i];
            }
        }
        return ind;
`;

// Call the function
llm_test(genAI, codeSnippet).catch(console.error);

