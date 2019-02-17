import prettier from 'prettier/standalone';
import plugins from 'prettier/parser-babylon';

let input;

export function format(settings) {
  // return parser;
  return prettier.format(settings.input, {
    singleQuote: true,
    parser: settings.parser,
    plugins: [plugins],
  });
}

function promptForLanguageType(input) {
  return [
    {
      title: 'JavaScript',
      action: 'format',
      actionArgument: {input, parser: 'babel'},
    },
    {
      title: 'JSON',
      action: 'format',
      actionArgument: {input, parser: 'json'},
    },
  ];
}

export function run(argument) {
  if (argument == undefined) {
    // Inform the user that there was no argument
    LaunchBar.alert('No argument was passed to the action');
  } else {
    // Return a single item that describes the argument
    return promptForLanguageType(argument);
  }
}
