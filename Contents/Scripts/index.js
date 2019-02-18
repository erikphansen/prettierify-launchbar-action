import prettier from 'prettier/standalone';
import jsParsers from 'prettier/parser-babylon';
import cssParsers from 'prettier/parser-postcss';
import htmlParsers from 'prettier/parser-html';

// Language name, parser to use, icon prefix
const languageTypes = [
  ['JSON', 'json', 'json'],
  ['JavaScript', 'babel', 'js'],
  ['CSS', 'css', 'css'],
  ['Sass', 'scss', 'scss'],
  ['HTML', 'html', 'html'],
];

// This is the function that does all the work
// The settings object has the input to format and the parser (language type) to
// format the input as
export function format(settings) {
  let prettierrc = {};
  try {
    prettierrc = File.readJSON('~/.prettierrc');
  } catch (error) {}
  const formatted = prettier.format(settings.input, {
    ...prettierrc,
    parser: settings.parser,
    plugins: [jsParsers, cssParsers, htmlParsers],
  });
  // If SHIFT is held down when running the action, paste the formatted code
  // into the active app
  if (LaunchBar.options.shiftKey) {
    LaunchBar.paste(formatted);
  } else {
    return formatted;
  }
}

function promptForLanguageType(input) {
  return languageTypes.map(([title, parser, icon]) => ({
    title,
    action: 'format',
    actionArgument: { input, parser },
    icon: `${icon}-icon-Template`,
  }));
}

export function run(argument) {
  if (argument == undefined) {
    // Inform the user that there was no argument
    LaunchBar.alert('No argument was passed to the action');
  } else {
    // Ask the user which language the snippet is in
    return promptForLanguageType(argument);
  }
}
