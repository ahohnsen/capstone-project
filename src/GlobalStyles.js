import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  line-height: 1.5;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif ;
  background-color: var(--bg-color-main);
}

main {
  width: 360px;
  padding: 50px 20px 20px;
  margin: 0 auto;
  overflow-y: scroll;
}

input {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif ;
  color: var(--font-color-content);
  font-size: 1rem;
}

textarea {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif ;
  color: var(--font-color-content);
  font-size: 1rem;
}

h1 {
  font-size: 1.5rem;
  font-weight: 400; 
  color: var(--font-color-header);
  text-align: center;
  padding: 15px;
}

:root {
  --bg-color-main: #FAFCFF;
  --bg-color-section: #FFFFFF;
  --bg-color-button: #05A6A6;
  --bg-color-header: #071359;
  --font-color-header: #FFFFFF;
  --font-color-heading: #011F26;
  --font-color-content: #2C2727;
  --font-color-action: #FFFFFF;
  --font-color-label: #848588;
  --color-boxshadow: rgba(99, 93, 93, 0.25);
  --color-inactive: #011F26;
  --color-active: #03318C;
 }`;

export default GlobalStyles;
