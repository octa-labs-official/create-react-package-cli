# Create React Package

`create-react-package` is a CLI tool designed to simplify the creation of new React component projects. It sets up a new project by cloning a predefined template, customizing the `package.json`, and installing dependencies, making it easy to start developing immediately.

## Features

- Clones a React project template.
- Customizes project details via an interactive CLI.
- Sets up `package.json` with user-defined configurations.
- Automatically installs all dependencies.

## Prerequisites

Before you begin, ensure you have Node.js installed on your system. You can download it from [Node.js official website](https://nodejs.org/).

## Usage
To create a new React component project, run:

```bash
npx @octa-labs/create-react-package my-react-component
```

Follow the interactive prompts to enter:
- Package version
- Repository URL
- Keywords (comma-separated)
- Author name
- License

## How It Works

- **Project Creation**: The tool clones a template from a specified GitHub repository.
- **Configuration**: It prompts you to enter project details which are then used to update the package.json.
- **Dependency Installation**: Automatically installs all required dependencies.

## Contributing
Contributions are welcome! Please fork the repository and submit pull requests with your proposed changes.

## License
Distributed under the MIT License. See LICENSE for more information.
