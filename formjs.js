sub=document.querySelector('#submit');
let endpoint= 'https://crudcrud.com/api/6fc3357694cf4fcbb84827a006d808e7';

//submit details
sub.addEventListener('click',(event)=>{
    event.preventDefault();
    Name=document.querySelector('#name').value;
    email=document.querySelector('#email').value;
    if(Name=="") return;
    let key={}
    key.Email=email;
    key.Name=Name;
   axios.post(endpoint+'/detail',key)
   .then(res=>console.log(res))
   .catch(err=>console.log("soumne"))
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
        console.log(arr);
    
    
    arr.forEach((e)=>{
        tr=document.createElement('tr');
        td1=document.createElement('td');
        td2=document.createElement('td');
        td3=document.createElement('td');
        td1.appendChild(document.createTextNode(e.Name));
        let text=""
        text+="Name : "+ e.Name+'<br>';
        text+="Email : "+ e.Email+'<br>';
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
        if(confirm('Are you sure ?'))
        event.target.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode);
    } 
    else if(event.target.classList.contains('Edit')){
        if(confirm('you can change only email and roll. Do you want to change ?')){
            Name=event.target.parentNode.parentNode.parentNode.firstElementChild.innerText;
            ele=JSON.parse(localStorage.getItem(Name));
            document.querySelector("#name").value=ele.Name;
            document.querySelector("#roll").value=ele.Roll;
            document.querySelector("#email").value=ele.Email;
        }
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
