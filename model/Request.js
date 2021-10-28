class Request {
  contractorId;
  Timing;
  Approval;

  constructor(contractorId, Timing, Approval) {
    this.name = contractorId;
    this.company = Timing;
    this.phonenumber = Approval;
  }
}

module.exports = Request;
