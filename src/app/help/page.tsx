import React from "react";
import Markdown from "react-markdown";

export default function Help() {
  return (
    <article className="prose mx-auto mt-8 mb-12 w-full max-w-4xl px-4">
      <Markdown>{md}</Markdown>
    </article>
  );
}

const md = `# Chrome Built-in AI: Help & Introduction

## What is Chrome Built-in AI?

Chrome Built-in AI is a project that runs large language models directly in your Chrome browser. This technology enables local AI processing, enhancing privacy and reducing dependence on external servers.

## Features

* **Local AI Processing** : Run AI models directly in your Chrome browser.
* **Gemini Nano** : Utilizes Google's Gemini Nano model for efficient, on-device AI capabilities.
* **Privacy Protection** : All processing is done locally, with no data sent to external servers.
* **Natural Language Understanding** : Capable of understanding and generating human language for various tasks.
* **Context Awareness** : Understands conversation context, providing coherent responses.

## How to Use

1. **Start a New Chat** : Click the "New Chat" button to begin interacting with the AI.
2. **Send Messages** : Type your message or query in the input field and click "Send" to communicate with the AI.

## Privacy and Data

* All AI processing occurs **locally** in your browser.
* No data is sent to external servers, ensuring your conversations remain private.

## Steps to Enable Local AI

If local AI is not enabled, follow these steps:

1. **Install Chrome Canary** :
   * Ensure you have version 127 or higher.
   * Download from: [Chrome Canary](https://www.google.com/chrome/canary/)
2. **Enable Prompt API** :
   * Go to: \`chrome://flags/#prompt-api-for-gemini-nano\`
    * Set it to "Enabled"
3. **Enable Optimization Guide** :
   * Go to: \`chrome://flags/#optimization-guide-on-device-model\`
  * Set it to "Enabled BypassPerfRequirement"
    * Restart the browser after this step
4. **Login to Google** :
   * Ensure you are logged into your Chrome browser
  * Note: Incognito and Guest modes are not currently supported
5. **Download Model** :
   * Visit \`chrome://components/\`
  * Find "Optimization Guide On Device Model"
    * Ensure it's fully downloaded
      * If the version shows "0.0.0.0", click "Check for update"

## Work in Progress

Please note that Chrome Built -in AI is currently a work in progress.Features and functionality may change or improve over time.

## Feedback and Support

For additional help or to provide feedback, please join our Discord community: 
[https://discord.gg/ZrF4kjUBhJ](https://discord.gg/ZrF4kjUBhJ)`;
