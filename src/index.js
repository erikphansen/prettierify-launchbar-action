import prettier from 'prettier/standalone';
import jsParsers from 'prettier/parser-babylon';
import cssParsers from 'prettier/parser-postcss';
import htmlParsers from 'prettier/parser-html';

// Language name, parser to use, icon file name.
const supportedLanguages = [
  { title: 'JSON', parser: 'json', icon: 'json-icon-Template' },
  { title: 'JavaScript', parser: 'babel', icon: 'js-icon-Template' },
  { title: 'CSS', parser: 'css', icon: 'css-icon-Template' },
  { title: 'Sass', parser: 'scss', icon: 'scss-icon-Template' },
  { title: 'HTML', parser: 'html', icon: 'html-icon-Template' },
];

/**
 * The function that handles the formatting. Because it's called via a LaunchBar
 * item, it can only accept a single argument. The arg will contain the text to
 * format as well as the language we want to format the text as.
 *
 * @export
 * @param {Object} options - formatting options
 * @param {string} options.input - the string to format
 * @param {string} options.parser - the parser for Prettier to use
 * @returns - either returns the formatted text or pastes the formatted text and
 * exits
 */
export function format(options) {
  let prettierrc = {};
  try {
    prettierrc = File.readJSON('~/.prettierrc');
  } catch (error) {}
  const formatted = prettier.format(options.input, {
    ...prettierrc,
    parser: options.parser,
    plugins: [jsParsers, cssParsers, htmlParsers],
  });
  // If SHIFT is held down when running the action, paste the formatted code
  // into the focused window
  if (LaunchBar.options.shiftKey) {
    LaunchBar.paste(formatted);
  } else {
    return formatted;
  }
}

/**
 * Returns an array of LaunchBar items representing the list of languages the
 * user can format their snippet as.
 *
 * @param {string} input - The text to format
 * @returns {Object[]} - An array of objects for LaunchBar to display to the
 * user. The possible values for these objects are described in the LB6
 * developer docs:
 * https://developer.obdev.at/launchbar-developer-documentation/#/script-output
 */
function promptForLanguageType(input) {
  return supportedLanguages.map(({title, parser, icon}, index) => ({
    title,
    action: 'format',
    actionArgument: { input, parser },
    icon,
    badge: `${index + 1}`,
  }));
}

/**
 * The default LaunchBar action
 *
 * @export
 * @param {string} argument - The text to format
 * @returns - A list of languages the text can be formatted as
 */
export function run(argument) {
  if (argument == undefined) {
    // Inform the user that there was no argument
    LaunchBar.alert(
      'No argument was passed to the action',
      'Please provide some code for this action to format with Prettier',
    );
  } else {
    // Ask the user which language the snippet is in
    return promptForLanguageType(argument);
  }
}
