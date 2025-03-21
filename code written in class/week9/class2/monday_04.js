class Person {
    #ssn //???


    static thing = 'earth';
    

constructor(name,age, ssn){
this.name = name;
this.age = age;
this.#ssn = ssn; //???
}//end of constructer

static makeYoungPerson(name){ 
    //const age = Math.floor
}

conplain(){
 if (this.age> 50){
    console.log("blah blah blah money")
 } else {
    console.log("blah poor blah")
 }    
}//end of complain
reveal(){
    console.log(this.#ssn);
}//end of reveal



}//end of Person
// 
// 

const me = new Person ('travivs' , 25 , 1111111)


class Animal {
    constructor(name,voice){
        this.name = name;
        this.voice = voice
    }
}


class Duck extends Animal{
    constructor(name){
        super(name, 'quack');
    }
    
}

