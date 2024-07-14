




window.addEventListener("load", function () {
    $(".loading").fadeOut(500, function () {
        $("body").css("overflow", "visible")
    })

})



// select elements using jqurey

// let loading = document.querySelector(".loading")
let sideBar = $("aside");
let navBar = $("aside nav");
let navBarWidth = navBar.outerWidth();
let showHideMenu = $("#showHideMenu");
let searchBtn = $("#search");
let categoryBtn = $("#category");
let areaBtn = $("#area");
let ingredientsBtn = $("#ingredients");
let contactBtn = $("#contact");
let submitBtn = document.getElementById("submitBtn")
let formRegex = {
    name: /^[a-zA-Z]+\s*[a-zA-Z]+$/,
    email: /^\w+@\w{2,10}\.\w+$/,
    phone: /^(\+2)?01[0125]\d{8}$/,
    age: /^[1-9][0-9]?$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
};
let meals;
let categories;


sideBar.css("left", `${-navBarWidth}px`);
const linkMarginBlock = $("nav ul li").css("margin-block");

showHideMenu.click(toggleSideBar);

function toggleSideBar() {
    if (sideBar.css("left") == "0px") {
        sideBar.animate({ left: -navBarWidth }, 500);
        showHideMenu.removeClass("fa-xmark").addClass("fa-bars");
        $("nav > ul li").animate(
            { marginBlock: linkMarginBlock, opacity: 0 },
            700
        );
    } else {
        // show nav bar
        sideBar.animate({ left: 0 }, 500);
        showHideMenu.removeClass("fa-bars").addClass("fa-xmark");
        $("nav ul li").animate({ marginBlock: "0px", opacity: 1 }, 700);
    }
}

// fetch API function

async function getMealsData(file, query, userInput, loadingcontainer) {

    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/${file}?${query}=${userInput}`);
    let respone = await api.json();
    console.log(respone.meals);
    displayMealData(respone.meals)

    // displayMealDetails(respone.meals[0])
}


getMealsData("search.php", "s", "");  // اليوزر مش هيختار  حاجة معينة هنا 

let rowData = document.getElementById("rowData");  // ال div  اللى بعرض فيها 

function displayMealData(arr) {
    let cartoona = ``;
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                    <div  onclick="getMealDetails('${arr[i].idMeal}')"  class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                        <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                        <div class="meal-layer position-absolute d-flex align-items-center text-black fw-bolder p-2">
                            <h3>${arr[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
        `

    }
    rowData.innerHTML = cartoona
}


function openLoading() {
    $(".loading").fadeIn(300)

}

function closeLoading() {

    $(".loading").fadeOut(300)

}



async function getAllCategories() {

    rowData.innerHTML = ""

    openLoading()

    // searchContainer.innerHTML = ""

    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);

    let respone = await api.json();

    console.log(respone.categories);

    displayCategories(respone.categories)

    closeLoading()

    // displayMealDetails(respone.meals[0])
}

function displayCategories(categories) {

    let cartoona = ``;
    for (let i = 0; i < categories.length; i++) {
        cartoona += `
        <div class="col-md-3">
                     <div onclick="getCategoryMeals('${categories[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                        <img class="w-100" src="${categories[i].strCategoryThumb}" alt="" srcset="">
                        <div class="meal-layer position-absolute d-flex align-items-center text-black fw-bolder p-2 text-center">
                            <h3>${categories[i].strCategory}</h3> 
                            <p>${categories[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                        </div>
                    </div>
                </div>
        `

    }
    rowData.innerHTML = cartoona
}

// لسة مخلصتش 
// هنا هحتاج لما ادوس على ال الوجبة يجيب التفاصيل 
async function getCategoryMeals(category) {
    rowData.innerHTML = ""
    $(".loading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))

    $(".loading").fadeOut(300)

}


/*   area functions   */
async function getAllArea() {

    rowData.innerHTML = ""

    openLoading()

    // searchContainer.innerHTML = ""

    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);

    let respone = await api.json();

    console.log(respone.meals);

    displayArea(respone.meals)

    closeLoading()
    // displayMealDetails(respone.meals[0])
}

function displayArea(area) {

    let cartoona = ``;
    for (let i = 0; i < area.length; i++) {
        cartoona += `
        <div class="col-md-3 area">
                      <div onclick="getAreaMeals('${area[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x cursor-pointer"></i>
                        <h3>${area[i].strArea}</h3>
                        </div>
                    </div>
                </div>
        `

    }
    rowData.innerHTML = cartoona
}

/*   area functions   */




/****************************     integrates functions           *********************************/


async function getIngredient() {

    rowData.innerHTML = ""

    openLoading()

    // searchContainer.innerHTML = ""

    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);

    let respone = await api.json();

    console.log(respone.meals);

    displayIngredients(respone.meals.slice(0, 20))  // عشان اجيب اول عشرين بس 

    closeLoading()

}
function displayIngredients(arr) {

    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}



/****************************     integrates functions           *********************************/



async function getCategoryMeals(category) {
    rowData.innerHTML = ""

    openLoading()

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    displayMealData(response.meals.slice(0, 20))

    closeLoading()

}


async function getAreaMeals(area) {
    rowData.innerHTML = ""
    openLoading()

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayMealData(response.meals.slice(0, 20))
    closeLoading()

}

async function getIngredientsMeals(ingredients) {

    rowData.innerHTML = ""

    openLoading()

    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)

    let respone = await api.json()

    displayMealData(respone.meals.slice(0, 20))

    closeLoading()


}

// فانكشن عرض تفاصيل كل وجبة لوحدها  =>     two function 1- api             2- display

async function getMealDetails(mealID) {

    rowData.innerHTML = ""
    openLoading()
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    let respone = await api.json()

    console.log(respone.meals[0]);

    displayMealDetails(respone.meals[0])


    closeLoading()
}

function displayMealDetails(arr) {


    let ingredients = ``;

    for (let i = 1; i <= 20; i++) {
        if (arr[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-2">${arr[`strMeasure${i}`]} ${arr[`strIngredient${i}`]}</li>`;
        }
    }

    // no for loop becouse its just one meal  وجبة واحدة
    let cartoona = ``
    cartoona += `<div class="col-md-4">
                    <img src="${arr.strMealThumb}" class="w-100 rounded-3" alt="image details" />
                    <h2 class="text-white">${arr.strMeal}</h2>
                </div>
                <div class="col-md-8">
                    <h2>Instructions</h2>
                    <p>${arr.strInstructions}</p>
                    <h3><span class="fw-bolder">Area : </span>${arr.strArea}</h3>
                    <h3><span class="fw-bolder">Category : </span>${arr.strCategory}</h3>
                    <h3>Recipes :</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                        ${ingredients}
                    </ul>

                    <h3>Tags :</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                       <li class="alert alert-danger m-2 p-1">${arr.strTags}</li>
                    </ul>

                    <a target="_blank" href="${arr.strSource}" class="btn btn-success">Source</a>
                    <a target="_blank" href="${arr.strYoutube}" class="btn btn-danger">Youtube</a>
                </div>
        
        `

    rowData.innerHTML = cartoona
}

/*************************************************  show contact  *************************************************************/


let nameInput = document.getElementById("nameInput")
let emailInput = document.getElementById("emailInput")
let phoneInput = document.getElementById("phoneInput")
let ageInput = document.getElementById("ageInput")
let passwordInput = document.getElementById("passwordInput")
let repasswordInput = document.getElementById("repasswordInput")


// function showContact() {

//     submitBtn = document.getElementById("submitBtn")
//     rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
//     <div class="container w-75 text-center">
//         <div class="row g-4">
//             <div class="col-md-6">
//                 <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
//                 <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
//                     Special characters and numbers not allowed
//                 </div>
//             </div>
//             <div class="col-md-6">
//                 <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
//                 <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
//                     Email not valid *exemple@yyy.zzz
//                 </div>
//             </div>
//             <div class="col-md-6">
//                 <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
//                 <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
//                     Enter valid Phone Number
//                 </div>
//             </div>
//             <div class="col-md-6">
//                 <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
//                 <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
//                     Enter valid age
//                 </div>
//             </div>
//             <div class="col-md-6">
//                 <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
//                 <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
//                     Enter valid password *Minimum eight characters, at least one letter and one number:*
//                 </div>
//             </div>
//             <div class="col-md-6">
//                 <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
//                 <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
//                     Enter valid repassword 
//                 </div>
//             </div>
//         </div>
//         <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
//     </div>
// </div> `


//     document.getElementById("nameInput").addEventListener("focus", () => {
//         nameInputTouched = true
//     })

//     document.getElementById("emailInput").addEventListener("focus", () => {
//         emailInputTouched = true
//     })

//     document.getElementById("phoneInput").addEventListener("focus", () => {
//         phoneInputTouched = true
//     })

//     document.getElementById("ageInput").addEventListener("focus", () => {
//         ageInputTouched = true
//     })

//     document.getElementById("passwordInput").addEventListener("focus", () => {
//         passwordInputTouched = true
//     })

//     document.getElementById("repasswordInput").addEventListener("focus", () => {
//         repasswordInputTouched = true
//     })
// }

// let nameInputTouched = false;
// let emailInputTouched = false;
// let phoneInputTouched = false;
// let ageInputTouched = false;
// let passwordInputTouched = false;
// let repasswordInputTouched = false;





// function inputsValidation(){

//     if (validateName() && validateEmail() && validateAge() && validatePhone() && validatePassword() && validateRePassword()) {

//         submitBtn.removeAttribute("disabled")
//     } else {
//         $("#submitBtn").css("disabled", true)
//     }
// }

// function validateName() {


//     var regexName = /^[a-zA-Z ]+$/

//     if ( regexName.test(nameInput.value) == true)  {

//         document.getElementById("nameAlert").classList.replace("d-block", "d-none")

//         return true
//     }

//     document.getElementById("nameAlert").classList.replace("d-none", "d-block")
//     return false

// }


// function validateEmail() {


//     var regexName = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

//     if (regexName.test(emailInput.value) == true) {

//         document.getElementById("emailAlert").classList.replace("d-block", "d-none")
//         return true
//     }

//     document.getElementById("emailAlert").classList.replace("d-none", "d-block")
//     return false

// }

// function validatePhone() {


//     var regexName = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

//     if (regexName.test(phoneInput.value) == true) {

//         document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
//         return true
//     }

//     document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

//     return false

// }

// function validateAge() {


//     var regexName = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/

//     if (regexName.test(ageInput.value) == true) {

//         document.getElementById("ageAlert").classList.replace("d-block", "d-none")
//         return true
//     }

//     document.getElementById("ageAlert").classList.replace("d-none", "d-block")

//     return false

// }

// function validatePassword() {


//     var regexName = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/

//     if (regexName.test(passwordInput.value) == true) {

//         document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
//         return true
//     }

//     document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

//     return false

// }

// function validateRePassword() {


//     var regexName = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/

//     if (regexName.test(repasswordInput.value) == true) {

//         document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
//         return true
//     }

//     document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

//     return false

// }



// function showContact() {
//     rowData.innerHTML = `
//         <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
//             <div class="container w-75 text-center">
//                 <div class="row g-4">
//                     <div class="col-md-6">
//                         <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
//                         <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
//                             Special characters and numbers not allowed
//                         </div>
//                     </div>
//                     <div class="col-md-6">
//                         <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
//                         <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
//                             Email not valid *exemple@yyy.zzz
//                         </div>
//                     </div>
//                     <div class="col-md-6">
//                         <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
//                         <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
//                             Enter valid Phone Number
//                         </div>
//                     </div>
//                     <div class="col-md-6">
//                         <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
//                         <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
//                             Enter valid age
//                         </div>
//                     </div>
//                     <div class="col-md-6">
//                         <input id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
//                         <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
//                             Enter valid password *Minimum eight characters, at least one letter and one number:*
//                         </div>
//                     </div>
//                     <div class="col-md-6">
//                         <input id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
//                         <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
//                             Enter valid repassword 
//                         </div>
//                     </div>
//                 </div>
//                 <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
//             </div>
//         </div>
//     `;

//     // تعيين التأثير عند الـ focus
//     document.getElementById("nameInput").addEventListener("focus", () => toggleTouched("name"));
//     document.getElementById("emailInput").addEventListener("focus", () => toggleTouched("email"));
//     document.getElementById("phoneInput").addEventListener("focus", () => toggleTouched("phone"));
//     document.getElementById("ageInput").addEventListener("focus", () => toggleTouched("age"));
//     document.getElementById("passwordInput").addEventListener("focus", () => toggleTouched("password"));
//     document.getElementById("repasswordInput").addEventListener("focus", () => toggleTouched("repassword"));
// }

// //  لتتبع التأثير
// let inputTouched = {
//     name: false,
//     email: false,
//     phone: false,
//     age: false,
//     password: false,
//     repassword: false
// };

// // التأكد من التأثير وتحديث المتغيرات
// function toggleTouched(field) {
//     inputTouched[field] = true;
//     inputsValidation(); // يمكنك استدعاء الفحص مباشرة عند التأثير
// }

// // التحقق من الصحة وإظهار الرسائل التحذيرية
// function inputsValidation() {
//     toggleValidationAlert("name", validateInput("name", /^[a-zA-Z ]+$/, "Special characters and numbers not allowed"));
//     toggleValidationAlert("email", validateInput("email", /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Email not valid *exemple@yyy.zzz"));
//     toggleValidationAlert("phone", validateInput("phone", /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, "Enter valid Phone Number"));
//     toggleValidationAlert("age", validateInput("age", /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/, "Enter valid age"));
//     toggleValidationAlert("password", validateInput("password", /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/, "Enter valid password *Minimum eight characters, at least one letter and one number:*"));
//     toggleValidationAlert("repassword", validateRepassword("repassword", "password", "Enter valid repassword"));

//     // تحديث حالة الزر
//     const submitBtn = document.getElementById("submitBtn");
//     submitBtn.disabled = !(
//         validateInput("name", /^[a-zA-Z ]+$/) &&
//         validateInput("email", /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/) &&
//         validateInput("phone", /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/) &&
//         validateInput("age", /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/) &&
//         validateInput("password", /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/) &&
//         validateRepassword("repassword", "password")
//     );
// }

// // إظهار أو إخفاء الرسائل التحذيرية
// function toggleValidationAlert(field, { isValid, errorMessage }) {
//     const alertElement = document.getElementById(`${field}Alert`);
//     if (isValid) {
//         alertElement.classList.replace("d-block", "d-none");
//     } else {
//         alertElement.classList.replace("d-none", "d-block");
//         alertElement.textContent = errorMessage;
//     }
// }

// // التحقق العام للإدخالات
// function validateInput(field, regex, errorMessage) {
//     const inputValue = document.getElementById(`${field}Input`).value.trim();
//     return {
//         isValid: regex.test(inputValue),
//         errorMessage: errorMessage
//     };
// }

// // التحقق من إعادة كلمة المرور
// function validateRepassword(repasswordField, passwordField, errorMessage) {
//     const repasswordValue = document.getElementById(repasswordField + "Input").value.trim();
//     const passwordValue = document.getElementById(passwordField + "Input").value.trim();
//     return {
//         isValid: repasswordValue === passwordValue,
//         errorMessage: errorMessage
//     };
// }

// // دوال التحقق من الصحة لكل حقل
// function nameValidation() {
//     return validateInput("name", /^[a-zA-Z ]+$/, "Special characters and numbers not allowed").isValid;
// }

// function emailValidation() {
//     return validateInput("email", /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/, "Email not valid *exemple@yyy.zzz").isValid;
// }

// function phoneValidation() {
//     return validateInput("phone", /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, "Enter valid Phone Number").isValid;
// }

// function ageValidation() {
//     return validateInput("age", /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/, "Enter valid age").isValid;
// }

// function passwordValidation() {
//     return validateInput("password", /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/, "Enter valid password *Minimum eight characters, at least one letter and one number:*").isValid;
// }

// function repasswordValidation() {
//     return validateRepassword("repassword", "password", "Enter valid repassword").isValid;
// }





function showContact() {
    rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}








/*************************************************  show contact  *************************************************************/


/* search functions  */



let searchContainer = document.getElementById("searchContainer");

function showSearchInputs() {

    searchContainer.innerHTML = `<div class="contact d-flex justify-content-center align-items-center">
                <div class="container text-center">
                    <div class="row py-3">
                        <div class="col-md-6">
                            <input  onkeyup="searchByName()" type="text" class="form-control text-white bg-transparent"
                                placeholder="Search By Name">
                        </div>
                        <div class="col-md-6">
                            <input onkeyup="searchByFirstLetter()" type="text" class="form-control text-white bg-transparent"
                                placeholder="Search By First Letter">
                        </div>
                    </div>
                </div>
            </div>`

    rowData.innerHTML = ""
}

async function searchByName(name) {

    // openLoading()

    // rowData.innerHTML = ""

    // let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)

    //  response = await response.json()

    // console.log(response.meals);

    // if (response.meals) {
    //     displayMealData(response.meals)
    // }
    // else {
    //     displayMealData([])
    // }
    // closeLoading()

    try {
        rowData.innerHTML = "";
        openLoading()
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log(data.meals);
        displayMealData(data.meals || []);
        closeLoading()

    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
}


async function searchByFirstLetter(letter) {
    try {

        rowData.innerHTML = "";
        openLoading();
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(letter)}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new TypeError('Oops, we haven\'t got JSON!');
        }
        const data = await response.json();
        console.log(data.meals);

        if (data.meals && data.meals.length > 0) {
            displayMealData(data.meals);
        } else {
            displayMealData([]);
        }
        closeLoading();

    } catch (error) {
        console.error('Error fetching or processing data:', error.message);
    }
}