# 🧪 Labinsight (CLI)

A static code analysis tool designed to provide insights and improve the quality of web applications during development.

### [See official website](https://lab-insight.web.app)

## Features (v0.1+)

- [x] Project structure exploration
- [x] Automatic project type detection (Node.js, Angular, Stencil, etc.)
- [x] Custom configuration file '.labinsight'
- [x] Basic code analysis for common errors
  - [x] Casing
    - [x] camelCase
    - [ ] PascalCase
    - [ ] snake_case
  - [ ] Options
  - [x] Decorators (@IgnoreCasing)
- [ ] Deep code analysis for common errors detection
- [ ] Detailed reports generation (JSON, HTML, XML...)

[See the roadmap for more features](https://github.com/techfever-soft/labinsight-cli/blob/main/ROADMAP.md)

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