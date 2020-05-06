import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { resolve } from 'path'
import * as TJS from 'typescript-json-schema'
import parseArgs from 'minimist'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import tsConfig from './tsconfig.schemaGenerator.json'

// via cli: typescript-json-schema ./tsconfig.json CookieBanner --include "./src/CookieBanner/index.tsx" --required

const start = new Date()

const getJsonSchema = (file: string, type: string): TJS.Definition | null => {
    // optionally pass argument to schema generator
    const settings: TJS.PartialArgs = {
        required: true,
        include: [file],
        validationKeywords: ['defaultValue', 'deprecated', 'signature'],
    }

    const program = TJS.getProgramFromFiles([resolve(file)], tsConfig.compilerOptions)

    const generator = TJS.buildGenerator(program, settings)

    if (generator) {
        // Get symbols for different types from generator.
        return generator.getSchemaForSymbol(type)
    }

    throw new Error('no generator')
}

const { file, type, out, force } = parseArgs(process.argv.slice(2))

if (typeof file !== 'string') {
    throw new Error('file option is required and must be a string...')
}

if (typeof type !== 'string') {
    throw new Error('type option is required and must be a string...')
}

const ensureDirectoryExistence = (filePath: string): void | true => {
    const dirPath = filePath.substring(0, filePath.lastIndexOf('/'))

    if (!existsSync(dirPath)) {
        if (force) {
            mkdirSync(dirPath, { recursive: true })
        } else {
            throw new Error('use --force flag to recursively create folders when not existent')
        }
    }
}

const schema = getJsonSchema(file, type)

const requiredProps: { [key: string]: any } = {}
const optionalProps: { [key: string]: any } = {}

const setPropsFromDefinition = (typeDef: TJS.Definition): void => {
    const required = typeDef.required || []
    const props = typeDef.properties || {}

    const propNames = Object.keys(props)
    propNames.forEach(prop => {
        if (required.includes(prop)) {
            // set required props
            requiredProps[prop] = props[prop]
        } else {
            // set optional props
            optionalProps[prop] = props[prop]
        }
    })
}

if (schema) {
    const { allOf, type, properties } = schema
    if (allOf) {
        allOf.forEach(typeDef => {
            if (typeof typeDef !== 'boolean') {
                setPropsFromDefinition(typeDef)
            }
        })
    } else if (type === 'object' && properties) {
        setPropsFromDefinition(schema)
    }
}

const result = {
    requiredProps,
    optionalProps,
}

if (typeof out === 'string') {
    // TODO: check if exists and require recursive flag if not to create folders
    if (!out.endsWith('.json')) {
        throw new Error('out must be a .json file')
    }
    const filePath = resolve(out)
    ensureDirectoryExistence(filePath)
    writeFileSync(filePath, JSON.stringify(result, null, 4), { encoding: 'utf8' })
    console.log(`file written to: ${filePath}`)
} else {
    console.log(JSON.stringify(result, null, 4))
}

const end = new Date().getTime() - start.getTime()
console.info('Execution time: %dms', end)
