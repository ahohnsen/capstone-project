import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  line-height: 1.5;
}

:root {
  --bg-color-main: #FAFCFF;
  --bg-color-section: #FFFFFF;
  --bg-color-action: #05A6A6;
  --bg-color-header: #071359;
  --bg-color-form: rgba(6, 95, 110, 0.7);
  --font-color-header: #FFFFFF;
  --font-color-heading: #011F26;
  --font-color-sub-heading: #635D5D;
  --font-color-content: #2C2727;
  --font-color-action: #FFFFFF;
  --font-color-label: #848588;
  --color-boxshadow: rgba(99, 93, 93, 0.25);
  --color-inactive: #011F26;
  --color-active: #03318C;
 }

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif ;
  background-color: var(--bg-color-main);
}

input, textarea {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif ;
  color: var(--font-color-content);
  font-size: 1rem;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
`;

export default GlobalStyles;
