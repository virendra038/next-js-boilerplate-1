import { IncomingMessage } from "http";
import { GetServerSidePropsContext } from "next";

export default function GetBaseUrl(ctx: GetServerSidePropsContext) {
  const req = ctx.req as IncomingMessage & {
    protocol?: string;
    headers?: { host?: string };
  };

  if (!req.headers?.host) {
    // Handle the case where the 'host' header is not present
    return {
      notFound: true,
    };
  }
  const protocol = req.protocol || "http";
  return `${protocol}://${req.headers.host}`;
}
