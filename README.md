# Recommendation Widget

## Overview
The Recommendation Widget is a web component designed to provide personalized recommendations.

## Prerequisites
- **Make sure you have a VPN connected to USA!**
  
## Features
- Dynamic loading of recommendation items.
- Place widget where ever you want on page (using divId).
- Responsive design for optimal viewing on all devices.

## Getting Started

### Integrating the Widget
To integrate the widget into your webpage:
Include the widget's script tag in your HTML body:
   ```html
    <script id="scr" div-id="rcm-main" type="module" src="https://evyatar-menczer.github.io/recommendations-widget/src/scripts/main.js"></script>
   ```
   If you wish to display the widget in a specific div, specify the id of the div in ```div-id``` attribute.
   If no divId specified, it will be attached to the end of the document.

   
### Running the Widget Locally

To run the widget on your local machine:
1. Start the server:
   ```sh
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000` (or the port provided in the console).
   

   

## Running Tests

### Unit Tests

To run the unit tests:
First install package.json for hest and other test libraries:
```sh
npm install
```
Then run the tests:
```sh
npm run test
```
