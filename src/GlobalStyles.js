import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  line-height: 1.5;
  max-width: 500px;
  padding: 20px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif ;
  background-color: var(--bg-color-main) ;
}

h1 {
  font-size: 1.7rem;
  color: var(--font-color-heading);
  margin-bottom: 20px;
}

:root {
  --bg-color-main: #FAFCFF;
  --bg-color-section: #FFFFFF;
  --font-color-heading: #011F26;
  --font-color-content: #2C2727;
 }`;

export default GlobalStyles;
