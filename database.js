if(!localStorage.getItem("users")){
  localStorage.setItem("users",JSON.stringify([
    {
      name:"Raynan",
      password:"RaynanM_30",
      role:"admin",
      status:"approved"
    }
  ]));
}

function getUsers(){
  return JSON.parse(localStorage.getItem("users"));
}

function saveUsers(u){
  localStorage.setItem("users",JSON.stringify(u));
}
