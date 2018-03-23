document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	loadShoppingList();
}

//创建一个新商品 
function createNewItem()  
{  
    let shoppingList = {};  
   
    // 弹出对话框输入一个新商品 
    let Item = prompt("New Item","");  
    if (Item != null)  
    {  
        if (Item == "")  
        {  
            alert("Item can't be empty!");  
        }  
        else  
        {  
            shoppingList = { 
                check : 0,
                text : Item
            };  
            addTableRow(shoppingList, false);  
        }  
    }  
   
}

var rowID = 0;  
function addTableRow(shoppingList, appIsLoading)  
{  
    rowID +=1;  
    var table = document.getElementById("dataTable");  
    var row = table.insertRow(table.rows.length);  
   
    //checkbox  
    var cell1 = row.insertCell(0);  
    var element1 = document.createElement("input");  
    element1.type = "checkbox";  
    element1.name = "chkbox"; 
    element1.className = "chkbox";
    element1.checked = shoppingList.check;  
    element1.setAttribute("onclick", "checkboxClicked()");  
    cell1.appendChild(element1);  
   
    //输入框 
    var cell2 = row.insertCell(1);  
    var element2 = document.createElement("input");  
    element2.type = "text";  
    element2.name = "txtbox";  
    element2.size = 16;  
    element2.id = "text" + rowID;  
    element2.className = "form-control";
    element2.value = shoppingList.text;  
    //改成input？
    element2.setAttribute("onchange", "saveShoppingList()");  
    cell2.appendChild(element2);  
   
    //查看按钮
    var cell3 = row.insertCell(2);  
    var element3 = document.createElement("input");  
    element3.type = "button";  
    element3.id = rowID;  
    element3.value = "View";
    element3.className = "btn btn-info";
    element3.setAttribute("onclick", "viewSelectedRow(document.getElementById('text' + this.id))");  
    cell3.appendChild(element3);  
   
    //删除按钮
    var cell4 = row.insertCell(3);  
    var element4 = document.createElement("input");  
    element4.type = "button";
    element4.className = "btn btn-danger";
    element4.value = "Delete";  
    element4.setAttribute("onclick", "deleteSelectedRow(this)");  
    cell4.appendChild(element4);  
   
    checkboxClicked();  
    saveShoppingList();  
   
    if (!appIsLoading) {
        console.log("Item Added Successfully.");
    }
}  



function checkboxClicked()  
{  
    var table = document.getElementById("dataTable");  
    var rowCount = table.rows.length;  
   
    // loop through all rows of the table  
    for(let i = 0; i < rowCount; i++)  
    {  
        let row = table.rows[i];  
        let chkbox = row.cells[0].childNodes[0];  
        let textbox = row.cells[1].childNodes[0];  
   
        if(chkbox.checked)  
        {  
            if(textbox != null)  
            {         
                textbox.style.setProperty("text-decoration", "line-through");  
            }  
        }  
        else  
        {  
            textbox.style.setProperty("text-decoration", "none");  
        }  
   
    }  

    saveShoppingList();  
}  


//alert商品的名字
function viewSelectedRow(itemName)  
{  
    alert(itemName.value); 
}  

//删除选中行
function deleteSelectedRow(deleteButton)  
{  
    let p = deleteButton.parentNode.parentNode;  
    p.parentNode.removeChild(p);  
    saveShoppingList();  
}  

//保存shopping list  
function saveShoppingList()  
{  
    let listArray = {};  
    let checkBoxState = 0;  
    let textValue = "";  
   
    let table = document.getElementById("dataTable");  
   
    if (table.rows.length != 0)  
    {  
        for(let i=0; i<table.rows.length; i++)  
        {  
            let row = table.rows[i];  
            let chkbox = row.cells[0].childNodes[0];  
            if(chkbox.checked)  
            {  
                checkBoxState = 1;  
            }  
            else  
            {  
                checkBoxState= 0;  
            }  
   
            let textbox = row.cells[1].childNodes[0];  
            textValue = textbox.value;  
   
            listArray["row" + i] =  
            {  
                check : checkBoxState,  
                text : textValue  
            };  
        }  
    }  
    else  
    {  
        listArray = null;  
    }  
   
    // use the local storage API to persist the data as JSON  
    window.localStorage.setItem("shoppingList", JSON.stringify(listArray));  
}  

function loadShoppingList()  
{  
    // use the local storage API load the JSON formatted to-do list, and decode it  
    var theList = JSON.parse(window.localStorage.getItem("shoppingList"));  
   
    if (theList.equals(null))  
    {  
        deleteAllRows();  
    }  
    else  
    {  
        let count = 0;  
        for (let obj in theList)  
        {  
            count++;  
        }  
   
        // remove any existing rows from the table  
        deleteAllRows();  
   
        // loop through the to-dos  
        for(let i = 0; i < count; i++)  
        {  
            // adding a row to the table for each one  
            addTableRow(theList["row" + i], true);  
        }  
    }  
}  

function deleteAllRows()  
{  
    let table = document.getElementById("dataTable");  
    let rowCount = table.rows.length;
    
    for(let i = 0; i < rowCount; i++)  
    {  
        table.deleteRow(i);  
        rowCount--;  
        i--;  
    }  
   
    saveShoppingList();  
}  

// 删除已购买的商品
function removePurchasedItems()  
{  
    let table = document.getElementById("dataTable");  
    let rowCount = table.rows.length;

    for(let i = 0; i < rowCount; i++)  
    {  
        let row = table.rows[i];  
        let chkbox = row.cells[0].childNodes[0];  
        if(null != chkbox && true == chkbox.checked)  
        {  
            table.deleteRow(i);  
            rowCount--;  
            i--;  
        }  
    }  
     
    saveShoppingList();  
    alert("Purchased Items Were Cleared Successfully.");  
}  
