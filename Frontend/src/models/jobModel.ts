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

export function addJob(jobId: string, job: Job): void {
  JobQueue[jobId] = job;
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