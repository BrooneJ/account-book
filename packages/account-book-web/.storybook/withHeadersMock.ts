import { Decorator } from "@storybook/react";

let allHeaders = new Map();
export const headers = () => {
  return allHeaders;
};

export const cookies = () => {
  return {
    get: () => "mockCookieValue",
  };
};

export const withNextHeadersMock: Decorator = (story, { parameters }) => {
  if (parameters?.nextHeaders) {
    allHeaders = new Map(Object.entries(parameters.nextHeaders));
  }

  return story();
};
