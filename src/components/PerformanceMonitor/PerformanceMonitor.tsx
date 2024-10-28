import { component$, useSignal, useOnDocument, $ } from '@builder.io/qwik';

export const PerformanceMonitor = component$(() => {
  const metrics = useSignal<Record<string, number>>({});
  const showMetrics = useSignal(false);

  useOnDocument('DOMContentLoaded', $(() => {
    if (typeof window !== 'undefined') {
      // Create observer for paint metrics
      const paintObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          metrics.value = {
            ...metrics.value,
            [entry.name]: Math.round(entry.startTime),
          };
        });
      });

      // Create observer for LCP
      const lcpObserver = new PerformanceObserver((list) => {
        const entry = list.getEntries().at(-1);
        if (entry) {
          metrics.value = {
            ...metrics.value,
            'Largest Contentful Paint': Math.round(entry.startTime),
          };
        }
      });

      // Create observer for FID
      const fidObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'first-input') {
            const fidEntry = entry as PerformanceEventTiming;
            metrics.value = {
              ...metrics.value,
              'First Input Delay': Math.round(fidEntry.processingStart! - fidEntry.startTime),
            };
          }
        });
      });

      // Observe different metrics
      paintObserver.observe({ entryTypes: ['paint'] });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      fidObserver.observe({ type: 'first-input', buffered: true });
    }
  }));

  return (
    <div class="fixed bottom-4 right-4 z-[1000]">
      <button
        onClick$={() => showMetrics.value = !showMetrics.value}
        class="bg-gray-800 text-white px-4 py-2 rounded-full text-sm"
      >
        {showMetrics.value ? 'Hide Metrics' : 'Show Metrics'}
      </button>

      {showMetrics.value && (
        <div class="mt-4 bg-white p-4 rounded-lg shadow-lg">
          <h3 class="font-bold mb-2">Performance Metrics (ms)</h3>
          <ul class="space-y-2">
            {Object.entries(metrics.value).map(([key, value]) => (
              <li key={key} class={{
                'flex justify-between': true,
                'text-green-600': value < 1000,
                'text-yellow-600': value >= 1000 && value < 2500,
                'text-red-600': value >= 2500,
              }}>
                <span>{key}:</span>
                <span class="font-mono">{value}ms</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
