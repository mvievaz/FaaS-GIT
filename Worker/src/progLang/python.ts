import { exec } from "child_process";

const localPATH: string = "./code/"

export function installDep(dependenceFile: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    exec(`cd ${localPATH} && pip install -r ${dependenceFile}`, (err, stdout, stderr) => {
      if (err) {
        reject(stderr)
      }
      else {
        resolve(stdout)
      }
    })
  })

}

export function execPython3(main: string, arg: string) {
  return new Promise<string>((resolve, reject) => {
    exec(`cd ${localPATH} && python3 ${main} ${arg}`, (err, stdout, stderr) => {
      if (err) {
        reject(stderr)
      }
      else {
        resolve(stdout)
      }
    })
  })
}

export function cleanPIP(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    exec(`pip freeze | xargs pip uninstall -y`, (err, stdout, stderr) => {
      if (err) {
        reject(stderr)
      }
      else {
        resolve(stdout)
      }
    })
  })
}