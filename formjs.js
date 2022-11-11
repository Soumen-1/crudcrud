sub=document.querySelector('#submit');
let token='303698a1adfc49f5ab604a9f3e532141'
let endpoint= 'https://crudcrud.com/api/'+token;

//submit details
//class of flag
class flag{
    static updateFlag=false;
    static updateData='';
    static updateMail='';
}


sub.addEventListener('click',(event)=>{
    event.preventDefault();
    Name=document.querySelector('#name').value;
    email=document.querySelector('#email').value;
    ph=document.querySelector('#phNo').value;
    if(Name=="") return;
    let key={}
    key.Email=email;
    key.Name=Name;
    key.ph=ph;
   axios.post(endpoint+'/detail',key)
   .then(res=>console.log(res))
   .catch(err=>console.error(err))
});

//show details

userDetail=document.getElementById('user-detail');
showbtn=document.querySelector('#showbtn');
showbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    userDetail.innerHTML=null;
    table=document.createElement('table');
    table.id='tc';
    tr=document.createElement('tr');
    th1=document.createElement('th');
    th2=document.createElement('th');
    th3=document.createElement('th');
    th1.appendChild(document.createTextNode('Name'));
    th2.appendChild(document.createTextNode('Detail'));
    th3.appendChild(document.createTextNode('Edit/Delete'));
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    table.appendChild(tr);
    let arr=[];
    axios.get(endpoint+'/detail')
    .then(res=>{
        arr=res.data;
    arr.forEach((e)=>{
        tr=document.createElement('tr');
        td1=document.createElement('td');
        td2=document.createElement('td');
        td3=document.createElement('td');
        td1.appendChild(document.createTextNode(e.Name));
        let text=""
        text+=`Name : <span>${e.Name}</span> <br>`;
        text+=`Email : <span>${e.Email}</span> <br>`;
        text+=`Phone No : <span>${e.ph}</span> <br>`;
        td2.innerHTML=text;
        td3.innerHTML='<button>Delete</button><br><a href="#main" style="text-decoration:none;"><button>Edit</button></a>'
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        td3.children[0].className='as delete';
        td3.children[2].firstElementChild.className='as Edit';
        table.appendChild(tr);
    })
})
.catch(err=>console.error(err))
userDetail.appendChild(table);
});
//localStorage.clear();


// add yellow effect on focus in input field
input=document.querySelectorAll('.input');
Array.from(input).forEach((e)=>{
    e.addEventListener('focusin',()=>{e.style.background='#f1e2ab'});
    e.addEventListener('focusout',()=>{e.style.background='#ffffff'});
});

//remove Child
userDetail.addEventListener('click',(event)=>{
    if(event.target.classList.contains('delete')){
        if(confirm('Are you sure ?')){
            let email= event.target.parentNode.parentNode.children[1].querySelectorAll('span')[1].innerText;
            //console.log(email)
            event.target.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode);
            axios.get(endpoint+'/detail')
            .then(res=>{
                res.data.forEach(e=>{
                    if(e.Email==email){
                        axios.delete(`${endpoint}/detail/${e._id}`);
                    }
                })
            })
            .catch(err=>console.error(err))
        }
    } 
    else if(event.target.classList.contains('Edit')){
        if(confirm('you can change only name and phone no. Do you want to change ?')){
            flag.updateFlag=true;
            flag.updateData= event.target.parentNode.parentNode.parentNode.children[1].querySelectorAll('span');
            flag.updateMail=flag.updateData[1].innerText;
            document.querySelector("#name").value=flag.updateData[0].innerText;
            document.querySelector("#email").value=flag.updateData[1].innerText;
            document.querySelector("#phNo").value=flag.updateData[2].innerText;

        }
    }
});
document.querySelector('#update').addEventListener('click',(event)=>{
    event.preventDefault();
    if(flag.updateFlag){
        let data=flag.updateData;
        let putData={
            Name : `${document.querySelector("#name").value}`,
            Email: `${document.querySelector("#email").value}`,
            ph :`${document.querySelector("#phNo").value}`
        }
        console.log(flag.updateMail)
        axios.get(endpoint+'/detail')
        .then(res=>{
            res.data.forEach(e=>{
                if(e.Email==flag.updateMail){
                    axios.put(`${endpoint}/detail/${e._id}`,putData)
                    .then(res=>console.log(res.data))
                    .catch(err=>console.error(err))
                }
            });
            flag.updateFlag=false;
            flag.updateData='';
            flag.updateMail='';
        })
        .catch(err=>{
            console.error(err);
            flag.updateFlag=false;
            flag.updateData='';
            flag.updateMail='';
        });
    }
    else{
        alert('Nothing to Edit');
    }
});
//hover opacity on the add user
main=document.querySelector("#main");
main.addEventListener('focusin',()=>{
    main.style.opacity=1;
},true)
main.addEventListener('focusout',()=>{
    main.style.opacity=.5;
},true)
