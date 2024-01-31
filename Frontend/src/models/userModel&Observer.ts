export const Users: { [email:string]: string } = {};

interface Observer {
    averageRequests: string;
    averagePending: string;
    averageTime: string;
}

// Example usage:
export let Observer: Observer = {
    averageRequests: "0",
    averagePending: "0",
    averageTime: "0"
};