import { simpleGit, SimpleGit } from 'simple-git';
import * as fs from 'fs';
const git: SimpleGit = simpleGit()

const localPATH: string = "./code/"

export function downloadGIT(gitURL: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        console.log("GitURL:" + gitURL)
        git.clone(gitURL, localPATH).then(
            () => {
                resolve("Repo downloaded")
            }
        ).catch(
            (reason: any) => {
                console.log("Error downloading repo")
                reject(`Error downloading repo ${localPATH}, ERROR: ${reason}`)
            }
        )
    })
}

export function clearGIT(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        fs.rm(localPATH, { recursive: true, }, (error) => {
            if (error) {
                reject(error)
            }
            else {
                resolve("GIT cleared")
            }
        })
    })
}