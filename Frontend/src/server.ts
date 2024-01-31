import express from 'express';
import routes from './routes/apiRoutes';
import { connect, StringCodec } from "nats"
import { Job, JobQueue } from './models/jobModel'
import { Observer } from './models/userModel&Observer';

const app = express();
app.use(express.json());
// Mount routes
app.use('/', routes);

const PORT = process.env.PORT || 3000;

//Subscribe to the NATS QUEUE
async function subscribeResult(){
    try {
  
        const sc = StringCodec();
  
        let nc = await connect({ servers: ['nats://nats:4222', 'nats://nats-1:4222', 'nats://nats-2:4222']})

        const sub = nc.subscribe("ResultQueue", {
            callback: (err, msg) => {
                if (err) {
                    console.log(err.message)
                } else {
                    let job = JSON.parse(sc.decode(msg.data))
                    console.log(job)
                    if(job.status === 'working') JobQueue[job.jobID].status = `working`
                    else{
                        JobQueue[job.jobID].status = 'finished'
                        JobQueue[job.jobID].result = job.result
                        JobQueue[job.jobID].elapsedTime = job.elapsedTime
                    }
                }
            }
        })
        const sub2 = nc.subscribe("ObserverQueue", {
            callback: (err, msg) => {
                if (err) {
                    console.log(err.message)
                } else {
                    let ObserverComing = JSON.parse(sc.decode(msg.data))
                    Observer["averageRequests"]  = ObserverComing.averageRequests
                    Observer["averagePending"] = ObserverComing.averagePending
                    Observer["averageTime"] = ObserverComing.averageTime
                }
            }
        })
  
    } catch(ex) {
        console.log(ex)
    }
  }
  
subscribeResult()

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});