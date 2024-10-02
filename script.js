// 動態新增時間選擇框
function addTimeSlot(day) {
  var container = document.getElementById("timeSlots_" + day);
  var newSlot = document.createElement("div");

  newSlot.innerHTML = `
        開始時間：<input type="time" class="startTime" required>
        結束時間：<input type="time" class="endTime" required>
    `;

  container.appendChild(newSlot);
}

// 計算所有天的總時數和薪水
function calculateAll() {
  var days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
  var totalWeekHours = 0;
  var totalWeekMinutes = 0;
  var hourlyWage = parseFloat(document.getElementById("hourlyWage").value);

  days.forEach(function (day) {
    var container = document.getElementById("timeSlots_" + day);
    var timeSlots = container.querySelectorAll("div");
    var totalHours = 0;
    var totalMinutes = 0;

    timeSlots.forEach(function (slot) {
      var startTime = slot.querySelector(".startTime").value;
      var endTime = slot.querySelector(".endTime").value;

      if (startTime && endTime) {
        var start = new Date("2000-01-01T" + startTime + ":00");
        var end = new Date("2000-01-01T" + endTime + ":00");

        var diff = (end - start) / 1000; // 差異時間以秒為單位
        var hours = Math.floor(diff / 3600); // 轉換為小時
        var minutes = Math.floor((diff % 3600) / 60); // 轉換為分鐘

        totalHours += hours;
        totalMinutes += minutes;
      }
    });

    // 將分鐘轉換為小時
    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes = totalMinutes % 60;

    // 轉換為小數的總工時
    var totalDecimal = totalHours + (totalMinutes / 60).toFixed(2);

    // 更新結果
    document
      .getElementById("total_" + day + "_result")
      .querySelector("span").textContent =
      totalHours +
      " 小時 " +
      totalMinutes +
      " 分鐘 = " +
      (totalHours + totalMinutes / 60).toFixed(2) +
      " 小時";

    totalWeekHours += totalHours;
    totalWeekMinutes += totalMinutes;
  });

  // 處理總時數的分鐘超過60的部分
  totalWeekHours += Math.floor(totalWeekMinutes / 60);
  totalWeekMinutes = totalWeekMinutes % 60;

  // 轉換為小數的總工時
  var totalWeekDecimal = totalWeekHours + totalWeekMinutes / 60;
  document.getElementById("total_hours").querySelector("span").textContent =
    totalWeekHours +
    " 小時 " +
    totalWeekMinutes +
    " 分鐘 = " +
    totalWeekDecimal.toFixed(2) +
    " 小時";

  // 計算總薪水
  if (!isNaN(hourlyWage) && hourlyWage > 0) {
    var totalSalary = (totalWeekDecimal * hourlyWage).toFixed(2);
    document.getElementById("total_salary").querySelector("span").textContent =
      "NT$ " + totalSalary;
  } else {
    document.getElementById("total_salary").querySelector("span").textContent =
      "請輸入有效時薪";
  }
}

// 重設所有輸入
function resetAll() {
  var days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
  days.forEach(function (day) {
    var container = document.getElementById("timeSlots_" + day);
    container.innerHTML = ""; // 清空時間選擇框
  });

  document.getElementById("hourlyWage").value = ""; // 清空時薪輸入
  document.getElementById("total_hours").querySelector("span").textContent = ""; // 清空總結果
  document.getElementById("total_salary").querySelector("span").textContent =
    ""; // 清空總薪水結果
  days.forEach(function (day) {
    document
      .getElementById("total_" + day + "_result")
      .querySelector("span").textContent = ""; // 清空每日結果
  });
}
