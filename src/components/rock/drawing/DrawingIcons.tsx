import { Skia } from "@shopify/react-native-skia";

export const TwoRings = (scale = 1) =>
  Skia.SVG.MakeFromString(
    `
    <svg width="${96 * scale}" height="${
      74 * scale
    }" viewBox="0 0 96 74" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_0_1)">
    <path d="M25.5915 60.497C18.669 60.497 10 55.8263 10 42.2714C10 27.691 21.8323 25.6227 26.8144 26.2455" stroke="white" stroke-width="3"/>
    <path d="M23.0778 59.2515C28.5958 59.2515 34.2874 52.7201 34.2874 43.2256C34.2874 33.731 29.8413 26.5569 24.3233 26.5569" stroke="white" stroke-width="3"/>
    <path d="M38.3922 43.3713C38.3922 48.1767 37.0362 52.4622 34.9212 55.5057C32.8024 58.5547 30.0223 60.2425 27.1257 60.2425C24.2291 60.2425 21.449 58.5547 19.3302 55.5057C17.2153 52.4622 15.8593 48.1767 15.8593 43.3713C15.8593 38.5659 17.2153 34.2803 19.3302 31.2368C21.449 28.1878 24.2291 26.5 27.1257 26.5C30.0223 26.5 32.8024 28.1878 34.9212 31.2368C37.0362 34.2803 38.3922 38.5659 38.3922 43.3713Z" stroke="white" stroke-width="3"/>
    <path d="M37.4012 36.2096L47.3652 41.8144C49.5449 44.6168 49.5449 47.4192 47.3652 51.4671L34.9102 55.515" stroke="white" stroke-width="3"/>
    </g>
    <g filter="url(#filter1_d_0_1)">
    <path d="M62.5915 40.497C55.669 40.497 47 35.8263 47 22.2714C47 7.69099 58.8323 5.62271 63.8144 6.24549" stroke="white" stroke-width="3"/>
    <path d="M60.0778 39.2515C65.5958 39.2515 71.2874 32.7201 71.2874 23.2256C71.2874 13.731 66.8413 6.55688 61.3233 6.55688" stroke="white" stroke-width="3"/>
    <path d="M75.3922 23.3713C75.3922 28.1767 74.0362 32.4622 71.9212 35.5057C69.8024 38.5547 67.0223 40.2425 64.1257 40.2425C61.2291 40.2425 58.449 38.5547 56.3302 35.5057C54.2153 32.4622 52.8593 28.1767 52.8593 23.3713C52.8593 18.5659 54.2153 14.2803 56.3302 11.2368C58.449 8.1878 61.2291 6.5 64.1257 6.5C67.0223 6.5 69.8024 8.1878 71.9212 11.2368C74.0362 14.2803 75.3922 18.5659 75.3922 23.3713Z" stroke="white" stroke-width="3"/>
    <path d="M74.4012 16.2096L84.3652 21.8144C86.5449 24.6168 86.5449 27.4192 84.3652 31.4671L71.9102 35.515" stroke="white" stroke-width="3"/>
    </g>
    <defs>
    <filter id="filter0_d_0_1" x="0.5" y="20.6494" width="58" height="53.3477" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="4"/>
    <feGaussianBlur stdDeviation="4"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape"/>
    </filter>
    <filter id="filter1_d_0_1" x="37.5" y="0.649414" width="58" height="53.3477" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="4"/>
    <feGaussianBlur stdDeviation="4"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape"/>
    </filter>
    </defs>
    </svg>
    
  `,
  );

export const ChainAnchor = (scale = 1) =>
  Skia.SVG.MakeFromString(
    `
    <svg width="${123 * scale}" height="${
      147 * scale
    }" viewBox="0 0 123 147" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_0_1)">
    <circle cx="46" cy="121" r="12" stroke="white" stroke-width="4"/>
    <path d="M24 72.6414C35.3094 107.739 47.2556 154.928 87 42" stroke="white" stroke-width="4"/>
    </g>
    <g filter="url(#filter1_d_0_1)">
    <path d="M25.5915 69.497C18.669 69.497 10 64.8263 10 51.2714C10 36.691 21.8323 34.6227 26.8144 35.2455" stroke="white" stroke-width="3"/>
    <path d="M23.0778 68.2515C28.5958 68.2515 34.2874 61.7201 34.2874 52.2256C34.2874 42.731 29.8413 35.5569 24.3233 35.5569" stroke="white" stroke-width="3"/>
    <path d="M38.3922 52.3713C38.3922 57.1767 37.0362 61.4622 34.9212 64.5057C32.8024 67.5547 30.0223 69.2425 27.1258 69.2425C24.2292 69.2425 21.4491 67.5547 19.3303 64.5057C17.2153 61.4622 15.8593 57.1767 15.8593 52.3713C15.8593 47.5659 17.2153 43.2803 19.3303 40.2368C21.4491 37.1878 24.2292 35.5 27.1258 35.5C30.0223 35.5 32.8024 37.1878 34.9212 40.2368C37.0362 43.2803 38.3922 47.5659 38.3922 52.3713Z" stroke="white" stroke-width="3"/>
    <path d="M37.4012 45.2096L47.3653 50.8144C49.5449 53.6168 49.5449 56.4192 47.3653 60.4671L34.9102 64.515" stroke="white" stroke-width="3"/>
    </g>
    <g filter="url(#filter2_d_0_1)">
    <path d="M89.5915 40.497C82.669 40.497 74 35.8263 74 22.2714C74 7.69099 85.8323 5.62271 90.8144 6.24549" stroke="white" stroke-width="3"/>
    <path d="M87.0778 39.2515C92.5958 39.2515 98.2874 32.7201 98.2874 23.2256C98.2874 13.731 93.8413 6.55688 88.3233 6.55688" stroke="white" stroke-width="3"/>
    <path d="M102.392 23.3713C102.392 28.1767 101.036 32.4622 98.9212 35.5057C96.8024 38.5547 94.0223 40.2425 91.1258 40.2425C88.2292 40.2425 85.4491 38.5547 83.3303 35.5057C81.2153 32.4622 79.8593 28.1767 79.8593 23.3713C79.8593 18.5659 81.2153 14.2803 83.3303 11.2368C85.4491 8.1878 88.2292 6.5 91.1258 6.5C94.0223 6.5 96.8024 8.1878 98.9212 11.2368C101.036 14.2803 102.392 18.5659 102.392 23.3713Z" stroke="white" stroke-width="3"/>
    <path d="M101.401 16.2096L111.365 21.8144C113.545 24.6168 113.545 27.4192 111.365 31.4671L98.9102 35.515" stroke="white" stroke-width="3"/>
    </g>
    <defs>
    <filter id="filter0_d_0_1" x="16.0964" y="37.3361" width="82.7902" height="109.664" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dx="2" dy="4"/>
    <feGaussianBlur stdDeviation="4"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape"/>
    </filter>
    <filter id="filter1_d_0_1" x="0.5" y="29.6494" width="58" height="53.3477" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="4"/>
    <feGaussianBlur stdDeviation="4"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape"/>
    </filter>
    <filter id="filter2_d_0_1" x="64.5" y="0.649414" width="58" height="53.3477" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="4"/>
    <feGaussianBlur stdDeviation="4"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape"/>
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
