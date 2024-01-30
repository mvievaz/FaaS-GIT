import { exec } from "child_process";


export function installDep(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    exec(`npm install`, (err, stdout, stderr) => {
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
    exec(`npm start`, (err, stdout, stderr) => {
      if (err) {
        reject(stderr)
      }
      else {
        resolve(stdout)
      }
    })
  })
}