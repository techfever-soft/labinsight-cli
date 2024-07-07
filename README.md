# 🧪 Labinsight (CLI)

A static code analysis tool designed to provide insights and improve the quality of web applications during development.

### [Homepage](https://lab-insight.web.app)

## Features

- [x] Project structure exploration
- [x] Automatic project type detection (Node.js, Angular, React, etc.)
- [x] Custom configuration file '.labinsight'
- [x] Basic code analysis for common errors
  - [x] Casing
    - [x] camelCase
    - [x] PascalCase
    - [ ] snake_case
  - [ ] Rules
  - [ ] Options
  - [ ] Checking
  - [ ] Decorators
- [ ] Deep code analysis for error detection
- [ ] Coding conventions validation (linting)
- [ ] Detailed reports generation (JSON, HTML, XML...)

[See the roadmap for more features](ROADMAP.md)

## Installation

To install Labinsight, use npm:

```bash
npm install -g @techfever/labinsight-cli
```

## Usage
```bash
labinsight init
```
To initialize a new .labinsight file in your current working directory. 
It automatically detects your project's configuration.

```bash
labinsight analyze
```
To check/validate your codebase in a single command.


## Contributing
We welcome contributions to Labinsight ! To contribute:

- Fork the repository.
- Create a new branch (git checkout -b feature/awesome-feature).
- Make your changes.
- Commit your changes (git commit -am 'Add awesome feature').
- Push to the branch (git push origin feature/awesome-feature).
- Open a pull request.
  Please ensure your pull request adheres to the code of conduct.

## License
This project is licensed under the MIT License - see the LICENSE file for details.