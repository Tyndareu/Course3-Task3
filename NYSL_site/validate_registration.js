(function () {
  'use strict';
  /*global document,alert*/
  var minimumAge = 4
  var maximumAge = 12
  
  function getWarning(data, emptyDataWarning, pattern, patternWarning) {
    data = data.trim();
    if (data === "") {
      return emptyDataWarning;
    }
    else if (pattern && !pattern.test(data)) {
      return patternWarning;
    }
    else{
      return "";
    }
  }
  
  function getAge(birthDate){
    var today = new Date();
    var JAVASCRIPT_START_YEAR = 1970;
    return new Date(today - birthDate).getFullYear() - JAVASCRIPT_START_YEAR;
  }
  
  function getAgeWarning(birthday) {
    //When users input age, they will be using a 1 index for months.
    //ex: Jan = 1, March = 3
    //Javascript uses a 0 index.
    //ex: Jan = 0, March = 2
    //Therefore, a one must be subtracted from the month input by the user
    var monthCorrection = 1
    
    var birthdayParts = birthday.match(/\d+/g);
    var birthDate = new Date(birthdayParts[2], birthdayParts[0] - monthCorrection, birthdayParts[1]);
    var age = getAge(birthDate);
    if (age > maximumAge || age < minimumAge) {
      return "Participants must be between the ages of 4 and 12\n";
    }
    else{
      return "";
    }
  }
  
  function validateDate(date, emptyWarning, formatWarning, properDateFormatFunction) {
    if (date === "") {
      return emptyWarning;
    }
    else if (!(/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date))) {
      return formatWarning;
    }
    else if(properDateFormatFunction){
      return properDateFormatFunction(date);
    }
    else{
      return "";
    }
  }
  
  function validateSchools(firstSchool, secondSchool) {
    if (firstSchool === "null" || secondSchool === "null") {
      return "Please select a first and second closest school";
    }
    else if (firstSchool === secondSchool) {
      return "Please select different choices for first and second closest schools";
    }
    else{
      return "";
    }
  }
  
  //brings all validation functions together
  function validateRegistrationForm(event) {
    var form, messages;
    form = event.target;
    messages = getWarning(form.first_name.value, "Please input First Name\n") +
                   getWarning(form.last_name.value, "Please input Last Name\n") +
                   getWarning(form.address.value, "Please input Address\n") +
                   getWarning(form.city.value, "Please input City\n") +
                   getWarning(form.zip.value, "Please input Zip\n", /^\d{5}$/, "Zip should be 5 digits\n") +
                   validateDate(form.birth.value, "Please input Birthday\n", "Birthday format is mm/dd/yyyy\n", getAgeWarning) +
                   getWarning(form.parent.value, "Please input Parent\n") +
                   getWarning(form.phone.value, "Please input Phone\n", /^\d{3}(-|\.| )?\d{3}(-|\.| )?\d{4}$/, "Phone Number format should be ###-###-####\n") +
                   getWarning(form.email.value, "Please input Email\n", /^\w+@{1}\w+(\.com|\.edu|\.gov|\.net|\.org)$/, "Please enter a valid Email\n") +
                   getWarning(form.signature.value, "Please input Signature\n") +
                   validateDate(form.date.value, "Please input Date\n", "Date format is mm/dd/yyyy\n") +
                   validateSchools(form.first_school.value, form.second_school.value);
    if (messages === "") {
      return true;
    }
    alert(messages);
    return false;
  }
  
  document.forms[0].onsubmit =
    function (event) {
      return validateRegistrationForm(event);
    };
    
  //when Already Have a Uniform is checked, all uniform-sizes buttons
  //are disabled iteratively
  document.forms[0].has_uniform.onchange =
    function (event) {
      var buttons, i;
      buttons = document.getElementsByClassName("uniform-sizes");
      for (i = 0; i < buttons.length; i += 1) {
        buttons[i].disabled = event.target.checked;
      }
    };
    
  function getSeason(date) {
    var seasonArray = ['Winter', 'Spring','Summer', 'Fall'];
    var month = date.getMonth();
    //in order to simply use month to find season, a formula to adjust for seasons
    //and then find full number values is necessary
    month = Math.floor(((month + 1) % 12) / 3);
    var season = seasonArray[month];
    var year = date.getFullYear();
    return season + " " + year;
  }
  
  function setSeason(){
    var today = new Date();
    var season = getSeason(today);
    document.getElementById('season').value = season;
  }
  setSeason();
  
}());