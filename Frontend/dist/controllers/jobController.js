"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendJob = void 0;
const sendJob = (req, res) => {
    // Simulate asynchronous job processing
    // setTimeout(() => {
    //   Job[jobId] = { status: 'completed', result: 'Job result', startTime };
    // }, 5000);
    // res.json({ jobId });
    console.log("hola");
};
exports.sendJob = sendJob;
// export const getJobStatus = (req: Request, res: Response) => {
//     const { jobId } = req.params;
//     const job = Job[jobId];
//     if (!job) {
//       return res.sendStatus(404);
//     }
//     const elapsedTime = Date.now() - job.startTime;
//     res.json({ status: job.status, result: job.result, elapsedTime });
// };
// export const listJobs = (req: ExtendedRequest, res: Response) => {
//     const user = req.user as { username: string };
//     const userJobs = Object.entries(Job)
//       .filter(([_, job]) => job.status !== 'completed')
//       .map(([jobId, job]) => ({ jobId, status: job.status }));
//     res.json({ user: user.username, jobs: userJobs });
// };
