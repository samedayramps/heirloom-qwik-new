import { component$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import { PerformanceMonitor } from "./components/PerformanceMonitor/PerformanceMonitor";

import "./global.css";

export default component$(() => {
  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <RouterHead />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body lang="en">
        <RouterOutlet />
        <ServiceWorkerRegister />
        {/* Only show in development */}
        {import.meta.env.DEV && <PerformanceMonitor />}
      </body>
    </QwikCityProvider>
  );
});
