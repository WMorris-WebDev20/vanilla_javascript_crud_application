// Variables
const baseURL = "https://api.vschool.io/williammorris/todo/";
let todoData = [];
let counter = 0; 
const ultDiv = document.getElementById("ulDiv");
const postIcon = document.getElementById("postIcon");
const subButton = document.getElementById("submit");
const completeMessage= ["complete", "incomplete"];
const postForm = document.postForm;

//Part 1 GET
async function getData(){  
    try{
        const toDoLists = await axios.get(baseURL);
        console.log(toDoLists)
        todoData = toDoLists.data;

    }
    catch(error){
        console.log(error);
    }
}

//Part 2  POST

postForm.addEventListener("submit",(event)=>{
    event.preventDefault()    
    const createTodo = {
        title: postForm.title.value,
        description: postForm.description.value,
        imgUrl: postForm.imgUrl.value,
        price: postForm.price.value
    }   
    axios.post(baseURL, createTodo)
        .then(response => {
            console.log("Posted Post data")
            getRequest()
            erasePostInputValues()
         } )
        .catch(error => console.log("Helo"+error))      
});

// Part 3 PUT
completeItem=(data, updates)=>{
        
        axios.put(`${baseURL}${data}`, updates)
            .then(response => {
                console.log(response.data)                
            })
            .catch(error => console.log(error))
    }
    
updateData = (event , id)=>{
        event.preventDefault()
        const updateTodo = {
            title: uform.title.value,
            description: uform.description.value,
            imgUrl: uform.image.value,
            price: uform.price.value 
        } 
        axios.put(`${baseURL}${id}`, updateTodo)
            .then(response => {
                console.log(response.data)
                updateAllData()
                getData()
            })
            .catch(error => console.log(error))
    }

//Part 4 DELETE
deletePost=(data, title, index, ulId)=>{    
        axios.delete(`${baseURL}${data}`)    
        .then(response => {
            console.log(response.data);
            let toDelete;    
            toDelete =todoData.findIndex( i => i.id === index);
            var elem = document.querySelector(`#${ulId}`);
        elem.parentNode.removeChild(elem);
            todoData.splice(toDelete, 1);
        })
        .catch(error => console.log(error))     
}
    //Functions
//Main content function

function createData(data){    
    
    let ulId = "ulId" + counter;     
    counter++

    console.log(data)

    const ul = document.createElement('ul');
    ul.id= ulId;
    const formDiv = document.createElement("div")
    formDiv.classList.add("formDiv2")
    const uform = document.createElement("form");
    uform.classList.add("updateForm")
    uform.name = "updateForm";

    const closeForm = document.createElement("button");
    closeForm.className="fas fa-times-circle";
    closeForm.classList.add("updatePost");
    formDiv.appendChild(closeForm)

    const title = document.createElement("INPUT");
    title.name = "title";
    
    title.value = data.title;
    title.placeholder = "Title...";
    uform.appendChild(title);

    const description = document.createElement("INPUT");
    description.name="description";
    description.placeholder = "Description...";
    description.value = data.description
    uform.appendChild(description);
    
    const image = document.createElement("INPUT");
    image.name = "image";
    image.placeholder = "Image Url...";
    image.value = data.imgUrl;
    uform.appendChild(image);

    const price = document.createElement("INPUT");
    price.name = "price";
    price.placeholder = "Value....";
    price.value = data.price
    uform.appendChild(price)

    const submit = document.createElement("button");
    submit.textContent="Update"
    uform.appendChild(submit)
    formDiv.appendChild(uform)
    ul.appendChild(formDiv)
    formDiv.style.display = "none";

    const titleLi = document.createElement('li');
    const subul= document.createElement('ul');
    const descriptLi = document.createElement('li');
    const priceLi = document.createElement('li');
    const imgLi = document.createElement("div");
    const picture = document.createElement("img");
    imgLi.classList.add("divImage");
    imgLi.value = data._id;

    const buttonDiv = document.createElement('div');         
    const div2 = document.createElement("buttonDiv");
    div2.classList.add("div2");

    const update = document.createElement("button");
    update.className = "fas fa-edit ";
    update.classList.add("edit");
    update.value = data._id;

    const checkMe = document.createElement("INPUT");
    checkMe.setAttribute("type", "checkbox");
    checkMe.classList.add("checkMe");
    checkMe.value = data._id;

    const checkMeLabel = document.createElement("LABEL");
    checkMeLabel.classList.add("labelCheck");
    checkMeLabel.textContent = "Done";

    const deleteMe = document.createElement("i");
    const deleteThisPost = document.createElement("button")
    deleteThisPost.className="far fa-trash-alt ";
    deleteThisPost.classList.add("delete");
    deleteThisPost.id = data._id; 

    titleLi.textContent = data.title;

    hasPic(data.imgUrl, imgLi , picture); 

    descriptLi.textContent = data.description;
    descriptLi.classList.add("subLi");
    priceLi.textContent = data.price;
    priceLi.classList.add("subLi");
    buttonDiv.classList.add("divCheck");

    isDone(data, priceLi , descriptLi,titleLi, checkMe);     
    
    subul.appendChild(titleLi);        
    subul.appendChild(descriptLi);
    subul.appendChild(priceLi);
    subul.appendChild(buttonDiv);
    subul.appendChild(div2);        
    
    buttonDiv.append(checkMe)
    buttonDiv.append(checkMeLabel)
    buttonDiv.append(update)            
    buttonDiv.append(deleteThisPost)
    
    ul.appendChild(imgLi);        
    imgLi.appendChild(subul);
    ulDiv.appendChild(ul);

    //To add on top of elements
    const toPlace = document.querySelector("ul");
    toPlace.parentNode.insertBefore(ul, toPlace)
    
    formDiv.addEventListener("submit", (event) =>{
        event.preventDefault()
        formDiv.style.display = "none"; 
        imgLi.style.display = "flex";

        const updateTodo = {
            title: uform.title.value,
            description: uform.description.value,
            imgUrl: uform.image.value,
            price: uform.price.value 
        } 
        titleLi.textContent= uform.title.value;
        descriptLi.textContent = uform.description.value;
        priceLi.textContent = uform.price.value;
        picture.src = uform.image.value; 
        hasPic(uform.image.value, imgLi , picture);

        axios.put(`${baseURL}${data._id}`, updateTodo)
            .then(response => {
                console.log(response.data)
                updateAllData()
            })
            .catch(error => console.log(error))
    });
    closeForm.addEventListener("click", ()=>{
        formDiv.style.display = "none";
        imgLi.style.display = "grid";
    }) ;
    update.addEventListener("click", ()=>{
        imgLi.style.display = "none";
        formDiv.style.display = "block";
    });
    checkMe.addEventListener('change', ()=>{                    
        if(checkMe.checked){
            let updates = {
                completed: true
            }
            completeItem(data._id,updates)
            crossOut(titleLi,descriptLi,priceLi, updates.completed);                               
        }else{
            let updates = {
                completed: false
            }
            completeItem(data._id,updates)
            crossOut(titleLi,descriptLi,priceLi, updates.completed)
        }
    }, false);

    deleteThisPost.addEventListener('click', ()=>{
                deletePost(data._id, data.description, deleteThisPost.value , ulId)
                ul.style.display = "none"
        })
    } 


addNewElement = (data) =>{
        const newElement = createData(data);
    }
isDone=(info, el1 , el2, el3, checked)=>{
    if (info.completed){
        el1.style.textDecoration = "line-through";
        el2.style.textDecoration = "line-through";
        el3.style.textDecoration = "line-through";
        checked.checked = true;
    }
}
hasPic=(info, element, picture)=>{
    if(info == null|| info == ""){

        picture.style.display = "none"
        element.style.display = "flex"
        
    } else {
        picture.src = info; 
        element.append(picture);
        picture.alt = "Picture: " + info;
        picture.style.display= "grid"
        element.style.display = "grid"
        
    }
}
crossOut=(titleLi,descriptLi, priceLi, tocross)=>{
    if (tocross){
        titleLi.style.textDecoration = "line-through";
        descriptLi.style.textDecoration = "line-through";                                        
        priceLi.style.textDecoration = "line-through"; 
    }else{
        titleLi.style.textDecoration = "none";
        descriptLi.style.textDecoration = "none";                                        
        priceLi.style.textDecoration = "none"; 

    }                
}
erasePostInputValues = ()=>{
    postForm.title.value = "";
    postForm.description.value= "";
    postForm.imgUrl.value = "";
    postForm.price.value = "";
}

 async function getRequest(){
    const toDoLists = await axios.get(baseURL);    
    todoData.push(toDoLists.data[todoData.length]); 
    createData(todoData[todoData.length-1] )
}

async function updateAllData(){
    try {        
        while(todoData.length > 0){
            todoData.pop();
        } 
        getData()   
    } catch (error) {
        console.log(error)
    }   
}
// Bootstrap
const bootstrap = async () => {
    
    try {  
            await getData();
            for(let i = 0 ; i < todoData.length; i++){
                createData(todoData[i]); 
            }
      }
        catch (err) {
            console.log(err);
      }
  };
bootstrap();