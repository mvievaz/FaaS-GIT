import { Request, Response } from 'express';
import { jobQueue } from '../models/jobQueueModel';

interface ExtendedRequest extends Request {
    user?: { username: string };
  }

export const sendJob = (req: Request, res: Response) => {
    const jobId = Math.random().toString(36).substring(7);
    const startTime = Date.now();
  
    jobQueue[jobId] = { status: 'in-progress', startTime };
  
    // Simulate asynchronous job processing
    setTimeout(() => {
      jobQueue[jobId] = { status: 'completed', result: 'Job result', startTime };
    }, 5000);
  
    res.json({ jobId });
};

export const getJobStatus = (req: Request, res: Response) => {
    const { jobId } = req.params;
    const job = jobQueue[jobId];
  
    if (!job) {
      return res.sendStatus(404);
    }

    const elapsedTime = Date.now() - job.startTime;
    res.json({ status: job.status, result: job.result, elapsedTime });
};

export const listJobs = (req: ExtendedRequest, res: Response) => {
    const user = req.user as { username: string };
    const userJobs = Object.entries(jobQueue)
      .filter(([_, job]) => job.status !== 'completed')
      .map(([jobId, job]) => ({ jobId, status: job.status }));
  
    res.json({ user: user.username, jobs: userJobs });
};