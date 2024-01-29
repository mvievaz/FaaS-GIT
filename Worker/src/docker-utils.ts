import fs from 'fs'
import axios from "axios"

var containerID: string
const dockerURL: string = "http://localhost:2375/v1.43";

export async function CreateImage(imageName: string, tarFile: string): Promise<string> {

  const apiURL = dockerURL + '/build?t=' + imageName;
  try {
    const response = await axios.post(apiURL, fs.readFileSync(tarFile), {
      headers: { 'Content-Type': 'application/tar' },
    });
    return response.data
  } catch (e: any) {
    return e
  }
}

export async function CreateContainer(imageName: string, env: string[]): Promise<string> {

  const apiURL = dockerURL + '/containers/create?name=' + imageName;
  try {
    const response = await axios.post(apiURL, { 'Image': imageName, 'Env': env }, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data.Id
  } catch (e: any) {
    return e
  }
}

export async function RunContainer(): Promise<string> {

  const apiURL = dockerURL + '/containers/' + containerID + '/start';
  try {
    const response = await axios.post(apiURL, "", {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data
  } catch (e: any) {
    return e
  }
}

export async function LogsContainers() {
  const apiURL = dockerURL + '/containers/' + containerID + '/logs?timestamps=true&stdout=true'
  try {
    const response = await axios.get(apiURL, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(await response.data);
  } catch (e) {
    console.error('Error making API call:', e);
  }
}

