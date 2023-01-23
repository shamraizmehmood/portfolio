const api_url = 'https://www.floatrates.com/daily/usd.json'; // link the json data from api
let total_amount = rate = totals =value= value_second= 0;
let Source_currency =Destination_Currency=Current_Exchange_Rate=Calculation_Timestamp =Amount_of_transaction ="";
let source_c= destination_c = currency_code =val_first=val_second= "";
 


//------------------------------------------------------------------
async function getData(){

    const response = await fetch(api_url); // fetch the data from api
    const jsonData = await response.json(); // strore json data in variabel
    //------------------------------------------------------
    var select=document.getElementById('dropdown')
    var select_from =document.getElementById('dropdown-from')
    for(let i in jsonData){
       
        var option = document.createElement('option');
       var option_from = document.createElement('option');
        var dropdown_value = document.getElementById("dropdown_value");

       
       option.text = option.value = jsonData[i].name +"    " +jsonData[i].code;
       option_from.text = option_from.value = jsonData[i].name +"  " +jsonData[i].code;
       select.add(option, 0);              
       select_from.add(option_from, 0); 
    }
    //---------------------upper part value change--------------------------------------------
     val_first = document.getElementById("dropdown").value.slice(-3);
     value = jsonData[val_first.toLowerCase()]['inverseRate'];
     Source_currency = jsonData[val_first.toLowerCase()]['name'];
     Calculation_Timestamp = Date(Date.now());
     var convert_first= document.getElementById("dropdown_value");
     convert_first.innerHTML = value;
    // ---------------------------lowwer part value change-----------------------------------
    val_second = document.getElementById("dropdown-from").value.slice(-3);
    value_second = jsonData[val_second.toLowerCase()]['rate'];
    Destination_Currency = jsonData[val_second.toLowerCase()]['name'];
    var convert_second= document.getElementById("dropdown_value_second");
    convert_second.innerHTML = value_second;
//--------------------------------------------------------------------------------------------
    rate = value;
    }

function updateValue(){
   
    var val_first = document.getElementById("dropdown").value.slice(-3);
    var val_second = document.getElementById("dropdown-from").value.slice(-3);

     var value = jsonData[val_first.toLowerCase()]['rate'];

     var convert_first= document.getElementById("dropdown_value");
     convert_first.value = value;

}

 function opctfnt(){
    document.getElementById("converter-outer").style.opacity='1';
    document.getElementById("output_display").style.opacity = "1";
    var total_amount=document.getElementById("Amount");
    var input_amount = total_amount.value;
    var total = value*input_amount*value_second;
    var changer = value * value_second;

    let Source_currency_value =document.getElementById('to_value');
    Source_currency_value.innerHTML = Source_currency;


    let Destination_Currency_value =document.getElementById('from_value');
    Destination_Currency_value.innerHTML = Destination_Currency;

    let Calculation_Timestamp_in  =document.getElementById('Timestamp');
    Calculation_Timestamp_in.innerHTML = Calculation_Timestamp ;
    console.log(Calculation_Timestamp.toString());

    let Current_Exchange_Rate  =document.getElementById('display');
    Current_Exchange_Rate.innerHTML = "1 "+ Source_currency+ " = " +changer + " "+ Destination_Currency ;

    let Amount_of_transaction =document.getElementById('total');
    Amount_of_transaction.innerHTML = input_amount +"  "+ val_first+" = "+ Math.floor(total) +" "+val_second ;

    
 
 }














