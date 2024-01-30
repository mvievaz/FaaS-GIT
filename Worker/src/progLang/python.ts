import { exec } from "child_process";


export function installDep(dependenceFile: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    exec(`pip install -r ${dependenceFile}`, (err, stdout, stderr) => {
      if (err) {
        reject(stderr)
      }
      else {
        resolve(stdout)
      }
    })
  })

}

export function execPython3(main: string, env: string) {
  return new Promise<string>((resolve, reject) => {
    exec(`python3 ${main} ${env}`, (err, stdout, stderr) => {
      if (err) {
        reject(stderr)
      }
      else {
        resolve(stdout)
      }
    })
  })
}