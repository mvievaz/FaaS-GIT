import * as dockerUtils from './docker-utils'

var containerID: string;

dockerUtils.CreateImage("test", '/home/mviel/Master/SAD/PI-Test-for-FaaS/test.tar.xz')
    .then((response: string) => dockerUtils.CreateContainer("test", ["N=100"]))
    .then((id: string) => {
        containerID = id
        dockerUtils.RunContainer()
    })

setTimeout(() => dockerUtils.LogsContainers(), 10000)
// ToDo