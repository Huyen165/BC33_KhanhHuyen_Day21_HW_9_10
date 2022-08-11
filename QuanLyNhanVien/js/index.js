var employeeList = [];

function createEmployee() {
    var employeeAccount = document.getElementById("tknv").value;
    var employeeName = document.getElementById("name").value;
    var employeeEmail = document.getElementById("email").value;
    var employeePassword = document.getElementById("password").value;
    var employeeWorkDay = document.getElementById("datepicker").value;
    var employeeSalary = document.getElementById("luongCB").value;
    var employeePosition = document.getElementById("chucvu").value;
    var employeeWorkHours = document.getElementById("gioLam").value;


    var employee = new Employee(
        employeeAccount,
        employeeName,
        employeeEmail,
        employeePassword,
        employeeWorkDay,
        employeeSalary,
        employeePosition,
        employeeWorkHours
    );

    console.log(employee);
    // push đối tượng sv vào list
    employeeList.push(employee);

    // In danh sách nhân viên trên màn hình
    renderEmployeeList(employeeList);

    // Lưu trữ vào localStorage
    saveLocalStorage(employeeList, "ListNV");

}
/**
 * Hàm này nhận về 1 mảng NV rồi trả ra htmlString, cái in ra màn hình cho user có thể nhìn thấy.
 * @param {*} arrNV  : tham số là arr các ob NV
 * @returns : Kết quả trả về là string 
 */
function renderEmployeeList(arrNV) {
    var output = " ";
    for (var i = 0; i < arrNV.length; i++) {
        var obNhanVien = arrNV[i];
        obNhanVien.totalSalary = function() {
            if (obNhanVien.position === "Giám Đốc") {
                totalSalary = (parseInt(obNhanVien.salary)) * 3;
            } else if (obNhanVien.position === "Trưởng Phòng") {
                totalSalary = obNhanVien.salary * 2;
            } else {
                totalSalary = obNhanVien.salary;
            }
            return totalSalary;
        };
        obNhanVien.employeeType = function() {
            if (obNhanVien.workHours < 160) {
                obNhanVien.employeeType = "Nhân viên trung bình";
            } else if (obNhanVien.workHours >= 160 && obNhanVien.workHours < 176) {
                obNhanVien.employeeType = "Nhân viên khá";
            } else if (obNhanVien.workHours >= 176 && obNhanVien.workHours < 192) {
                obNhanVien.employeeType = "Nhân viên giỏi";
            } else {
                obNhanVien.employeeType = "Nhân viên xuất sắc";
            }
            return obNhanVien.employeeType;

        };
        var trNV = `
        <tr>
            <td>${obNhanVien.account}</td>
            <td>${obNhanVien.name}</td>
            <td>${obNhanVien.email}</td>
            <td>${obNhanVien.password}</td>
            <td>${obNhanVien.workDay}</td>
            <td>${obNhanVien.salary}</td>
            <td>${obNhanVien.position}</td>
            <td>${obNhanVien.workHours}</td>
            <td>${obNhanVien.totalSalary()}</td>
            <td>${obNhanVien.employeeType()}</td>
        </tr>
        `;
        output += trNV;
    }
    document.querySelector("thead").innerHTML = output;
    return output;
}

/**
 * Hàm lữu trữ giá trị (obj, hoặc arr) vào localStorage
 * @param {*} ob Dữ liệu cần lưu
 * @param {*} key keyName trong localStorage
 */
function saveLocalStorage(ob, key) { // {} , []
    var str = JSON.stringify(ob);
    localStorage.setItem(key, str);
}