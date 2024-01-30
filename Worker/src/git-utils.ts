import { simpleGit, SimpleGit } from 'simple-git';
const git: SimpleGit = simpleGit()

const localPATH: string = "./code/"

export function downloadGIT(gitURL: string) {
    git.clone(gitURL, localPATH).then(
        () => {
            console.log("Repo downloaded")
        }
    ).catch(
        (reason: any) => { console.log("Error downloading git") }
    )
}

export function clearGIT() {

}