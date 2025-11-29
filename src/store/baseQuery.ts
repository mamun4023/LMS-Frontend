
import { BaseQueryApi, BaseQueryApiEndpoint } from "@reduxjs/toolkit/query";

export const baseQuery = (
  async (args: BaseQueryApi, api: BaseQueryApiEndpoint, extraOptions: { signal?: AbortSignal } = {}) => {
    const {
      url,
      body,
      headers,
      signal,
    } = await args.fetch(api.endpoint, {
      method: api.method,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      ...extraOptions,
    });

    return {
      data: await responseValidator(),
    };
  }
);
