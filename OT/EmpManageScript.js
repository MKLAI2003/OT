
            // Import the functions you need from the SDKs you need
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

            var EmpIDbox = document.getElementById("EmpIDbox");
            var Namebox = document.getElementById("Namebox");
            var Amountbox = document.getElementById("Amountbox");
            var Clubbox = document.getElementById("Clubbox");
            var Refbox = document.getElementById("Refbox");


            var insBtn = document.getElementById("Insbtn");
            var selBtn = document.getElementById("Selbtn");
            var updBtn = document.getElementById("Upbtn");
            var delBtn = document.getElementById("Delbtn");

            function InsertData(){
                set(ref(db, "AllEmployees/"+ EmpIDbox.value),{
                EmpID: EmpIDbox.value,
                Name: Namebox.value,
                Amount: Amountbox.value,
                Club: Clubbox.value,
                Ref: Refbox.value
                })
                .then(()=>{
                    updateTime();
                alert("data stored successfully");
                })
                .catch((error)=>{
                alert("unsuccessful, error"+error);
                });
            }

            function SelectData(){
                const dbref = ref(db);

                get(child(ref(db), "AllEmployees/"+ EmpIDbox.value)).then((snapshot)=>{

                    if(snapshot.exists()){
                        EmpIDbox.value = snapshot.val().EmpID;
                        Namebox.value = snapshot.val().Name;
                        Amountbox.value = snapshot.val().Amount;
                        Clubbox.value = snapshot.val().Club;
                        Refbox.value = snapshot.val().Ref;
                    }
                    else{
                        alert("No data found");
                    }
                    
                    })
                    .catch((error)=>{
                        alert("unsuccessful, error"+error);
                    });
            }

            function updateTime(){
                const currentDate = new Date();
                const timestamp = currentDate.getTime();
                set(ref(db,"System/"),{
                    updateTime: timestamp
                    })
                    .then(()=>{
                    })
                    .catch((error)=>{
                    alert("unsuccessful update time, error"+error);
                    });
            }

            function SearchData(){
                get(child(ref(db), "AllEmployees/"+ SearchEmpIDbox.value)).then((snapshot)=>{

                    if(snapshot.exists()){
                        document.getElementById("SearchEmpID").innerText = snapshot.val().EmpID;
                        document.getElementById("SearchName").innerText = snapshot.val().Name;
                        document.getElementById("SearchAmount").innerText = snapshot.val().Amount;
                        document.getElementById("SearchClub").innerText = snapshot.val().Club;
                        document.getElementById("SearchRef").innerText = snapshot.val().Ref;
                        
                    }
                    else{
                        alert("No data found");
                    }
                    
                    })
                    .catch((error)=>{
                        alert("unsuccessful, error"+error);
                    });
            }

            function editAmount() {
                var tempAmount = 0;
                let AddAmount = prompt("增加罰款：");
                let ReduceAmount = prompt("還款:");

                if (AddAmount == null || AddAmount == "") {
                  AddAmount = 0;
                }
                if (ReduceAmount == null || ReduceAmount == "") {
                    ReduceAmount = 0;
                }
                
                get(child(ref(db), "AllEmployees/"+ SearchEmpIDbox.value)).then((snapshot)=>{

                    if(snapshot.exists()){
                        
                        tempAmount = Number(snapshot.val().Amount);
                        Refbox.value = snapshot.val().Ref;
                        tempAmount = tempAmount + Number(AddAmount) - Number(ReduceAmount);

                        set(ref(db, "AllEmployees/"+ snapshot.val().EmpID),{
                            EmpID: snapshot.val().EmpID,
                            Name: snapshot.val().Name,
                            Amount: tempAmount,
                            Club: snapshot.val().Club,
                            Ref: snapshot.val().Ref
                            })
                            .then(()=>{
                                updateTime();
                            alert("data stored successfully");
                            })
                            .catch((error)=>{
                            alert("unsuccessful, error"+error);
                            });



                    }
                    else{
                        alert("No data found");
                    }
                    
                    })
                    .catch((error)=>{
                        alert("unsuccessful, error"+error);
                    });


               
              }


            insBtn.addEventListener('click', InsertData);
            selBtn.addEventListener('click', SelectData);
            searchBtn.addEventListener('click', SearchData);
            editBtn.addEventListener('click', editAmount);




            