import { simpleGit, SimpleGit } from 'simple-git';
import * as fs from 'fs';
const git: SimpleGit = simpleGit()

const localPATH: string = "./code/"

export function downloadGIT(gitURL: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        git.clone(gitURL, localPATH).then(
            () => {
                console.log("Repo downloaded")
                resolve("Repo downloaded")
            }
        ).catch(
            (reason: any) => {
                console.log("Error downloading git")
                reject(`Error downloading repo ${localPATH}, ERROR: ${reason}`)
            }
        )
    })
}

export function clearGIT(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        fs.rm(localPATH, { recursive: true, }, (error) => {
            if (error) {
                console.log("Error clearing git");
                reject(error)
            }
            else {
                console.log("GIR cleared");
                resolve("GIT cleared")
            }
        })
    })
}