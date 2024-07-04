# Chrome AI

## Overview

Chrome AI is a demo project that runs large language models locally within the browser. It showcases the capabilities of modern web technologies to leverage advanced AI functionalities directly in the browser environment without needing server-side processing.

## Features

- **Local Execution**: Runs large language models directly in the browser.
- **Real-time Processing**: Provides instant responses and interactions.
- **Privacy-focused**: Processes data locally, ensuring user privacy and data security.

## Getting Started

### Prerequisites

- Latest version of Google Chrome (127+) or any compatible Chromium-based browser.

### How to Set Up Built-in Gemini Nano in Chrome

1. **Install Chrome Canary**: Ensure you have version 127. [Download Chrome Canary](https://google.com/chrome/canary/).
2. **Enable Prompt API**: Open `chrome://flags/#prompt-api-for-gemini-nano`, set it to "Enabled".
3. **Enable Optimization Guide**: Open `chrome://flags/#optimization-guide-on-device-model`, set it to "Enabled BypassPerfRequirement". Restart the browser.
4. **Login to Google**: Make sure you are logged in to Chrome. For now, Incognito and Guest mode are not supported.
5. **Download Model**: Go to `chrome://components/`, find "Optimization Guide On Device Model", ensure it’s fully downloaded. If the version is "0.0.0.0", click "Check for update".
6. **Troubleshoot**: If the "Optimization Guide On Device Model" is not displayed, disable the settings in steps 2 and 3, restart your browser and re-enable it.
7. **Verify Setup**: Open a webpage, press F12, and check `window.ai` in the console.

### Usage

Clone the repository:

```bash
git clone git@github.com:debugtheworldbot/chromegemini.git
cd chromegemini
pnpm i
pnpm dev
```

Open `localhost:3000` in your browser to start using the AI.

## Contributing

We welcome contributions! Please fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please join ours [Discord](https://discord.gg/ekDRmufC).

## Special Thanks

This project is based on [chromeai](https://github.com/lightning-joyce/chromeai) by Lightning Joyce.

The original project is licensed under the MIT License. See the LICENSE file for more details.

### More Chrome AI project

- **Chrome official example** :  [Using Chrome AI to describe the weathe](https://x.com/ChromiumDev/status/1807817071700447306)
- **@pylthon** : [Use Chrome AI capabilities in the Chrome extension, select web page content and summarize it](https://x.com/pylthon/status/1806304233043501561)、[@varunshenoy_](https://x.com/varunshenoy_/status/1808199306828198214)
- **@shivam_chauhan0** : [Help you write Twitter comment content](https://x.com/shivam_chauhan0/status/1807829573679435791)
- **@webml-demo** : [Offline summary of local document content](https://webml-demo.vercel.app/?provider=chrome_ai)
- **@mortenjust** : [Email writing assistant](https://x.com/mortenjust/status/1808093127976079805)
