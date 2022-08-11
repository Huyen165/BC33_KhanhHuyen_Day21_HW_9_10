function Employee(account, name, email, password, workDay, salary, position, workHours, totalSalary, employeeType) {
    this.account = account;
    this.name = name;
    this.email = email;
    this.password = password;
    this.workDay = workDay;
    this.salary = salary;
    this.position = position;
    this.workHours = workHours;
    this.totalSalary = totalSalary;
    this.employeeType = employeeType;
    this.totalSalary = function() {
        if (position === "Giám đốc") {
            totalSalary = Number(salary) * 3;
        } else if (position === "Trưởng Phòng") {
            totalSalary = Number(salary) * 2;
        } else {
            totalSalary = Number(salary);
        }
        return totalSalary;
    }
    this.employeeType = function() {
        if (workHours < 160) {
            employeeType = "Nhân viên trung bình";
        } else if (workHours >= 160 && workHours < 176) {
            employeeType = "Nhân viên khá";
        } else if (workHours >= 176 && workHours < 192) {
            employeeType = "Nhân viên giỏi";
        } else {
            employeeType = "Nhân viên xuất sắc";
        }
        return employeeType;

    }
}