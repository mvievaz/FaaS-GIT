import { connect, StringCodec } from "nats"

export interface Job {
      jobID: string;
      status: string;
      url: string;
      result?: any;
      userID: string | undefined;
      elapsedTime: number;
      name?: string;
}

export interface JobQueue {
  [jobId: string]: Job;
}

export const JobQueue: JobQueue = {};

export async function addJob(jobId: string, job: Job): Promise<void> {

  JobQueue[jobId] = job;

  const sc = StringCodec();

  let nc = await connect({ servers: ['nats://nats:4222', 'nats://nats-1:4222', 'nats://nats-2:4222']})

  nc.publish("WorkerQueue", sc.encode(JSON.stringify(job)))
  
  nc.flush();
  nc.close();

}

//Retrieving a job from the dictionary
export function getJob(jobId: string): Job | undefined {
  return JobQueue[jobId];
}

//Removing a job from the dictionary
export function removeJob(jobId: string): void {
  delete JobQueue[jobId];
}

//Get jobs by userID
export function getJobsByUser(userID: string): Job[]{
  let jobsList = Object.values(JobQueue);
  return jobsList.filter(job => job.userID === userID);
}