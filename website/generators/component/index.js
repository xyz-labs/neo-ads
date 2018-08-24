/**
 * Component Generator
 */

module.exports = {
  description: 'Add a presentation component',
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
      path: '../src/components/{{properCase name}}/{{properCase name}}.js',
      templateFile: './component/index.js.hbs',
      abortOnFail: true,
    }, 
    {
      type: 'add',
      path: '../src/components/{{properCase name}}/{{properCase name}}.css',
      templateFile: './component/style.css.hbs',
      abortOnFail: true,
    }];


    return actions;
  },
};
