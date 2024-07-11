# Summarize Web Pages Instantly with Web Distiller AI, a Chrome Extension Powered by Gemini Nano

Tired of lengthy articles and want to grasp the key points quickly? Web Distiller AI is a Chrome extension that leverages the power of Chrome's built-in Gemini Nano model to provide concise and accurate summaries of web pages, all without sending your data to external servers.

[twitter link](https://x.com/naokiainoya/status/1809507529501688266)

[github](https://github.com/ainoya/chrome-extension-web-distiller-ai)

#### Secure and Private In-Browser Summarization

Web Distiller AI prioritizes user privacy by performing all summarization tasks directly within your browser. Your data never leaves your device, ensuring a secure and private browsing experience.

#### Key Features:

- **One-Click Summarization:** Simply click the extension icon while browsing to generate a summary of the current web page.
- **Markdown Output:** Summaries are presented in a clean and readable markdown format, ready to be copied and pasted into your notes or documents.
- **Translation Options:** Choose to have the summary translated into English or Japanese for enhanced accessibility.
- **Powered by Gemini Nano:** Utilizes the cutting-edge capabilities of Chrome's built-in Gemini Nano model for accurate and efficient summarization.

#### How it Works:

1. **Content Extraction:** Web Distiller AI extracts the main content from the web page using the Readability library.
2. **Markdown Conversion:** The extracted content is converted into markdown format using the Turndown library.
3. **Gemini Nano Summarization:** The markdown text is then passed to the Gemini Nano model via the `window.ai` API for summarization.
4. **Translation (Optional):** If selected, the summary is translated into the chosen language.
5. **Summary Presentation:** The final summary, along with a markdown link to the original article, is displayed in a popup window.

#### Get Started with Web Distiller AI:

1. **Download and Install:** Download the extension from the Chrome Web Store or build it yourself from the source code available on GitHub.
2. **Enable Gemini Nano:** Ensure that the built-in Gemini Nano feature is enabled in your Chrome browser settings.
3. **Start Summarizing:** Browse to any web page you want to summarize and click the Web Distiller AI extension icon.

#### Future Enhancements:

The developer is actively working on improvements, including full-text summarization by chunking content to overcome current context length limitations.

#### Experience the Future of Web Summarization:

Web Distiller AI is a prime example of how Chrome's built-in AI capabilities can enhance our browsing experience. With its focus on privacy, ease of use, and powerful summarization, Web Distiller AI is poised to become an indispensable tool for anyone who wants to consume information more efficiently.
