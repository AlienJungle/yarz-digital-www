import { StatusCodes } from "http-status-codes";

export const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    const body = await res.json();

    if (res.ok) {
      return body;
    }

    switch (res.status) {
      case StatusCodes.UNAUTHORIZED:
        throw "You do not have permission to access this resource.";
      default:
        throw body?.message ?? body ?? "an unknown error occurred.";
    }
  });
