export interface JobQueue {
    [jobId: string]: {
      status: string;
      result?: any;
      startTime: number;
    };
  }
  
  export const jobQueue: JobQueue = {};