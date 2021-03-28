




export  function up(string) {
    count = count + 1;
    
    if ( count > 4)
        return "bad";
    else
        return "good"

    
}

export  function down(string) {
    count = count - 1;
    if(count < 0)
        count = 0 ;
    console.log(count);
   

    
}

export let count = 0 ;

export let sightsSeeing = [];
export let nights = [];
export let sightsChecked = []; // 
export let actuallSightsChecked = [];  
export let NightLifeChecked = [];  //
export let sorted = [];
export let inputShowSightSeeing = "";
export let locationCount = "";

export let lan_sight = 0; 
export let lng_sight = 0; 

