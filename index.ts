import * as TJS from 'typescript-json-schema'
import * as readDirFilenames from 'read-dir-filenames'
import * as path from 'path'

const settings: TJS.PartialArgs = {
  required: true
}

const compilerOptions: TJS.CompilerOptions = {
  strictNullChecks: true
}

const basePath: string = process.cwd()

const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const buildJsonSchemas = (interfaceModelsPath: string) => {
  const filepaths: string[] = readDirFilenames(interfaceModelsPath)
  return filepaths.reduce((acc, filepath) => {
    if (!filepath.endsWith('ts')) {
      return acc
    }
    const program = TJS.getProgramFromFiles(
      [filepath],
      compilerOptions,
      basePath
    )
    const modelName: string = capitalize(path.basename(filepath).split('.')[0])
    return {
      ...acc,
      [modelName]: TJS.generateSchema(program, modelName, settings)
    }
  }, {})
}