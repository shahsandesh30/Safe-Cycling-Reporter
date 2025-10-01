# Safe Cycling App

## Overview
The Safe Cycling App is designed to help users report hazards encountered while cycling. It utilizes AI to classify hazards based on user input and images, providing a streamlined process for submitting reports to local councils.

## Project Structure
```
safe-cycling-app
├── src
│   ├── assets
│   │   └── styles
│   │       ├── dashboard.css
│   │       └── reporter.css
│   ├── js
│   │   ├── api.js
│   │   ├── classifier.js
│   │   ├── dashboard.js
│   │   └── reporter.js
│   ├── pages
│   │   ├── dashboard.html
│   │   └── index.html
│   └── utils
│       └── storage.js
├── package.json
└── README.md
```

## Features
- **Hazard Reporting**: Users can upload images and provide details about hazards.
- **AI Classification**: The app uses AI to classify hazards and determine their severity.
- **Dashboard**: A dashboard displays submitted reports and key performance indicators (KPIs).

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd safe-cycling-app
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Usage
- Open `src/pages/index.html` in a web browser to access the reporter page.
- After submitting a report, navigate to `src/pages/dashboard.html` to view the dashboard with submitted reports.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.