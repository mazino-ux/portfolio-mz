declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value?: number;
};

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID as string, {
      page_path: url,
    });
  }
};

export const event = ({ action, category, label, value }: GTagEvent) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
};