document.addEventListener("DOMContentLoaded", function () {
    // Lấy phần tử hiển thị ngày hôm nay
    let currentDateElement = document.getElementById("currentDate");

    // Lấy phần tử body của bảng để chèn dữ liệu
    let calendarBody = document.getElementById("calendarBody");
    let weekdaysRow = document.getElementById("weekdays");

    // Danh sách các thứ trong tuần (Bắt đầu từ Thứ 2 -> Chủ Nhật)
    let weekdays = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"];

    // Chèn hàng tiêu đề của các thứ vào bảng
    weekdays.forEach(day => {
        let th = document.createElement("th");
        th.textContent = day;
        weekdaysRow.appendChild(th);
    });

    // Lấy ngày hiện tại
    let today = new Date();
    let todayDate = today.getDate();
    let todayMonth = today.getMonth();
    let todayYear = today.getFullYear();

    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateElement.textContent = "Hôm nay: " + today.toLocaleDateString("vi-VN", options);

    // Xác định ngày đầu tiên và ngày cuối cùng của tháng hiện tại
    let firstDayOfMonth = new Date(todayYear, todayMonth, 1);
    let lastDayOfMonth = new Date(todayYear, todayMonth + 1, 0);
    let totalDays = lastDayOfMonth.getDate(); // Số ngày trong tháng

    let startDay = firstDayOfMonth.getDay(); // Ngày đầu tiên của tháng là thứ mấy (Chủ Nhật = 0)
    if (startDay === 0) startDay = 7; // Đổi Chủ Nhật thành 7 để đúng với bảng

    let row = document.createElement("tr"); // Tạo hàng đầu tiên

    // Thêm ô trống nếu tháng không bắt đầu từ thứ 2
    for (let i = 1; i < startDay; i++) {
        let emptyCell = document.createElement("td");
        row.appendChild(emptyCell);
    }

    // Duyệt qua tất cả các ngày trong tháng và hiển thị
    for (let day = 1; day <= totalDays; day++) {
        let cell = document.createElement("td");
        cell.textContent = day;

        // Nếu ngày này là ngày hôm nay, thêm CSS đặc biệt để đánh dấu
        if (day === todayDate && todayMonth === new Date().getMonth()) {
            cell.style.backgroundColor = "yellow"; // Đánh dấu ngày hôm nay
            cell.style.fontWeight = "bold";
        }

        row.appendChild(cell);

        // Nếu đến Chủ Nhật (thứ 7 trong bảng), tạo hàng mới
        if ((startDay + day - 1) % 7 === 0) {
            calendarBody.appendChild(row);
            row = document.createElement("tr");
        }
    }

    // Thêm hàng cuối cùng nếu chưa đủ 7 ô
    if (row.children.length > 0) {
        calendarBody.appendChild(row);
    }
});