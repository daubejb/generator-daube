const Generator = require('yeoman-generator');
const path = require('path');
const mkdirp = require('mkdirp');
const glob = require('glob');

// function generateClassName(name) {
//   return name.split('-').reduce((previous, part) => {
//     return previous + part.charAt(0).toUpperCase() + part.slice(1);
//   }, '');
// }

class GeneratorDaube extends Generator {

  prompting() {
    const done = this.async();

    return this.prompt(
      [
        {
          type: 'input',
          name: 'name',
          message: 'Element name',
          default: this.appname,
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
          default: 'Jeffrey B. Daube <daubejb@gmail.com>',
        }
      ]
    ).then(answers => {
      this.props = answers;
      done();
    });
  }

  default() {
    const { name } = this.props;

    // this.props.class = generateClassName(name);

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
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      this
    );
    this.fs.copyTpl(
      this.templatePath('_custom-element.js'),
      this.destinationPath(`${name}.js`),
      this
    );
    this.fs.copyTpl(
      this.templatePath('_gulpfile.js'),
      this.destinationPath(`gulpfile.js`),
      this
    );
    this.fs.copyTpl(
      glob.sync(this.templatePath('!(_custom-element.js|_package.json|_gulpfile.js)'), { dot: true }),
      this.destinationPath(),
      this
    );
  }

  install() {
    this.installDependencies();
  }
}

module.exports = GeneratorDaube;