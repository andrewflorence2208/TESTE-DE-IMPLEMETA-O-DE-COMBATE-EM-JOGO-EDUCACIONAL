function info(){
    document.getElementById("patern_screen").style.display = "none";
    document.getElementById("info_painel").style.display = "block";
}

function continuar(){
    document.getElementById("info_painel").style.display = "none";
    document.getElementById("patern_screen").style.display = "block";
}

function reiniciar(){
    document.location.reload(true);
}

//CHAR'S DECLARATIONS

const char = document.getElementById("char");

var stamina_bar = document.getElementById("char_stamina");
var stamina_value = parseFloat(stamina_bar.getAttribute("value"));

var life_bar = document.getElementById("char_life");
var life_value = parseFloat(life_bar.getAttribute("value"));


function stamina(v){
    v = parseFloat(v);
    stamina_value = stamina_value + v;
    stamina_bar.setAttribute("value", stamina_value.toFixed(2));
}

function life(v){
    v = parseFloat(v);
    life_value = life_value + v; 
    life_bar.setAttribute("value", life_value.toFixed(2));
}

//ENEMY'S DECLARATIONS

const enemy = document.getElementById("enemy");

var e_stamina_bar = document.getElementById("enemy_stamina");
var e_stamina_value = parseFloat(e_stamina_bar.getAttribute("value"));

var e_life_bar = document.getElementById("enemy_life");
var e_life_value = parseFloat(e_life_bar.getAttribute("value"));


function e_stamina(v){
    v = parseFloat(v);
    e_stamina_value = e_stamina_value + v;
    e_stamina_bar.setAttribute("value", e_stamina_value.toFixed(2));
}

function e_life(v){
    v = parseFloat(v)
    e_life_value = e_life_value + v;
    e_life_bar.setAttribute("value", e_life_value.toFixed(2));
}


//(atk_frq, def_frq, sta_atk, dmg_atk, sta_rec, hp_rec)

let vatk_frq = 50; vdef_frq = 50; vsta_atk = 25; vdmg_atk = 19; vsta_rec = 10; vhp_rec = 10;


// ANIMATIONS

function atk_animation(){
    char.classList.add("atk");
        
        setTimeout( () => {
            char.classList.remove("atk")
        }, 50);
}

function e_atk_animation(){
    enemy.classList.add("e_atk");
        
        setTimeout( () => {
            enemy.classList.remove("e_atk")
        }, 50);
}

// ACTIONS

    // SHOWS ATK OPTIONS
    function atk_opt(){
        document.getElementById("atk_opt").style.display = "block";
    }

    // HIDE ATK OPTIONS
    function cancel_atk(){
        document.getElementById("atk_opt").style.display = "none";
    };

function atk(sta, dmg, pc){
    sta = parseFloat(sta);
    dmg = parseFloat(dmg);
    pc = parseFloat(pc);


    //CRITICAL DMG TREATMENT
        critical_pc = (Math.random()*pc);
        critical_dmg = (((critical_pc/100)*dmg));
        

    total_dmg = parseFloat(((dmg + critical_dmg)).toFixed(2))
    
    if (((stamina_value - sta) >= 0)&&((e_life_value - total_dmg) > 0)){
    // IF THERES STAMINA AND THE ENEMY SURVIVE
        atk_animation()
        
        e_life(-Math.abs(total_dmg))
        stamina(-Math.abs(sta))

        document.getElementById("char_action").innerHTML = `dano:${Math.abs(dmg)} + critico:${Math.abs(critical_dmg.toFixed(2))}`;

    
        console.log(e_life_value, total_dmg)

    }else if((e_life_value - total_dmg) <= 0){
    //IF THE ENEMY DIE
        atk_animation()

        document.getElementById("char_action").innerHTML = "VENCEU";

        enemy.style.display = "none";
        document.getElementById("enemy_info").style.display = "none";

        document.getElementById("painel").innerHTML = 
        `<center><button class="button-pushable restart-button" role="button" onclick="reiniciar()">
        <span class="button-shadow"></span>
        <span class="button-edge"></span>
        <span class="button-front text">
          REINICIAR
        </span>
        </button></center>`;

       
    }else if((stamina_value - sta) <= 0){
    //IF THERES NO STAMINA
    document.getElementById("char_action").innerHTML = "recupere energia";
    };



//  !!! IA FUNCTION, CHANGE THE VALUES TO BALANCE

//(atk_frq, def_frq, sta_atk, dmg_atk, sta_rec, hp_rec)

ia(vatk_frq, vdef_frq, vsta_atk, vdmg_atk, vsta_rec, vhp_rec)
}

function def(sta, hp){
    stamina(sta);
    life(hp);

    document.getElementById("char_action").innerHTML = "def";

    if(stamina_value > 100){
// DOENST LET THE STAMINA VALUE PAST 100
        stamina( -Math.abs(stamina_value%100) )
    }

    if(life_value > 100){
// DOENST LET THE LIFE VALUE PAST 100
        life( -Math.abs(life_value%100) )
    }

    console.log(
        "life:"+ life_value+"\n"+
        "stamina:"+stamina_value+"\n"+
        "enemy life:"+e_life_value+"\n"+
        "enemy stamina:"+e_stamina_value
    )


//  !!! IA FUNCTION, CHANGE THE VALUES TO BALANCE
ia(vatk_frq, vdef_frq, vsta_atk, vdmg_atk, vsta_rec, vhp_rec)

}


// ಥ_ಥ       ╰（‵□′）╯       o(≧口≦)o      (⊙x⊙;)    ╚(•⌂•)╝   ENEMY ACTIONS AND  \\\ !!!  IA  !!!/// 

function e_atk(sta, dmg, pc){
    sta = parseFloat(sta);
    dmg = parseFloat(dmg);
    pc = parseFloat(pc);


    //CRITICAL DMG TREATMENT
        critical_pc = (Math.random()*pc);
        critical_dmg = (((critical_pc/100)*dmg));
        

    total_dmg = parseFloat(((dmg + critical_dmg)).toFixed(2))
    
    if (((e_stamina_value - sta) >= 0)&&((life_value - total_dmg) > 0)){
    // IF THERES STAMINA AND THE CHAR SURVIVE
        life(-Math.abs(total_dmg))
        e_stamina(-Math.abs(sta))
    

    }else if((life_value - total_dmg) <= 0){
    //IF THE CHAR DIE
        document.getElementById("enemy_action").innerHTML = "VENCEU!"

        char.style.display = "none";
        document.getElementById("char_info").style.display = "none";

        document.getElementById("painel").innerHTML = 
        `<center><button class="button-pushable restart-button" role="button" onclick="reiniciar()">
        <span class="button-shadow"></span>
        <span class="button-edge"></span>
        <span class="button-front text">
          REINICIAR
        </span>
        </button></center>`;

      
    }

e_atk_animation()

document.getElementById("enemy_action").innerHTML = `dano:${Math.abs(dmg)}+ critico:${Math.abs(critical_dmg.toFixed(2))}`;
}

function e_def(sta, hp){
    e_stamina(sta);
    e_life(hp);

    if(e_stamina_value > 100){
// DOENST LET THE STAMINA VALUE PAST 100
    e_stamina( -Math.abs(e_stamina_value%100) )
    }

    if(e_life_value > 100){
// DOENST LET THE LIFE VALUE PAST 100
    e_life( -Math.abs(e_life_value%100) )
    }
    console.log(
        "life:"+ life_value+"\n"+
        "stamina:"+stamina_value+"\n"+
        "enemy life:"+e_life_value+"\n"+
        "enemy stamina:"+e_stamina_value
    )

}


function ia(atk_frq, def_frq, sta_atk, dmg_atk, sta_rec, hp_rec){

    atk_frq = parseFloat(atk_frq);
    def_frq = parseFloat(def_frq);
    sta_atk = parseFloat(sta_atk);
    dmg_atk = parseFloat(dmg_atk);
    sta_rec = parseFloat(sta_rec);
    hp_rec = parseFloat(hp_rec);

    console.log(
        "life:"+ life_value+"\n"+
        "stamina:"+stamina_value+"\n"+
        "enemy life:"+e_life_value+"\n"+
        "enemy stamina:"+e_stamina_value
    )
if(e_life_value > 0){

    if((life_value < (e_life_value-dmg_atk))&&(e_stamina_value < (100 - sta_rec))){
    //IF ENEMY HAD MORE LIFE THAN THE DIFERENCE BETWEEN HIS LIFE LESS HIS DAMAGE AND CHAR LIFE, HIS CHANCES TO DEF INCREASE
        def_frq += (atk_frq / 2)
    };

    if( e_stamina_value == 0){
    //IF STAMINA EQUALS 0, HIS CHANCES TO ATK EQUALS 0  
        atk_frq = 0;
    }


    //CHANCES VARIATIONS
        atk_frq += (((Math.random()*10)/100)*atk_frq)
        def_frq += (((Math.random()*10)/100)*def_frq)

        console.log("atk chance"+atk_frq+"\n"+
                    "def chance"+def_frq
        )

    switch(atk_frq > def_frq){
        case(true):
            e_atk(sta_atk, dmg_atk, 90);
            console.log("enemy atk")
            
            break;
        case (false):
            e_def(sta_rec, hp_rec);
            console.log("enemy rest")
            document.getElementById("enemy_action").innerHTML = "def";
            break;
    };

}}
