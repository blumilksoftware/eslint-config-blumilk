import path from 'path'
import ora from 'ora'

let counter = 0

const spinner = ora()
const start = Date.now()

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
}

process.on('exit', (code) => {
  const diff = (((new Date()).getTime() - start) / 1000).toFixed(3)

  if (code === 0) {
    spinner.succeed(`Success, analyzed ${counter} files in ${diff} seconds`)
  } else {
    spinner.fail(`Failed, analyzed ${counter} files in ${diff} seconds`)
  }
})

const create = (context) => {
  counter++

  spinner.color = 'blue'
  spinner.text = `Processing: ${colors.green}${path.relative(context.cwd, context.filename)}${colors.reset} \n`
  spinner.render()

  return {}
}

export default { create }
