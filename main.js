const student = {
    firstname : "",
    lastname : "",
    age: 0,
    grades: {
        english: 0,
        math: 0,
        science: 0,
        physed: 0,
        printGrades(){
            // console.log("--- Grades ---");
            for( const [key, value] of Object.entries(this)){
                if(typeof value === 'function' ){
                    break;
                }
                // console.log(key, value + "%");
                
            }
            return;
        },
        displayGrades(){
            const para = document.createElement('p');
            const head = document.createElement('h3');
            const headnode = document.createTextNode("Grades");
            head.appendChild(headnode);
            document.body.appendChild(head);
            function newSubjectToGrade(key, value){
                function interpretGrade(num){
                    if(num >= 90){
                        return "A";
                    }else if(num >= 80){
                        return "B";
                    }else if(num >= 70){
                        return "C";
                    }else if(num >= 60){
                        return "D";
                    }else{
                        return "F";
                    }
                }
                const blanknode = document.createElement('br');
                const node = document.createTextNode(key + ": " + value + "% = " + interpretGrade(value));
                para.appendChild(node);
                para.appendChild(blanknode);
                document.body.appendChild(para);
            }
            for( const [key, value] of Object.entries(this)){
                if(typeof value === 'function' ){
                    break;
                }
                newSubjectToGrade(key, value);
            }

        }
        
    },

    //methods
    printInfo(){
        // console.log("---------- Student Information ----------");
        // console.log("Student's Name: " + this.firstname + " " + this.lastname);
        // console.log("Age: " + this.age);
        //todo print grades
        this.grades.printGrades();

        this.displayStudentInfo();
        
    },
    displayStudentInfo() {
        const para = document.createElement('p');
        const head = document.createElement('h1');
        const headnode = document.createTextNode("Student Info");
        head.appendChild(headnode);
        document.body.appendChild(head);
        function newPara(key, value){
            const blanknode = document.createElement('br');
            const node = document.createTextNode(key + ": " + value);
            para.appendChild(node);
            para.appendChild(blanknode);
            document.body.appendChild(para);
        }
        for( const [key, value] of Object.entries(this)){
            if(typeof value === 'function' || typeof value === 'object'){
                break;
                //skips methods and other objects that aren't necessary to be read and sent to the webpage
            }
            // console.log(typeof value);
            // console.log("new para attempted");
            newPara(key, value);
            
        }

        
          //console.log("New line created.");
          this.grades.displayGrades();
      }

}

// student.printInfo();

//body html things
let numberOfStudents = prompt("How many students would you like to generate?");
FillInfo(numberOfStudents);
// FillInfo(4);







//random things 

function FillInfo(int){
    let objects = [];
    for(i = 0; i < int; i++){
        //creates new object in the array for a student
        objects.push(student)
        //generates a random first and last name using the generatenames function
        let  [firstName, lastName] = generateName(pickRandom(['male', 'female']));
        objects[i].firstname = firstName;
        objects[i].lastname = lastName;
        //random age between 15 - 18 for some random highschool student ages
        objects[i].age = Math.floor(Math.random() * (18 - 15) + 15);
        //fill grades
        for(const property in objects[i].grades){
            if(typeof objects[i].grades[property] === 'function' ){
                break;
            }
            objects[i].grades[property] = randomPercent();
        }
        objects[i].printInfo();
    }
}

function randomPercent(){
    var num = Math.floor(Math.random() * (100 - 60) + 60);
    return num;
}

  //random name generator things
  //made from https://theunlikelydeveloper.com/random-name-generator-javascript/
  function fetchNames(nameType){
    switch(nameType) {
        case 'female':
            names = ['Dandy', 'Jen', 'Jacky', 'Carol', 'Sherry', 'Natalia', 'Mel', 'Marie', 'Veronica', 'Tay'];
            break;
        case 'male':
            names = ['Joe', 'John', 'Mack', 'Fred', 'Louis', 'Jerry', 'Bob', 'Hunter', 'Matt', 'Zach', 'Mort'];
            break;
        case 'surnames':
            names = ['Burgen', 'Duncan', 'Lazarus', 'Danner', 'Castone', 'Rayla', 'Guzzman', 'Wilfard', 'Weatherman', 'Morton', 'Mackey', 'Kennedy'];
            break;
    }
    return {data: names}
  }

function generateName(gender) {
    // Fetch the names
    const firstNames = fetchNames(gender || pickRandom(['male', 'female']));
    const lastNames = fetchNames('surnames');
  
    // Pick a random name from each list
    const firstName = pickRandom(firstNames.data);
    const lastName = pickRandom(lastNames.data);
    let name = [`${firstName}`, `${lastName}`];
    // Use a template literal to format the full name
    console.log(name);
    return name;
    //I chose to return an array because I wanted the first and last name to be separate variables for my object
  }

  function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
  }