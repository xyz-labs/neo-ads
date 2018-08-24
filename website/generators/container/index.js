/**
 * Container Generator
 */

module.exports = {
  description: 'Add a container component',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'Form',
  }],
  actions: (data) => {
    // Generate index.js, index.test.js and style.less

    const actions = [{
      type: 'add',
      path: '../src/containers/{{properCase name}}/index.js',
      templateFile: './container/index.js.hbs',
      abortOnFail: true,
    },
    {
      type: 'add',
      path: '../src/containers/{{properCase name}}/style.css',
      templateFile: './container/style.css.hbs',
      abortOnFail: true,
    }];


    return actions;
  },
};
