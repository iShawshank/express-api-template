import { convertFromDirectory } from 'joi-to-typescript'
import fs from 'fs'
import path from 'path'

// Clear the output directory
const outputDirectory = './src/interfaces/joi-types'
console.log('[JOI-TYPES]: Clearing output directory...')
fs.rmSync(path.resolve(outputDirectory), { recursive: true, force: true })
console.log('[JOI-TYPES]: Output directory cleared.')

console.log('[JOI-TYPES]: Generating Joi Types...')
await convertFromDirectory({
  schemaDirectory: './src/schemas/',
  typeOutputDirectory: outputDirectory,
  debug: true,
})
console.log('[JOI-TYPES]: Joi Types Generated.')
