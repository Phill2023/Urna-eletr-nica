import fs from "fs/promises"

export function registerLog(username, type) {
    fs.readFile('./auditoria.json', 'utf8', (err, data) => {
        const date = new Date()
        const createdAt = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`

        if (err) {
            console.log(err)

            return;
        }

        const log = JSON.parse(data)
        // console.log(log)

        log.push({
            username,
            createdAt,
            functionality: type === 1 ? "RF 01 Pesquisa de candidatos" : "RF 02 Confirmação do voto"
        })

        fs.writeFile('./auditoria.json', JSON.stringify(log, null, 2), 'utf8', (err) => console.log(err))
    })
}