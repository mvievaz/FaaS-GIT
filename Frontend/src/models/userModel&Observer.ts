export const Users: { [email:string]: string } = {};

interface Observer {
    averageRequests: string;
    averageCompleted: string;
    averageTime: string;
}

// Example usage:
export let Observer: Observer = {
    averageRequests: "0",
    averageCompleted: "0",
    averageTime: "0"
};