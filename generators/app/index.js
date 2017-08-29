const Generator = require('yeoman-generator');
const path = require('path');
const mkdirp = require('mkdirp');
const glob = require('glob');

class GeneratorDaube extends Generator {

  prompting() {
    const done = this.async();

    return this.prompt(
      [
        {
          type: 'input',
          name: 'name',
          message: 'Element name',
          validate: str => /^([a-z])(?!.*[<>])(?=.*-).+$/.test(str),
        }, {
          type: 'input',
          name: 'version',
          message: 'Version number',
          default: '0.0.1',
        }, {
          type: 'input',
          name: 'description',
          message: 'Brief description of the element',
          default: 'A simple ' + this.appname + ' custom element provided by daubedesign',
        }, {
          type: 'input',
          name: 'author',
          message: 'Author of the element',
          default: 'Jeffrey B. Daube',
        }
      ]
    ).then(answers => {
      this.props = answers;
      done();
    });
  }

  default() {
    const { name } = this.props;

    if (path.basename(this.destinationPath()) !== name) {
      this.log(`Your component should be in a '${name}' folder, creating now...`);
      mkdirp(name);
      this.destinationRoot(this.destinationPath(name));
    }
  }
  writing() {
    const { name } = this.props;
    const { author } = this.props;

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this
    );
    this.fs.copyTpl(
      this.templatePath('custom-element.js'),
      this.destinationPath(`${name}.js`),
      this
    );
    this.fs.copyTpl(
      this.templatePath('gulpfile.js'),
      this.destinationPath(`gulpfile.js`),
      this
    );
    this.fs.copyTpl(
      glob.sync(this.templatePath('!(custom-element.js|package.json|gulpfile.js)'), { dot: true }),
      this.destinationPath(),
      this
    );
  }

  install() {
    this.installDependencies();
  }
}

module.exports = GeneratorDaube;