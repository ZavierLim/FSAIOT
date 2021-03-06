CREATE DATABASE IF NOT EXISTS fsa;

CREATE TABLE IF NOT EXISTS `fsa`.`contractors`(
	`ContractorId` INT NOT NULL AUTO_INCREMENT,
    `Name` varchar(45) NOT NULL,
    `Company` varchar(100) DEFAULT NULL,
    `PhoneNumber` INT NOT NULL,
    `Photo` varchar(255) DEFAULT NULL, 
    PRIMARY KEY(`ContractorId`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `fsa`.`Requests`(
	`RequestId` INT NOT NULL AUTO_INCREMENT,
    `ContractorId` INT,
	`Timing` DATETIME,
    `Approval` BOOLEAN,
    `SMSApproval` BOOLEAN,
    PRIMARY KEY(`RequestId`),
    FOREIGN KEY (`ContractorId`) 
		REFERENCES contractors(ContractorId)
    ON UPDATE CASCADE
) ;

CREATE TABLE IF NOT EXISTS `fsa`.`AccessHistory`(
	`AccessId` INT NOT NULL AUTO_INCREMENT,
    `RequestId` INT,
    `DateTimeEntered` DATETIME,
    PRIMARY KEY(`AccessId`),
    FOREIGN KEY(`RequestId`)
		REFERENCES Requests(RequestId)
    ON UPDATE CASCADE
);
  
use fsa;
INSERT INTO contractors (name,company,phonenumber)VALUES("zavier","IOT","97301682");
INSERT INTO contractors (name,company,phonenumber)VALUES("Xue Sheng","IOT","91234");
INSERT INTO Requests(ContractorId,Timing,Approval,SMSApproval) VALUES("2","2021-11-03 11:20:00","0","0");
INSERT INTO Requests(ContractorId,Timing,Approval,SMSApproval) VALUES("1","2021-11-04 12:20:00","1","0");
INSERT INTO Requests(ContractorId,Timing,Approval,SMSApproval) VALUES("1","2021-11-16 12:20:00","1","1");