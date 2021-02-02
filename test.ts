import { buildJsonSchemas } from './index'
import * as path from 'path'

const ret = buildJsonSchemas(path.join(__dirname, 'src/models'))

console.log(JSON.stringify(ret, null, 2))