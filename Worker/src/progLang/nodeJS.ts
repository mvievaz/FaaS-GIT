import { exec } from "child_process";


const localPATH: string = "./code/"

export function installDep(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    exec(`cd ${localPATH} && npm install`, (err, stdout, stderr) => {
      if (err) {
        reject(stderr)
      }
      else {
        resolve(stdout)
      }
    })
  })

}

export function execTS() {
  return new Promise<string>((resolve, reject) => {
    exec(`cd ${localPATH} && npm start`, (err, stdout, stderr) => {
      if (err) {
        reject(stderr)
      }
      else {
        resolve(stdout)
      }
    })
  })
}