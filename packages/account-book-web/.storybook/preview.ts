import type { Preview } from "@storybook/react";
import { initialize, mswLoader } from "msw-storybook-addon";
import "../src/app/globals.css";
import { withNextHeadersMock } from "./withHeadersMock";

initialize({ onUnhandledRequest: "warn" });

const preview: Preview = {
  decorators: [withNextHeadersMock],
  loaders: [mswLoader],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
