#!/usr/bin/env node

const packages = JSON.parse(require('fs').readFileSync('package.json'))

const wrong = Object.entries(packages.peerDependencies).reduce((acc, [project, version]) => {
    const dev = packages.devDependencies[project]
    if (dev !== version) {
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
