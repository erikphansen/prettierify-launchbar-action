# Prettierify LaunchBar action

This is a LaunchBar action that formats code snippets using [Prettier](https://prettier.io).

## Motivation

From time to time I find myself needing to past arbitrary snippets of code (JSON usually) into Slack and want it to be nicely formatted before I do. My usual workflow for this is to paste it in a new VSCode doc, set the language mode, run the formatter, copy the formatted selection, and then paste it into Slack.

Now I can copy the poorly formatted text, run it through this action, and paste it right back where I copied it from.

## Usage

1. Get the text you want to format into LaunchBar, either via [Instant Send](https://www.obdev.at/resources/launchbar/help/InstantSend.html) or via the clipboard history.
2. Hit `tab`, start typing `prettierify`, and hit `enter` on the Prettierify action.
3. Select the language you want to format your text as.
4. You now have two options. If you just hit `enter`, your formatted text will be returned to LaunchBar as a series of items, one for each line in your formatted text. But since you'll likely want to paste the entire formatted text somewhere, you can instead hit `shift-enter` to paste the text in the active app.

## Notes

- If you have a `.prettierrc` file in your home directory, this action will format text with the prefs you've set there. Otherwise it will use the Prettier defaults.

## Installation

Clone this repo into your LaunchBar actions directory and give it a `.lbaction` extension. For example:

```sh
cd ~/Library/Application\ Support/LaunchBar/Actions
git clone git@github.com:erikphansen/launchbar-prettierify.git prettierify.lbaction
```
