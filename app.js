/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchBySingleOrMultiTrait(people)
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = promptFor(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
         displayPerson(person[0]);
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);
            alert(personFamily);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            alert(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        case "test":
            searchByMultiTraits()
            break;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    return(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `DOB: ${person.dob}\n`;
    personInfo += `Height: ${person.height}\n`;
    personInfo += `Weight: ${person.weight}\n`;
    personInfo += `Eye Color: ${person.eyeColor}\n`;
    personInfo += `Occupation: ${person.occupation}\n`;
    //! TODO #1a: finish getting the rest of the information to display ////////////////////////////////////////// Dont need parents or currentspouse here.
    alert(personInfo);
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁


function searchByTrait(people){
    let userInputProp = promptFor("Please enter what specific trait you would like to search by:\ngender\ndob\nheight\nweight\neyeColor\noccupation");
    let userInputVal = promptFor("Please enter the value you would like to search for.");
    let results = people.filter(
        function (person){
            if(person[userInputProp] === userInputVal || +userInputVal === person[userInputProp]){
                return true;
            }
        }
    );
    return results;
}


function findPersonSpouse(person, people){
    let personFound = person
    let personFoundSpouse = people.filter(
        function (person){
            if(personFound.currentSpouse === person.id){
                return true
            }
        }
    );
    return personFoundSpouse
}

function findPersonParents(person, people){
    let personFound = person
    let personFoundParents = people.filter(
        function (person){
            if(personFound.parents[0] === person.id || personFound.parents[1] === person.id){
                return true
            }
        }
    );
    return personFoundParents
}

function findPersonSiblings(person, people){
    let personFound = person
    let personFoundSiblings = people.filter(
        function (person){
            if(personFound.firstName != person.firstName && personFound.parents[0] === person.parents[0] ){
                return true
            }
        }
    );
    return personFoundSiblings
}

function findPersonFamily(person, people){
    let foundSpouseArray = findPersonSpouse(person, people)
    let foundParentsArray = findPersonParents(person, people)
    let foundSiblingsArray = findPersonSiblings(person, people)
    // stringifing family 
    let foundSpouseString = displayPeople(foundSpouseArray) // "Spouse: Billy Bob"
    let foundParentsString = displayPeople(foundParentsArray) // "Billy Bob\nUma Bob"
    let foundSiblingsString = displayPeople(foundSiblingsArray)

    let relationSpouseString = `Spouse: ${foundSpouseString}\n`
    let relationParentsString = `Parents: ${foundParentsString}\n`
    let relationSiblingsString = `Siblings: ${foundSiblingsString}\n`

    return relationSpouseString + relationParentsString + relationSiblingsString
}

function findPersonChildren(person, people){
    let personFound = person
    let personFoundDescendants = people.filter(
        function (person){
            if(person.parents.includes(personFound.id)){
                return true
            }
        }
    );
    return personFoundDescendants
}

function findPersonDescendants(person, people){
    let foundChildrenArray = findPersonChildren(person, people)

    let foundChildrenString = displayPeople(foundChildrenArray)

    return foundChildrenString
}


function searchByMultiTraits(people){
    let userInput = promptFor("Please enter what trait you would like to search by:\ngender\ndob\nheight\nweight\neyeColor\noccupation:")
    switch (userInput) {
        case "gender":
            getGender = searchByGender(people);
            return getGender;
        case "dob":
            getDOB = searchByDOB(people);
            return getDOB;
        case "height":
            getHeight = searchByHeight(people);
            return getHeight;
        case "weight":
            getWeight = searchByWeight(people);
            return getWeight;
        case "eyeColor":
            getEyeColor = searchByEyeColor(people)
            return getEyeColor;
        case "occupation":
            getOccupation = searchByOccupation(people)
            return getOccupation;
        default:
            alert("That's not a option, Try again!")
            searchByMultiTraits(people);
            break;
    }
}

function searchByGender(people){
    let userInput = promptFor("Please select a gender to search by:\nmale\nfemale");
    let results = people.filter(
        function(person){
            if(userInput === person.gender){
                return true;
            }
        }
    );
    return results
}

function searchByDOB(people){
    let userInput = promptFor("Please enter DOB in the format mm/dd/yyyy:");
    let results = people.filter(
        function(person){
            if(userInput === person.dob){
                return true;
            }
        }
    );
    return results
}

function searchByHeight(people){
    let userInput = promptFor("Please enter height using numbers only:");
    let results = people.filter(
        function(person){
            if(userInput === person.height){
                return true;
            }
        }
    );
    return results
}

function searchByWeight(people){
    let userInput = promptFor("Please enter weight using numbers only:");
    let results = people.filter(
        function(person){
            if(userInput === person.weight){
                return true;
            }
        }
    );
    return results
}

function searchByEyeColor(people){
    let userInput = promptFor("Please enter the eye color:\ngreen\nbrown\nblack\nblue\nhazel");
    let results = people.filter(
        function(person){
            if(userInput === person.eyeColor){
                return true;
            }
        }
    );
    return results;
};

function searchByOccupation(people){
    let userInput = promptFor("Please enter the occupation:\nassistant\nnurse\ndoctor\nlandscaper\nstudent\nprogrammer\npolitican\narchitect");
    let results = people.filter(
        function(person){
            if(userInput === person.occupation){
                return true;
            }
        }
    );
    return results;
};

function searchBySingleOrMultiTrait(people){
    let userInput = promptFor("Search using multiple or single trait? Press 1 for single or 2 for multiple:");
    switch (userInput){
        case "1":
            results = searchByTrait(people);
            break;
        case "2":
            results = searchByMultiTraits(people);
            displayPeople(results);
            while(results.length > 1){
                alert("Pick another trait to get better results:\ngender\ndob\nheight\nweight\neyeColor\noccupation");
                results = searchByMultiTraits(results);
                displayPeople(results);
            }
            break;
        default:
            searchBySingleOrMultiTrait();
            break;
        
    }
}




