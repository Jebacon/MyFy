class ErrorData {
    message: string;
    date: string;
    time: string;

    constructor(Message: string) {
        this.message = Message;
        this.date = new Date().toDateString();
        this.time = new Date().toTimeString();
    }

    setMessage(Message: string) {
        this.message = Message;
    }

    printData() {
        console.log("Error: " + this.message + "\nDate: " + this.date + "\nTime: " + this.time);
    }
}