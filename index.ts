import * as fs from 'fs'

const NAMES = ['alfred', 'alfie', 'alfie']

function solve(names: string[]): string[] {
    const setPrefix: Set<string> = new Set()
    const mapName: Map<string, number> = new Map()
    const groupNames = []

    for (const [index, name] of names.entries()) {
        if (mapName.has(name)) {
            // if name existed, increase count
            mapName.set(name, mapName.get(name) + 1)
            groupNames.push(`${name} ${mapName.get(name)}`)
        } else {
            mapName.set(name, 1)
            let lastChar = ''
            let inserted = false
            for (const c of name.split('')) {
                lastChar += c
                // check if last char not inserted and set last char not existed
                if (!inserted && !setPrefix.has(lastChar)) {
                    groupNames.push(lastChar)
                    inserted = true
                }
                setPrefix.add(lastChar)
            }
            // last char === name and not inserted
            if (!inserted) {
                groupNames.push(lastChar)
            }
        }
    }

    return groupNames
}

function readDataFromFile(path: string): string[] {
    const res: string[] = []
    try {
        const data = fs.readFileSync(path, 'utf8');
        const lines = data.split(/\r?\n/)
        for (const l of lines) {
            if (!l) {
                continue
            }
            res.push(l.toString())
        }
    } catch (e) {
        console.log('Error:', e.stack)
    }
    return res
}

function equals(a: string[], b: string[]) {
    return a.length === b.length &&
        a.every((v, i) => v === b[i])
}

function main() {
    const i2 = readDataFromFile('./test/input_2.txt')
    const o2 = readDataFromFile('./test/output_2.txt')
    const res2 = solve(i2)
    console.log(`Test case 2 passed: ${equals(o2, res2)}`)

    const i3 = readDataFromFile('./test/input_3.txt')
    const o3 = readDataFromFile('./test/output_3.txt')
    const res3 = solve(i3)
    console.log(`Test case 3 passed: ${equals(o3, res3)}`)

    const i4 = readDataFromFile('./test/input_4.txt')
    const o4 = readDataFromFile('./test/output_4.txt')
    const res4 = solve(i4)
    console.log(`Test case 4 passed: ${equals(o4, res4)}`)

    const i9 = readDataFromFile('./test/input_9.txt')
    const o9 = readDataFromFile('./test/output_9.txt')
    const res9 = solve(i9)
    console.log(`Test case 9 passed: ${equals(o9, res9)}`)
    // console.log((res || []).join('\n'))
}

main()