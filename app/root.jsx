import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { MantineProvider, createEmotionCache } from '@mantine/core';
import { StylesPlaceholder } from '@mantine/remix';

export default function App() {
  return (
    <MantineProvider theme={{
      /** Put your mantine theme override here */
      colorScheme: "light",
      defaultRadius: 0,
      colors: {
        custom: [
          // "#dbac6a",
          "#876450",
          "#876450",
          "#876450",
          "#876450",
          "#876450",
          "#876450",
          // "#876450",
          "#dbac6a",
        ],
      },
      fontFamily: "Ligurino, system-ui;",
      primaryColor: "custom",
    }} withGlobalStyles withNormalizeCSS>
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <StylesPlaceholder />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
    </MantineProvider>
  );
}
