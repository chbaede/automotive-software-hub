import React, { useEffect } from 'react';

interface GoogleAdBannerProps {
  client?: string;
  slot?: string;
  format?: string;
  responsive?: boolean;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const GoogleAdBanner: React.FC<GoogleAdBannerProps> = ({
  client = 'ca-pub-6854824605420161',
  slot = '9426228178',
  format = 'auto',
  responsive = true,
  className = '',
}) => {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      // Ignore push errors on re-renders
    }
  }, []);

  return (
    <div className={`w-full overflow-hidden flex justify-center text-center max-w-7xl mx-auto my-4 transition-all min-h-0 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight: '0px' }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
};

