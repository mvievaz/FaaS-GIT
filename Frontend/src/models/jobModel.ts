export interface Job {
    [jobId: string]: {
      status: string;
      result?: any;
      userID: string;
      elapsedTime: number;
    };
  }

export const Job: Job = {};