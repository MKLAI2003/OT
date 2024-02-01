import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
            //import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-analytics.js";
            // TODO: Add SDKs for Firebase products that you want to use
            // https://firebase.google.com/docs/web/setup#available-libraries
          
            // Your web app's Firebase configuration
            // For Firebase JS SDK v7.20.0 and later, measurementId is optional
            const firebaseConfig = {
              apiKey: "AIzaSyAWkqvO5v5WtxC2tezgbrlW_vjUlz29iyo",
              authDomain: "ot-penalty.firebaseapp.com",
              databaseURL: "https://ot-penalty-default-rtdb.firebaseio.com",
              projectId: "ot-penalty",
              storageBucket: "ot-penalty.appspot.com",
              messagingSenderId: "426201957044",
              appId: "1:426201957044:web:a8e6cd0c835256b77a4de1",
              measurementId: "G-7EGSXFC74C"
            };
          
            // Initialize Firebase
            const app = initializeApp(firebaseConfig);
            //const analytics = getAnalytics(app);


            import {getDatabase, ref, set, get, child, update, remove}
            from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";

            const db = getDatabase();


function GetAllDataOnce(){
    takeTime();
    get(child(ref(db),"AllEmployees"))
    .then((snapshot)=>{
        var AllEmployees=[];
        
        snapshot.forEach(childSnapshot => {
            AllEmployees.push(childSnapshot.val());
       });
        AddAllItemsToTable(AllEmployees);
    });

}

function AddAllItemsToTable(AllEmployees){
    var totalAmount = 0;
    var EmpArray = [];
 
    tbody.innerHTML="";
    AllEmployees.forEach(element => {

        if(element.Amount == null){
            var tempAmount = 0;
        }else{
            var tempAmount = element.Amount;
        }
        totalAmount = Number(totalAmount) + Number(tempAmount);
        
        

        if(element.Name == "TOTAL"){
            AddItemsToTable(element.EmpID, element.Name, totalAmount, element.Club, element.Ref);
            EmpArray.sort((a, b) => a.Amount - b.Amount);
            document.getElementById('No1').innerHTML = "欠款冠軍🥇： " + EmpArray.pop().EmpID;
            document.getElementById('No2').innerHTML = "欠款亞軍🥈： " + EmpArray.pop().EmpID;
            document.getElementById('No3').innerHTML = "欠款季軍🥉： " + EmpArray.pop().EmpID;
        }else{
            var temp = {EmpID: element.EmpID, Amount: element.Amount};
            EmpArray.push(temp);

            AddItemsToTable(element.EmpID, element.Name, element.Amount, element.Club, element.Ref);
        }
        

    });
    
    }

function AddItemsToTable(EmpID,Name,Amount,Club ,Ref){
    var tbody = document.getElementById('tbody');
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');
    td1.innerHTML = EmpID;
    td2.innerHTML = Name;
    td3.innerHTML = Amount;
    td4.innerHTML = Club;
    td5.innerHTML = Ref;

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);

    tbody.appendChild(trow);
}

function takeTime(){

    get(child(ref(db), "System/updateTime")).then((snapshot)=>{

        if(snapshot.exists()){
            
            var d = new Date(snapshot.val());
            d = (d.getDate()+'/'+d.getMonth()+1)+'/'+d.getFullYear()+' '+(d.getHours() > 12 ? d.getHours() - 12 : d.getHours())+':'+d.getMinutes()+' '+(d.getHours() >= 12 ? "PM" : "AM");
            console.log(d);
            document.getElementById("updateTimeBox").innerHTML = "最後更新時間： " + d;
        }
        else{
            alert("No data found");
        }
        
        })
        .catch((error)=>{
            alert("unsuccessful, error"+error);
        });
}

function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var y = date.getFullYear();
    var month = date.getMonth();
    var d = date.getDate();
    var session = "AM";
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    d = (d < 10) ? "0" + d : d;
    month = (month < 10) ? "0" + month : month;
    
    var time = d + "/" + month + "/" + y + "  " + h + ":" + m + ":" + s + " " + session;
    document.getElementById("MyClockDisplay").innerText = time;
    document.getElementById("MyClockDisplay").textContent = time;
    
    setTimeout(showTime, 1000);
    
}

showTime();

window.onload = GetAllDataOnce;