import fs from 'fs'
import YAML from 'yaml'

// Speed up with dynamic programming - only fetch from file once
let cache = undefined

export function getData() {
    if (!cache) {
        // Get external data from the file system, API, DB, etc.
        const file = fs.readFileSync('./resources.yml', 'utf8')
        const data: object = YAML.parse(file)
        // The value of the `props` key will be
        //  passed to the `Home` component
        cache = Object.keys(data).map(key =>
            ({uuid: key, ...data[key]}) // ...data[key]
        )
    }
    return cache
}