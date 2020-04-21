#!/usr/bin/env node
const semver = require('semver')

const packages = JSON.parse(require('fs').readFileSync('package.json'))

const wrong = Object.entries(packages.peerDependencies).reduce((acc, [project, version]) => {
    const dev = packages.devDependencies[project]

    if (!semver.satisfies(dev.replace('^', ''), version)) {
        acc.push(
            `${project} has version mismatch in devDependencies (${dev}) and peerDependencies (${version})`
        )
    }
    return acc
}, [])

if (wrong.length) {
    console.error(wrong.join('\n'))
    process.exit(1)
}
