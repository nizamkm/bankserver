const jwt=require('jsonwebtoken')
database={
    1000:{acno:1000,uname:"akshay",password:"1000",balance:5000,transaction:[]},
    1001:{acno:1001,uname:"akash",password:"1001",balance:5000,transaction:[]},
    1002:{acno:1002,uname:"ashwin",password:"1002",balance:5000,transaction:[]}
  
  }
   const register=(acno,uname,password)=>{
    // let database=this.data
    if(acno in database){
      return{
          status: false,
          statuscode:401,
          message:"account already exist"
    }
}
    else{
      database[acno]={
        acno,
        uname,
        password,
        balance:0,
        transaction:[]

      }
    //   this.saveDetails()
      return{
        status:  true,
        statuscode:200,
        message:"account successfully created"
    }
  }
}
const login=(acno,pswd)=>{
 
  if(acno in database){
  if(pswd==database[acno]["password"]){
   currentUsername= database[acno]["uname"]
  //  req.session.currentacno=acno

  //  console.log(req.session)
  //  this.saveDetails()
  const token=jwt.sign({
    currentacno:acno
  },'superkey123456')

  
    return{
      status:  true,
      statuscode:200,
      message:"login successfully",
      currentUsername:currentUsername,
      
      token
  }
  }
  else{
   
    return {
      status: false,
      statuscode:401,
      message:"invalid password"
}
  }
}
else{
 
  return  {
    status: false,
    statuscode:401,
    message:"user does not exist"
}
}
}
const deposit=(acno,password,amnt)=>{

  var amount=parseInt(amnt)
  
    if(acno in database){
      if(password==database[acno]["password"]){
        database[acno]["balance"]=database[acno]["balance"]+amount
        database[acno]["transaction"].push({
          type:"credit",
          amount:amount
        })
        // console.log(database[acno]["transaction"]);
        return {
        status:  true,
        statuscode:200,
        message:amount+"is debited and your balance is:"+database[acno]["balance"]
       
        
   
    }
   }
    else{
      
   
      return {
       status: false,
       statuscode:401,
       message:"invalid password"
   }
   
    }
   }
    else{
      
      return   {
       status: false,
       statuscode:401,
       message:"user does not exist"
   }
    }

  }
  
//  let database=this.data



const withdraw=(acno1,password1,amnt1)=>{

  var amount=parseInt(amnt1)
//  let database=this.data
 if(acno1 in database){
   if(password1==database[acno1]["password"]){

    if(database[acno1]["balance"]>amount){
      
      database[acno1]["balance"]=database[acno1]["balance"]-amount
      database[acno1]["transaction"].push({
        type:"debit",
        amount:amount
      })
      return {
        status:  true,
        statuscode:200,
        message:amount+"is debited and your balance is:"+database[acno1]["balance"]
 
    }
  }
    else{
      return {
        status: false,
        statuscode:401,
        message:"insufficient balance"
    }
  }
    
 }
 else{
  return {
    status: false,
    statuscode:401,
    message:"invalid password"

 }
}
 }
 else{
  return   {
    status: false,
    statuscode:401,
    message:"user does not exist"
}
 }

}
const getTransaction=(acno)=>{
  if(acno in database){
    return{
      status:true,
      statuscode:200,
      transaction:database[acno]["transaction"]
    }
  }
}

  module.exports={
    register,
    login,
    deposit,
    withdraw,
    getTransaction
  }