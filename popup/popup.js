document.addEventListener('DOMContentLoaded', function () {
    const inputText = document.getElementById('input-text');
    const convertButton = document.getElementById('convert-button');
    const responseText = document.getElementById('response-text');

    inputText.focus();

    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: () => window.getSelection().toString()
        }, (results) => {
            try {
                inputText.value = results[0].result;
            } catch (e) {
                inputText.value = "";
            }
        });
    });

    convertButton.addEventListener('click', function () {
        const codeToAnalyze = inputText.value.trim();

        if (!codeToAnalyze) {
            responseText.innerText = "Please enter or select some code.";
            return;
        }

        responseText.innerText = "Analyzing...";

        fetch("http://localhost:3000/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ code: codeToAnalyze })
        })
        .then(res => res.json())
        .then(data => {
            if (data.result) {
                responseText.innerText = data.result;
            } else {
                responseText.innerText = "Unexpected response from server.";
            }
        })
        .catch(error => {
            console.error("Error:", error);
            responseText.innerText = "Failed to connect to the local Gemini backend.";
        });
    });
});
