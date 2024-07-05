import React from "react";
import Markdown from "react-markdown";

export default function Privacy() {
  return (
    <article className="prose mx-auto mt-8 mb-12 w-full max-w-4xl px-4">
      <Markdown>{md}</Markdown>
    </article>
  );
}

const md = `
# Privacy Policy for ChromeAI Sidebar

At ChromeAI Sidebar, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard information when you use our ChromeAI Sidebar extension and related services (collectively, the "Services").

## How Your Data is Handled

### Local Storage
All of your data, including chat history and user preferences, are stored locally on your browser. We do not have access to this information.

### Direct Communication
Your interactions with the AI assistant are processed directly through Chrome's built-in AI capabilities. There is no intermediary server, and no one else can see the content of your requests or responses.

### No Data Collection
We do not collect, store, or transmit any personal information or usage data from our extension.

## Third-party Services

### Chrome Built-in AI
Our extension utilizes Chrome's built-in AI capabilities. The processing of your queries and generation of responses occurs locally within your browser, adhering to Chrome's privacy standards.

We do not use any additional third-party analytics or tracking services.

## Data Security

As all data is processed and stored locally on your device, the security of your information is protected by your browser's built-in security measures and your device's own security settings.

## Updates to Privacy Policy

We may update this Privacy Policy from time to time. If we make material changes, we will notify you by posting a notice on our Chrome Web Store listing or through the extension itself.

## Your Rights

As we do not collect or store any of your personal data, there is no need for data access, correction, or deletion requests. All your data remains under your control on your local device.

## Contact Us

If you have any questions or concerns about our privacy practices, please contact us at https://discord.gg/ZrF4kjUBhJ.

This policy is effective as of 28 June 2024.

By using the ChromeAI Sidebar extension, you agree to the terms outlined in this Privacy Policy. Your continued use of our extension will be regarded as acceptance of our practices around privacy and personal information.
`;
