import Store from './Store.js';
import APICall from './APICall'
import EventEmitter from 'eventemitter3';
import FieldAction from '../CustomBuilder/WorkflowManager/Functions/fieldAction'

const eventEmitter = new EventEmitter();
const workflow = {
  on_form_event:[
    {
      enabled:true,
      criteria_action_arr:[{
        condition: [],
        criteria: [
         /* {
              field: 'f1',
              operator: 'not_equals',
              value: 'A'
          },
    */
          
        
        ],
        action: [
         /* {
            field_id: 'test_field2',
            action_name: 'set_field_value',
            assign_value_type:'auto',
            source_form:'SO',
            source_key:'on_ac',
            
           },
           */
           {
            "action_name": "set_grp_value",
            "grp_name": "basic info",
            "grp_id": "basic_info",
            "assign_value_type": "auto",
            "source_form": "SO",
            "source_grp": "sample_grp"
           },
           {
            "action_name": "set_table_value",
            "assign_value_type": "auto",
            "source_form": "SO",
            "source_grp": "sample_grp"
           }
        ]
      }]
   
  }
  ]
  
}
class Utils {
  
  object_Store = {}
  
  genIDFieldCode =(code_val,prefix,suffix)=>{
    let genCode=''
    if(code_val){
      code_val = code_val.toLowerCase(); 
      code_val=code_val.replace(/\s/g,"_");
      code_val=code_val.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g,"");
      code_val=code_val.replace(")","");
      code_val=code_val.replace("[","");
      code_val=code_val.replace("]","");
      genCode =prefix+code_val+suffix
    }else{
      genCode =prefix+suffix
    }
    return genCode
  }
  
  genKey = (length) => {
     var result           = '';
     var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
     var charactersLength = characters.length;
     for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
     }
     return result;
  }

  log() {
      if(Store.getStoreData('is_debug'))console.log.apply(null, arguments)
    }

  copyObject = (obj) => {
    return JSON.parse(JSON.stringify(obj))
  }
  thousandsSeparators= (num) => {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }
    
  checkAuth = (result) => {
    if('message' in result && result.message === 'Unauthenticated.'){
        window.location.href = '/login'
        return
    }  
  }

//   isBase64(str) {
//       if (str ==='' || str.trim() ===''){ return false; }
//       try {
//           return btoa(atob(str)) == str;
//       } catch (err) {
//           return false;
//       }
//   }

//  System =[{command:"genNomenclature",data:[]}]
  
  system=(p)=>{
    switch (p.command){
      case "genNomenclature":
        return this.genNomenclature(p.data)
      case "currentFinYr":
        return this.genFinYear(p.data)
      case "get_city_list":
        return  this.testDropdownFetch(p.data)
      case "sys_gen":
        return this.sys_gen(p.data)
    }
  }
  
  genFinYear = (param) =>{
     param.fin_yy=23
     param.fin_yyyy=2023
    return param
  }
  
  genNomenclature =(param)=>{
    let gen =param.seq_formula.value
    if(!param.hasOwnProperty('fin_yy')||!param.hasOwnProperty('fin_yyyy')){
      this.genFinYear(param)
    }
    if(gen.length >0){
      gen =gen.replace(/{doc_type_code}/g,"PR")
      gen =gen.replace(/{branch_code}/g,"WB")
      gen =gen.replace(/{fin_yy}/g,param.fin_yy)
      gen =gen.replace(/{fin_yyyy}/g,param.fin_yyyy)
      gen = this.sequenceGen(gen,param)
    }else{
      gen ="No Preview"
    }
    return gen
    
  }
  
  testDropdownFetch = (param ) =>{
   console.log('Utils...!!!!' , param)
   let dependency_config = param.dependency_config
    console.log('dependency_config*******' , dependency_config)

   let rows = param.server_result.rows
   console.log('rows*******' , rows)
   let field_value = param.fields_arr[dependency_config.fields_source[0].field_name].value
   let filtered_row = rows.filter((el , i)=> el.record.state === field_value)
   console.log('filtered_row*******' , filtered_row)
   let items = {}
   let index = 0
   for(let x of filtered_row){
     items[index] = x.record.city
     index++
   }
   return items
  }
  
  
  sequenceGen=(gen,param)=>{
    console.log('--===',gen,' ====== ',param);
     
    let from=parseInt(param.seq_from.value)
    let to=parseInt(param.seq_to.value)
    let len =param.seq_to.value.length
    let next = 1//parseInt(param.next.value)
    if(next>to){
      next = from
    }else{
      next ++
    }
    gen =gen.replace(/{seq}/g,this.paddy(next,len-next.toString().length,'0'))
    
    
    return gen;
  }
  
  sys_gen = (data)=>{
    console.log('sys_gen' , data)
    return this.generateRandomString(4 , data)
    
  }
  
  paddy = (num, padlen, padchar)=> {
    var pad_char = typeof padchar !== 'undefined' ? padchar : '0';
    var pad = new Array(1 + padlen).join(pad_char);
    return (pad + num).slice(-pad.length);
}
 generateRandomString(n , type) {
    let randomString  = '';
    let characters  = 'ABCDEFGHIJKLMNOPhjsCBKjBCSkjbsckjbsCJbsACsBKCbCSksbjckC8722266476134134349464QRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    if(type === 'alpha_numeric'){
        characters  = 'ABCDEFGHIJKLMNOPhjsCBKjBCSkjbsckjbsCJbsACsBKCbCSksbjckC8722266476134134349464QRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for ( let i = 0; i < n; i++ ) {
         randomString += characters.charAt(Math.floor(Math.random()*characters.length));
        }
      
    }else if(type === 'alphabetic' ){
        characters = 'adkmbewopaslfhnaefafbkjawfvgnmvwyksngsipwbfkdxbwqipuncsvsk'    
        for ( let i = 0; i < n; i++ ) {
         randomString += characters.charAt(Math.floor(Math.random()*characters.length));
        }  
      
    }else{
        characters = 13354789964487514674125659672132546842492512575232697413636
        let no_container = []
         for ( let i = 0; i < n; i++ ) {
          no_container.push(Math.floor(Math.random() * 11)
         )
         randomString = no_container.toString().replace(/,/g, '')
        }      
      
    }
    
   return randomString;
}



criteriaFunction(fieldObj, dataObj) {
  console.log("criteriaFunction >>" , fieldObj , dataObj)
  // Initialize a flag to track whether any condition is met
  let conditionMet = true;

  // Iterate through the criteria in the fieldObj
  for (const criterion of fieldObj.criteria) {
    const field = criterion.field;
    const operator = criterion.operator;
    const value = criterion.value;

    // Check if the condition is met based on the operator and value
    let isConditionMet;
    if(dataObj[field]){
      switch(operator){
        case 'equals' :
          isConditionMet = dataObj[field] === value;
        
          break;
        case 'not_equals' :
          isConditionMet = dataObj[field] !== value;
         
          break;
        case 'starts_with':
          isConditionMet = dataObj[field].startsWith(value);
         
          break;
        case 'ends_with':
            isConditionMet = dataObj[field].endsWith(value);
       
            break;
        case 'contains':
            isConditionMet = dataObj[field].includes(value);
          
            break;
        case 'does_not_contains':
            isConditionMet = !dataObj[field].includes(value);
          
            break;

      }
    }else{
          isConditionMet = false
         
    }
    console.log(':', field, operator, value , isConditionMet)


    // Apply AND/OR logic based on the condition flag
    if(fieldObj.condition.length > 0){
      for (let cond of fieldObj.condition) {
          console.log('cond >>>>>' ,cond , conditionMet , isConditionMet , fieldObj)
        if (cond === 'AND') {
          conditionMet = conditionMet && isConditionMet;
         // console.log('cond >>>>> &&  and' ,conditionMet)
        } else if (cond === 'OR') {
          conditionMet = conditionMet || isConditionMet;
          //console.log('cond >>>>> || or' ,conditionMet)
        }
      }
    }else{
      conditionMet = conditionMet && isConditionMet;
    }

    console.log(':::', field, operator, value,  isConditionMet , '**' , conditionMet)

  }

  // If any condition is met, execute the action(s)
  if (conditionMet) {

    return fieldObj.action

  } else {
    return []
  }
}




 fieldAction(field, value) {
  return FieldAction.fieldAction(field, value)
  let workflow = Store.getStoreData('workflow');
  if (!workflow || !workflow.on_form_event) {
      return { action_str: '', value };
  }

  let data;
  if (!Store.getStoreData("table_row_modal_open")) {
      data = Store.getStoreData('data') ? JSON.parse(JSON.stringify(Store.getStoreData('data'))) : {};
  } else {
      data = Store.getStoreData('data_obj') || {};
  }

  let Parent_data = Store.getStoreData('Parent_data') || {};
  let action_obj = { action_str: '', value };

  for (let x of workflow.on_form_event) {
      if (!x.enabled) continue;

      for (let y of x.criteria_action_arr) {
          let action_arr = this.criteriaFunction(y, data);
          if (action_arr.length === 0) continue;

          for (let z of action_arr) {
              if (z.grp_id && field === z.grp_id) {
                  this.updateDataFromParent(z, Parent_data, data, action_obj , field);
              } else if (z.action_name === 'set_table_value') {
                this.updateTableValue(z, Parent_data, data);
              } else if (field === z.field_id) {
                this.handleFieldAction(z, Parent_data, data, action_obj, field);
              }
          }
      }
  }

  console.log('action_obj', action_obj, field);
  data[field] = action_obj.value
  if (!Store.getStoreData("table_row_modal_open")) {
    Store.updateStore('data' , data)
  }else{
    Store.updateStore("data_obj" , data)
  }
 
  return action_obj;
}

 updateDataFromParent(z, Parent_data, data, action_obj , field) {
  if (z.source_form in Parent_data) {
      action_obj.value = Parent_data[z.source_form][z.source_grp];
    //  data[field] = Parent_data[z.source_grp];
  }
}

 updateTableValue(z, Parent_data, data) {
  if (Parent_data && z.source_form && Parent_data[z.source_form] && z.source_grp !== undefined) {
      data[z.source_grp] = Parent_data[z.source_form][z.source_grp];
      Store.updateStore("data", data);
  }
}

 handleFieldAction(z, Parent_data, data, action_obj, field) {
  switch (z.action_name) {
      case 'set_field_value':
          this.setFieldValue(z, Parent_data, data, action_obj, field);
          break;
      default:
          action_obj.action_str = z.action_name;
  }
}

 setFieldValue(z, Parent_data, data, action_obj, field) {
  switch (z.assign_value_type) {
      case 'auto':
          if (z.source_form in Parent_data) {
              action_obj.value = Parent_data[z.source_form][z.source_field];
             
          } else {
              action_obj.value = data[field] || '';
          }
          break;
      case 'manual':
          action_obj.value = z.value;
          break;
      case 'formula':
          try {
              let formula = eval(z.formula);
              console.log("formula called" , field ,Store.getStoreData('data_obj') , data , z.formula , Store.getStoreData("table_row_modal_open"));
              action_obj.value = formula;
          } catch (error) {
              console.error('Error evaluating the formula:', error);
          }
          break;
  }
}




validate = (itemConfig , id1 ,id2 , id3 )=>{
  console.log('validate*** 1' , itemConfig , id1 , id2 , id3)
  let data = Store.getStoreData('data') ? Store.getStoreData('data') :{}
  let validation_status 
  let validation_message_arr
  let valid
 // let validation_status = this.validation(itemConfig)
  //console.log('validate*** 2' , validation_status)  
 // let {valid,validation_message_arr } = validation_status
  let validation_obj = Store.getStoreData('validation_obj')
  let valid_status = Store.getStoreData('valid_status')

  if(id3 === null){
    if(id2 === null){
      let value = data[id1]
      let v_mobj = {}
      validation_status = this.validation(itemConfig , value)
      validation_message_arr = validation_status.validation_message_arr
      valid = validation_status.valid
      v_mobj[id1] = validation_message_arr
      validation_obj[id1] = validation_message_arr
      valid_status[id1] = valid
    }else{
      let v_mobj = {}
      let v_sobj = {}
      let value = data[id1]?.[id2]
      validation_status = this.validation(itemConfig , value)
      validation_message_arr = validation_status.validation_message_arr
      valid = validation_status.valid
      v_mobj[id1] = validation_message_arr
      v_mobj[id1] = validation_message_arr
      v_sobj[id1] = valid
      validation_obj[id2] = v_mobj
      valid_status[id2] = v_sobj
    }
  }else{
    let v_mobj = {[id2]:{[id1]:validation_message_arr}}
    let v_sobj = {[id2]:{[id1]:valid}}
    let value = data[id1]?.[id2]?.[id3]
    validation_status = this.validation(itemConfig , value)
    valid = validation_status.valid
    validation_message_arr = validation_status.validation_message_arr
    valid = validation_status.valid
    v_mobj[id1] = validation_message_arr
    v_sobj[id1] = valid
    validation_obj[id3] = v_mobj
    valid_status[id3] = v_sobj
  }
  validation_obj[itemConfig.id] = validation_message_arr
  Store.updateStore('validation_obj' ,validation_obj)
  Store.updateStore('valid_status' , valid_status)
  return valid
}


validation = (itemConfig , value)=>{
  console.log('validation' , itemConfig , value)
  let v_obj = {}
  let v_message = {}
  let message = {}
  let validation_obj = itemConfig.validation
  let id = itemConfig.id
 // let value = itemConfig.value
  if(validation_obj){
    for(let x of validation_obj){
      if(x.enabled){
          v_obj[x.key] = x.ideal_val
          v_message[x.key] = `${x.message} ${typeof(x.ideal_val) === 'boolean' ? '' : x.ideal_val}`
      }
    }
  }
  

  let valid = this.fields_own_validate(value , v_obj).valid && this.fields_dependency_validate(id)
  let validation_message = this.fields_own_validate(value , v_obj).validation_message



  for(let k in v_message){
      if(validation_message[k] === false){
          message[k] = v_message[k]
      }
  }
  return ({valid,validation_message_arr : message})
}

fields_own_validate(value , v_obj){
  let valid = true
  let validation_message = {}
  console.log('fields_own_validate' , value , v_obj)
  for(let v in v_obj){
    console.log('fields_own_validate 1' , v)
    switch(v){
      case 'is_mandate' : 
          if(value){
            valid = value==='' ? false : valid && true
            validation_message[v] = value==='' ? false : true
          }else{
            valid =  false 
            validation_message[v] = false 
          }           
          
          break;         
      case 'max_char' :
        if(value){
          valid = value.length > v_obj[v] ? false : valid && true
          validation_message[v] = value.length > v_obj[v] ? false : true
        }       
        break;
      case 'min_char' :
        console.log('fields_own_validate min_char' , v , value)
        if(value){
          valid = value.length < v_obj[v] ? false : valid && true
          validation_message[v] = value.length < v_obj[v] ? false : true
        }
        break;

      case 'field_type' :
        if(value){
          switch(v_obj[v]){
            case 'alpha_numeric' :            
              valid = this.isAlphaNumeric(value) ? valid && true : false 
              validation_message[v] = this.isAlphaNumeric(value) ?  true : false
              
              break;

            case 'email' :
              valid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ? valid && true : false 
              validation_message[v] = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ? true : false
             
              break;

              

        }

      }
      break;
      case 'starts_with' :
        if(value){
          valid = value.startsWith(v_obj[v]) ?  valid && true : false 
          validation_message[v] = value.startsWith(v_obj[v]) ?  true : false
          break;
           
      }
      break;
      case 'ends_with' :
          if(value){
            valid = value.endsWith(v_obj[v]) ?  valid && true : false 
            validation_message[v] = value.endsWith(v_obj[v]) ?  true : false

            
             
      }
      break;
      case 'case' :
          if(value){
            switch(v_obj[v]){
              case 'upper' :
                 valid = value === value.toUpperCase() ?  valid && true : false 
                 validation_message[v] = value === value.toUpperCase() ?   true : false 

                 break;

              case 'lower' :
                 valid = value === value.toLowerCase() ?  valid && true : false 
                 validation_message[v] = value === value.toLowerCase() ?   true : false 

                 break;

            }                
      }        
      break;

    }
  }
  console.log('fields_own_validate ~~~~~~~++++~~~' , valid , validation_message)

  return {valid , validation_message}

  
}

isAlphaNumeric(str) {
  
  for (var i = 0; i < str.length; i++) {
    var char = str.charAt(i);
   
    // Check if the character is not a letter or a digit
    if (!(char >= 'a' && char <= 'z') &&
        !(char >= 'A' && char <= 'Z') &&
        !(char >= '0' && char <= '9')) {
      
      return false;
    }
  }
  
  return true;
}

fields_dependency_validate(id){
    return true
}



}

export default new Utils();