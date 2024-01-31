import { Request, Response } from 'express';
import { Job, addJob, getJob, getJobsByUser } from '../models/jobModel';
import { v4 as uuidv4 } from 'uuid';
import { Observer } from '../models/userModel&Observer';


function isValidURL(url: string): boolean {
  const pattern = /^(https?:\/\/)?([\w\d.-]+)\.([a-z]{2,})(:\d{1,5})?(\/\S*)?$/i;
  return pattern.test(url);
}

interface ExtendedRequest extends Request{
  email?: string; // Define the 'email' property as optional
}

export const sendJob = async (req: ExtendedRequest, res: Response) => {
  try {
    if (!req.body || typeof req.body.URL !== 'string') {
      throw new Error('URL of the git repository not found.Make sure to pass the git url via a field in the body called \'URL\' ');
    }
    const gitURL = req.body.URL;
    if (!isValidURL(gitURL)){
      throw new Error('URL of the git repository not valid ');
    }
    const email = req.email
    if (email === undefined) {
      throw new Error('There is no Email');
    }
    const jobID = uuidv4();

    const job: Job = {
      jobID: jobID,
      status: 'pending',
      userID: email,
      url: gitURL,
      elapsedTime: 0,
      name: req.body.name
    }
    // Add job to JobsQueue and add it to the jobsRelatedToUser
    addJob(jobID, job);

    console.log('Job added:', job);

    res.status(200).json({message: `job added to the queue, with ID = ${jobID}`, data: { gitURL } });
  } catch (error) {
      console.error('Error extracting gitURL:', error);
      res.status(400).json({error: error });
  }
};

export const getJobStatus = async (req: ExtendedRequest, res: Response) => {
    try {
      if (!req.body || typeof req.body.jobID !== 'string') {
        throw new Error('Pass a valid jobID type String');
      }
      const jobIDRequested = req.body.jobID;
      const email = req.email;
      if (email === undefined) {
        throw new Error('There is no Email');
      }
      const jobRequested = getJob(jobIDRequested)
      if(jobRequested === undefined){
        throw new Error('There is no job with this jobID');
      }
      res.send(jobRequested?.status)
    } catch (error) {
      console.error('Error getting the job:', error);
      res.status(400).json({error: error });
    }
  };

  export const getJobResult = async (req: ExtendedRequest, res: Response) => {
    try {
      if (!req.body || typeof req.body.jobID !== 'string') {
        throw new Error('Pass a valid jobID type String');
      }
      const jobIDRequested = req.body.jobID;
      const email = req.email;
      if (email === undefined) {
        throw new Error('There is no Email');
      }
      const jobRequested = getJob(jobIDRequested)
      if(jobRequested === undefined){
        throw new Error('There is no job with this jobID');
      }
      res.send(jobRequested?.result)
    } catch (error) {
      console.error('Error getting the job:', error);
      res.status(400).json({error: error });
    }
  };

  export const getJobs = async (req: ExtendedRequest, res: Response) => {
    try {
      const jobIDRequested = req.body.jobID;
      const email = req.email;
      if (email === undefined) {
        throw new Error('There is no Email');
      }
      const jobList = getJobsByUser(email)
      res.send(jobList)
    } catch (error) {
      console.error('Error getting the jobs:', error);
      res.status(400).json({error: error });
    }
  };

  

  export const getObserverStats = async (req: ExtendedRequest, res: Response) => {
    try {
      const jobIDRequested = req.body.secret;
      const email = req.email;
      if (jobIDRequested !== "adminSecret1234") {
        throw new Error('Wrong Password');
      }
      res.send(Observer)
    } catch (error) {
      console.error('Error getting the observerStats:', error);
      res.status(400).json({error: error });
    }
  };