import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  line-height: 1.5;
  width: 360px;
  padding: 20px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif ;
  background-color: var(--bg-color-main) ;
}

h1 {
  font-size: 1.7rem;
  color: var(--font-color-heading);
}

:root {
  --bg-color-main: #FAFCFF;
  --bg-color-section: #FFFFFF;
  --bg-color-button: #05A6A6;
  --font-color-heading: #011F26;
  --font-color-content: #2C2727;
  --font-color-action: #FFFFFF;
  --font-color-label: #848588;
  --color-boxshadow: rgba(99, 93, 93, 0.25);
 }`;

export default GlobalStyles;
