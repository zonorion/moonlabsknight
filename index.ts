const NAMES = ['alfred', 'alfie', 'alfie']

function solve(names: string[]) : string[] {
    const groupNames = []

    //map prefix and count
    const mapPrefix: Map<string, number> = new Map()

    for (const [index, name] of names.entries()) {
        let chars = name.split('')
        // last char in loop of chars
        let lastChar = ''
        // check prefix available
        let prefixAvail = ''
        for (const c of chars) {
            lastChar = lastChar + c
            if (!mapPrefix.has(lastChar)) {
                // check map prefix not exist last char
                mapPrefix.set(lastChar, 1)
                if (!prefixAvail) {
                    prefixAvail = lastChar
                }
            } else {
                // if  all char of name existed
                if (lastChar === name) {
                    // increase count of last char
                    mapPrefix.set(lastChar, mapPrefix.get(lastChar) + 1)
                    prefixAvail = `${name} ${mapPrefix.get(lastChar)}`
                }
            }
        }
        groupNames.push(prefixAvail)
    }

    return groupNames
}

function main() {
    const res = solve(NAMES)
    console.log((res || []).join('\n'))
}

main()