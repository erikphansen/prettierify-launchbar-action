import prettier from 'prettier/standalone';
import jsParsers from 'prettier/parser-babylon';

/**
 * The default LaunchBar action
 *
 * @export
 * @param {string} argument - The text/code to format
 * @returns - A formatted version of the text/code
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
    let prettierrc = {};
  try {
    prettierrc = File.readJSON('~/.prettierrc');
  } catch (error) {}
  const formatted = prettier.format(argument, {
    ...prettierrc,
    parser: 'json',
    plugins: [jsParsers],
  });
  // If SHIFT is held down when running the action, paste the formatted code
  // into the focused window
  if (LaunchBar.options.shiftKey) {
    LaunchBar.paste(formatted);
  } else {
    return formatted;
  }
  }
}
