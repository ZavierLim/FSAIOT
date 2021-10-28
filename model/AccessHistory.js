class AccessHistory {
  dateTimeEntered;
  AccessId;
  RequestId;

  constructor(RequestId, AccessId, dateTimeEntered) {
    this.RequestId = RequestId;
    this.AccessId = AccessId;
    this.dateTimeEntered = dateTimeEntered;
  }
}

module.exports = AccessHistory;
