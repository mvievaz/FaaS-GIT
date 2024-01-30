import { exec } from "child_process";

const localPATH: string = "./code/"

export function execRust(arg: string) {
    return new Promise<string>((resolve, reject) => {
        exec(`cd ${localPATH} && cargo run ${arg}`, (err, stdout, stderr) => {
            if (err) {
                reject(stderr)
            }
            else {
                resolve(stdout)
            }
        })
    })
}