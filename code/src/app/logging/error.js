class ErrorData {
    date = new Date().toDateString();
    time = new Date().toTimeString();    
    constructor(errorMsg) {
      this.errorMsg = errorMsg;
    }
    message(Message) {
      this.errorMsg = Message;
    }

    data() {
      return "Error: "+ this.errorMsg + "\nDate: " + this.date + "\nTime: " + this.time;
    }
}

module.exports = ErrorData;
