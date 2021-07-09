export const isPerformanceSupported = () =>
  performance && !!performance.getEntriesByType && !!performance.now && !!performance.mark;
