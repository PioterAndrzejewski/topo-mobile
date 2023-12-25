import { Skia } from "@shopify/react-native-skia";

export const TwoRings = (scale = 1) =>
  Skia.SVG.MakeFromString(
    `
  <svg width="${75 * scale}" height="${
      63 * scale
    }" viewBox="0 0 75 63" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g filter="url(#filter0_d_35_76)">
  <path d="M63 22C63 26.6639 61.8407 30.7902 60.0716 33.685C58.2816 36.6142 56.0772 38 54 38C51.9228 38 49.7184 36.6142 47.9284 33.685C46.1593 30.7902 45 26.6639 45 22C45 17.3361 46.1593 13.2098 47.9284 10.315C49.7184 7.38582 51.9228 6 54 6C56.0772 6 58.2816 7.38582 60.0716 10.315C61.8407 13.2098 63 17.3361 63 22Z" stroke="white" stroke-width="4"/>
  <path d="M26 33C26 37.6639 24.8407 41.7902 23.0716 44.685C21.2816 47.6142 19.0772 49 17 49C14.9228 49 12.7184 47.6142 10.9284 44.685C9.15932 41.7902 8 37.6639 8 33C8 28.3361 9.15932 24.2098 10.9284 21.315C12.7184 18.3858 14.9228 17 17 17C19.0772 17 21.2816 18.3858 23.0716 21.315C24.8407 24.2098 26 28.3361 26 33Z" stroke="white" stroke-width="4"/>
  </g>
  <defs>
  <filter id="filter0_d_35_76" x="0" y="0" width="75" height="63" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
  <feOffset dx="2" dy="4"/>
  <feGaussianBlur stdDeviation="4"/>
  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_35_76"/>
  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_35_76" result="shape"/>
  </filter>
  </defs>
  </svg>
  `,
  );

export const ChainAnchor = (scale = 1) =>
  Skia.SVG.MakeFromString(
    `
<svg width="${103 * scale}" height="${
      143 * scale
    }" viewBox="0 0 103 143" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_35_56)">
<circle cx="40" cy="117" r="12" stroke="white" stroke-width="4"/>
<path d="M18 68.6414C29.3094 103.739 41.2556 150.928 81 38" stroke="white" stroke-width="4"/>
<path d="M91 22C91 26.6639 89.8407 30.7902 88.0716 33.685C86.2816 36.6142 84.0772 38 82 38C79.9228 38 77.7184 36.6142 75.9284 33.685C74.1593 30.7902 73 26.6639 73 22C73 17.3361 74.1593 13.2098 75.9284 10.315C77.7184 7.38582 79.9228 6 82 6C84.0772 6 86.2816 7.38582 88.0716 10.315C89.8407 13.2098 91 17.3361 91 22Z" stroke="white" stroke-width="4"/>
<path d="M26 53C26 57.6639 24.8407 61.7902 23.0716 64.685C21.2816 67.6142 19.0772 69 17 69C14.9228 69 12.7184 67.6142 10.9284 64.685C9.15932 61.7902 8 57.6639 8 53C8 48.3361 9.15932 44.2098 10.9284 41.315C12.7184 38.3858 14.9228 37 17 37C19.0772 37 21.2816 38.3858 23.0716 41.315C24.8407 44.2098 26 48.3361 26 53Z" stroke="white" stroke-width="4"/>
</g>
<defs>
<filter id="filter0_d_35_56" x="0" y="0" width="103" height="143" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="2" dy="4"/>
<feGaussianBlur stdDeviation="4"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_35_56"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_35_56" result="shape"/>
</filter>
</defs>
</svg>
  `,
  );

export const RescueRing = (scale = 1) =>
  Skia.SVG.MakeFromString(
    `
  <svg width="${83 * scale}" height="${
      76 * scale
    }" viewBox="0 0 83 76" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g filter="url(#filter0_d_35_96)">
  <path d="M35.0364 62C23.9204 62 10 54.5 10 32.734C10 9.32114 29 5.99997 37 7" stroke="white" stroke-width="4"/>
  <path d="M31 60C39.8606 60 49 49.5122 49 34.2661C49 19.02 41.8606 7.5 33 7.5" stroke="white" stroke-width="4"/>
  <path d="M56 34.5C56 42.2893 53.8027 49.2546 50.3533 54.2183C46.8988 59.1894 42.3225 62 37.5 62C32.6775 62 28.1012 59.1894 24.6467 54.2183C21.1973 49.2546 19 42.2893 19 34.5C19 26.7107 21.1973 19.7454 24.6467 14.7817C28.1012 9.8106 32.6775 7 37.5 7C42.3225 7 46.8988 9.8106 50.3533 14.7817C53.8027 19.7454 56 26.7107 56 34.5Z" stroke="white" stroke-width="4"/>
  <path d="M54 23L70 32C73.5 36.5 73.5 41 70 47.5L50 54" stroke="white" stroke-width="4"/>
  </g>
  <defs>
  <filter id="filter0_d_35_96" x="0" y="0.845703" width="82.625" height="75.1543" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
  <feOffset dy="4"/>
  <feGaussianBlur stdDeviation="4"/>
  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_35_96"/>
  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_35_96" result="shape"/>
  </filter>
  </defs>
  </svg>
  `,
  );

export const Ring = (scale = 1) =>
  Skia.SVG.MakeFromString(
    `
  <svg width="${59 * scale}" height="${
      55 * scale
    }" viewBox="0 0 59 55" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g filter="url(#filter0_d_35_97)">
  <path d="M25.5915 40.7545C18.669 40.7545 10 36.0838 10 22.5289C10 7.94843 21.8323 5.88016 26.8144 6.50293" stroke="white" stroke-width="3"/>
  <path d="M23.0778 39.5089C28.5958 39.5089 34.2874 32.9776 34.2874 23.483C34.2874 13.9884 29.8413 6.81433 24.3233 6.81433" stroke="white" stroke-width="3"/>
  <path d="M38.3922 23.6287C38.3922 28.4341 37.0362 32.7196 34.9212 35.7632C32.8024 38.8122 30.0223 40.5 27.1257 40.5C24.2291 40.5 21.449 38.8122 19.3302 35.7632C17.2153 32.7196 15.8593 28.4341 15.8593 23.6287C15.8593 18.8233 17.2153 14.5378 19.3302 11.4942C21.449 8.44525 24.2291 6.75745 27.1257 6.75745C30.0223 6.75745 32.8024 8.44525 34.9212 11.4942C37.0362 14.5378 38.3922 18.8233 38.3922 23.6287Z" stroke="white" stroke-width="3"/>
  <path d="M37.4012 16.467L47.3652 22.0718C49.5449 24.8742 49.5449 27.6766 47.3652 31.7245L34.9102 35.7724" stroke="white" stroke-width="3"/>
  </g>
  <defs>
  <filter id="filter0_d_35_97" x="0.5" y="0.90686" width="58" height="53.3475" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
  <feOffset dy="4"/>
  <feGaussianBlur stdDeviation="4"/>
  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_35_97"/>
  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_35_97" result="shape"/>
  </filter>
  </defs>
  </svg>
  `,
  );
