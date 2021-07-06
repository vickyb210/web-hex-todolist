let list = [
    {
        mission: "幫蕃鼠洗澡",
        status: "待完成"
    },
    {
        mission: "幫黑糖洗澡",
        status: "已完成"
    }
];
// 為了塞html進去所以要先抓.list-group
const listGroup = document.querySelector('.list-group');
// 左下角待完成事項數量
const listNum = document.querySelector('.list-num');

// 初始資料呈現
function init() {
    // 目前選到的tab
    const activeTab = document.querySelector('.active');
    let str = "";
    let doneCount = 0;
    list.forEach(function (item, index) {
        let eachMission = item.mission;
        let eachStatus = item.status;
        if (activeTab.textContent == "全部") {
            // 不管怎樣都存進去str，並在input裡塞一個value顯示status是待完成或已完成、新增onclick並帶入index
            str += `<li class="list-group-item d-flex"><input class="form-check-input me-3" id="todo-${index}" type="checkbox" value="${eachStatus}" onclick="changeStatus(${index})">
                    <label class="w-100" for="todo-${index}">${eachMission}</label><button onclick="deleteTodo(${index})" type="button" class="btn-close"></button>
                    </li>`;
        } else if (activeTab.textContent == eachStatus) {
            // 目前選取的tab=已完成或待完成時，才存進去str
            str += `<li class="list-group-item d-flex"><input class="form-check-input me-3" id="todo-${index}" type="checkbox" value="${eachStatus}" onclick="changeStatus(${index})">
               <label class="w-100" for="todo-${index}">${eachMission}</label><button onclick="deleteTodo(${index})" type="button" class="btn-close"></button>
               </li>`;
        }
        // 若status是待完成則doneCount加一
        if (eachStatus == "待完成") {
            doneCount += 1;
        }
    })
    listGroup.innerHTML = str;
    // 等待li渲染完，再根據value的值決定checkbox要不要改為checked=true(被選中劃掉)的狀態
    todoChecked();
    // 在左下角顯示共有幾個待完成事項
    listNum.innerHTML = doneCount + " 個待完成項目";
}

// 根據value的值決定checkbox要不要改為checked=true(被選中劃掉)的狀態
function todoChecked() {
    const todoCheckbox = document.querySelectorAll('.list-group li input');
    let count = 0;
    todoCheckbox.forEach(function (item) {
        if (item.getAttribute("value") == "已完成") {
            item.checked = true;
        }
    })
}

// 正文開始，先跑一次初始
init();

// TAB篩選
const nav = document.querySelector('.nav');
nav.addEventListener('click', function (e) {
    init();
})

// 點擊代辦事項時，若是待完成項目則將原始陣列的status改為已完成，反之亦然
function changeStatus(index) {
    if (list[index].status == "待完成") {
        list[index].status = "已完成";
    } else {
        list[index].status = "待完成";
    }
    init();
}

// 新增待辦事項
const inputTodo = document.querySelector('.input-todo');
const btnAdd = document.querySelector('.btn-add');
// 點擊新增按鈕
btnAdd.addEventListener('click', function (e) {
    // 過濾未輸入文字的狀況
    if (inputTodo.value.trim() == "") {
        alert("請輸入文字~");
        return;
    }
    // 有輸入文字的狀態則往下繼續，空物件塞值
    let obj = {};
    obj.mission = `${inputTodo.value}`;
    obj.status = "待完成";
    list.push(obj);
    init();
    inputTodo.value = ""; // 清空輸入框
})

// 刪除個別代辦事項
function deleteTodo(index) {
    list.splice(index, 1);
    init();
}

// 刪除已完成代辦事項
function deleteDone() {
    list.forEach(function (item, index) {
        let eachStatus = item.status;
        if (eachStatus == "已完成") {
            list.splice(index, 1);
        }
    }) 
    init();
}