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
    // Generate index.js, style.css

    const actions = [{
      type: 'add',
      path: '../src/containers/{{properCase name}}/{{properCase name}}.js',
      templateFile: './container/index.js.hbs',
      abortOnFail: true,
    },
    {
      type: 'add',
      path: '../src/containers/{{properCase name}}/{{properCase name}}.css',
      templateFile: './container/style.css.hbs',
      abortOnFail: true,
    }];


    return actions;
  },
};
