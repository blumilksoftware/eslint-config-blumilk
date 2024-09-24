import path from 'path'
import ora from 'ora'
import chalk from 'chalk'

const spinner = ora()
const start = (new Date).getTime()

let counter = 0
let bindExit = false

const create = (context) => {
  if (!bindExit) {
    process.on('exit', (code) => {
      const diff = (((new Date).getTime() - start)/1000).toFixed(3)

      if (code === 0) {
        spinner.succeed(`Success, analyzed ${counter} files in ${diff} seconds`)
      } else {
        spinner.fail(`Failed, analyzed ${counter} files in ${diff} seconds`)
      }
    })

    bindExit = true
  }

  counter++
  const relativeFilePath = path.relative(context.cwd, context.filename)

  spinner.color = 'blue'
  spinner.text = `Processing: ${chalk.green(relativeFilePath) } \n`
  spinner.render()

  return {}
}

export default { create }