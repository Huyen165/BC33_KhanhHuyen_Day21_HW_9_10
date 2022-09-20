/**
 * HomeWork
 */

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

    var valid = true;
    valid &=
        checkEmpty(employee.account, "#tbTKNV", "Tài khoản ") &
        checkEmpty(employee.name, "#tbTen", "Tên") &
        checkEmpty(employee.email, "#tbEmail", "email") &
        checkEmpty(employee.password, "#tbMatKhau", "Mật khẩu") &
        checkEmpty(employee.workDay, "#tbNgay", "Ngày làm") &
        checkEmpty(employee.salary, "#tbLuongCB", "Lương cơ bản") &
        checkEmpty(employee.workHours, "#tbGiolam", "Giờ làm");

    //validation tài khoản từ 4-6 ký tự và k đc bỏ trống;
    if (checkEmpty(employee.account, "#tbTKNV", "Tài khoản")) {
        valid &= checkLength(employee.account, "#tbTKNV", "Tài khoản", 4, 6);
    }

    //Kiểm tra tên nv phải là chữ và k đc bỏ trống
    if (checkEmpty(employee.name, "#tbTen", "Tên")) {
        valid &= checkLetter(employee.name, "#tbTen", "Tên");
    }

    //Kiểm tra email;
    if (checkEmpty(employee.email, "#tbEmail", "email")) {
        valid &= checkEmail(employee.email, "#tbEmail", "email");
    }

    // Mật khẩu phải từ 6- 10 ký tự, có ít nhất 1 in hoa, 1 số và 1 ký tự đặc biệt:

    if (checkEmpty(employee.password, "#tbMatKhau", "Mật khẩu")) {
        valid &=
            checkLength(employee.password, "#tbMatKhau", "password", 6, 10) &
            checkPassWord(employee.password, "#tbMatKhau", "Mật khẩu");
    }

    // Lương cb phải từ 1 000 000 -> 20 000 000
    if (checkEmpty(employee.salary, "#tbLuongCB", "Lương cơ bản")) {
        valid &= checkValue(
            employee.salary,
            "#tbLuongCB",
            "Lương cơ bản",
            1000000,
            20000000
        );
    }

    //Giờ làm phải từ 80 -> 200h
    if (checkEmpty(employee.workHours, "#tbGiolam", "Giờ làm")) {
        valid &= checkValue(employee.workHours, "#tbGiolam", "Giờ làm", 80, 200);
    }

    if (!valid) {
        return;
    }


    // push đối tượng nv vào list
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
            if (obNhanVien.position === "Giám Đốc") {
                obNhanVien.totalSalary = (Number(obNhanVien.salary) * 3);
            } else if (obNhanVien.position === "Trưởng phòng") {
                obNhanVien.totalSalary = (Number(obNhanVien.salary) * 2);
            } else {
                obNhanVien.totalSalary = (Number(obNhanVien.salary));
            }
            return obNhanVien.totalSalary;
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
            <td>${obNhanVien.workDay}</td>
            <td>${obNhanVien.salary}</td>
            <td>${obNhanVien.position}</td>
            <td>${obNhanVien.workHours}</td>
            <td>${obNhanVien.totalSalary()}</td>
            <td>${obNhanVien.employeeType()}</td>
            <td>
                <button class = "btn btn-danger" onclick ="delEmployee('${obNhanVien.account}')">DEL</button>
                <button class = "btn btn-success mt-2" onclick ="updateEmployee('${obNhanVien.account}')">Update</button>
            </td>
        </tr>
        `;
        output += trNV;
    }
    document.querySelector("tbody").innerHTML = output;
    return output;
}


/**
 * Hàm xóa đối tượng được chọn theo account, vì account của mỗi nhân viên là khác nhau, mỗi lần chạy sẽ xóa một đối tượng nhân viên trong danh sách
 * @param {*} acc : Lấy giá trị người dùng khi click.
 * 
 * Splice javascript là hàm dùng để xóa các phần tử trong mảng, hoặc thay thế một phần tử trong mảng thành một hoặc nhiều phần tử khác.
 */
function delEmployee(acc) {
    var indexDel = -1;
    for (var i = employeeList.length - 1; i >= 0; i--) {
        if (employeeList[i].account === acc) {
            employeeList.splice(i, 1);
        }
    }
    renderEmployeeList(employeeList);

    saveLocalStorage(employeeList, "ListNV");

    if (indexDel !== -1) {
        employeeList.splice(indexDel, 1);
    }

}

function updateEmployee(acc) {

    var updateEmploy = null;
    for (var i = 0; i < employeeList.length; i++) {
        if (employeeList[i].account == acc) {
            updateEmploy = employeeList[i];
            break;
        }
    }
    if (updateEmploy !== null) {

        document.querySelector("#tknv").value = updateEmploy.account;
        document.querySelector("#name").value = updateEmploy.name;
        document.querySelector("#email").value = updateEmploy.email;
        document.querySelector("#password").value = updateEmploy.password;
        document.querySelector("#datepicker").value = updateEmploy.workDay;
        document.querySelector("#luongCB").value = updateEmploy.salary;
        document.querySelector("#chucvu").value = updateEmploy.position;
        document.querySelector("#gioLam").value = updateEmploy.workHours;
    }
}

/**
 * Hàm nhận vào key name để lấy ra giá trị từ local storage.
 * @param {*} key : tên của item trong local storage
 * @returns trả về obj được lấy ra theo key
 */
function getLocalStorage(key) {
    //Lấy dữ liệu từ localstorage ra (dữ liệu lấy là string)
    if (localStorage.getItem(key)) {
        var str = localStorage.getItem(key);
        //Parse dữ liệu về lại object
        var ob = JSON.parse(str);
        return ob;
    }
    return undefined;
}
//đợi html js load xong thì sẽ động thực thi
window.onload = function() {
    //Lấy ra array nhân viên từ localstorage gán vào employeeList
    employeeList = getLocalStorage("ListNV");
    console.log("employeeList", employeeList);
    if (employeeList === undefined) {
        employeeList = [];
    }
    debugger; //dừng thực thi hàm
    renderEmployeeList(employeeList);
};

var searchEmployee = function() {
    //Tìm kiếm nhân viên theo phân loại
    var findEm = document.querySelector('#searchName').value;
    var output = [];
    for (var i = 0; i < employeeList.length; index++) {

        if (loaiNhanVien.search(findEm) != -1) {
            output.push(employeeList[i]);
        }
    }

    renderEmployeeList(output);
}

document.querySelector('#searchName').oninput = searchEmployee;
document.querySelector('#btnTimNV').onclick = searchEmployee;