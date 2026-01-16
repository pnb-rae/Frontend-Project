const { readdirSync } = require('fs')
const { resolve } = require('path')

const isDirEmpty = (directory, subdirectory) => {
  const path = resolve(directory, subdirectory)
  return readdirSync(path).length === 0
}

const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter(
      (dirent) => dirent.isDirectory() && !isDirEmpty(source, dirent.name)
    )
    .map((dirent) => dirent.name)

const foreachChallenge = (command) => {
  return ['.']
    .concat(getDirectories('challenges'))
    .filter((dir) => dir != 'images')
    .map((dir) => command.replaceAll('DIRECTORY', dir))
}

const watch = process.argv.slice(2) == '--watch'

const commands = []
  .concat(foreachChallenge('mkdir -p public/DIRECTORY'))
  .concat(
    foreachChallenge(
      'npx cpx-fixed "challenges/DIRECTORY/**/*.{html,ico,jpg,png,svg,webmanifest}" public/DIRECTORY/' +
        (watch ? ' --watch' : '')
    )
  )
  .concat(
    foreachChallenge(
      'npx tailwindcss -c challenges/DIRECTORY/tailwind.config.js -i challenges/DIRECTORY/style.css -o public/DIRECTORY/style.css' +
        (watch ? ' --watch' : '')
    )
  )
  .join(watch ? ' & ' : ' && ')

const { exec, execSync } = require('child_process')

var shell = (cmd) => {
  if (watch) {
    /*
     * Enables waiting for long-running commands and
     * printing their output to the console.
     * See https://stackoverflow.com/a/38317377/920303
     */
    let child = exec(cmd)
    child.stdout.removeAllListeners('data')
    child.stderr.removeAllListeners('data')
    child.stdout.pipe(process.stdout)
    child.stderr.pipe(process.stderr)
  } else {
    execSync(cmd, { encoding: 'utf8' })
  }
}

shell(commands)
