// Your code here
function createEmployeeRecord(array){
       return {
        firstName : array[0],
        familyName:array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents : [],
        timeOutEvents : [] ,
    }
}

function createEmployeeRecords(arrayOfRecords){
    return arrayOfRecords.map((array)=> createEmployeeRecord(array))
}
function createTimeInEvent(employeeObj, dateStamp){
    employeeObj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    })
    return employeeObj
}
function createTimeOutEvent(employeeObj, dateStamp){
    employeeObj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    })
    return employeeObj
}
function hoursWorkedOnDate(employeeObj, inputDate){
   let inTime = employeeObj.timeInEvents.find((ele)=>(ele.date === inputDate )).hour
   let outTime = employeeObj.timeOutEvents.find((ele)=>(ele.date === inputDate )).hour
   return (outTime-inTime)/100
}
function wagesEarnedOnDate(employeeObj, inputDate){
    let wagesEarnedOnGivenDate = hoursWorkedOnDate(employeeObj, inputDate)*employeeObj.payPerHour;
    return wagesEarnedOnGivenDate
}
function allWagesFor(employeeObj){
    let datesWorked = employeeObj.timeInEvents.map((ele)=>ele.date)
    let WagesEarned = 0
    for (const date of datesWorked) {
        WagesEarned = WagesEarned + wagesEarnedOnDate(employeeObj, date)
    }
    return WagesEarned
}
function calculatePayroll(arrayEmployeeRecords){
    let totalPaymentOwned = 0
    for (const recordObj of arrayEmployeeRecords) {
        totalPaymentOwned = totalPaymentOwned + allWagesFor(recordObj)
    }
    return totalPaymentOwned
}