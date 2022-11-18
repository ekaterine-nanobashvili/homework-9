"use strict";
// დავალება 2
let currentPage = 1;
let totalPages;
function getUsers(page) {
    let request = new XMLHttpRequest();
    request.addEventListener("load", function() {
        let textForm = request.responseText;
        let jsForm = JSON.parse(textForm);
        totalPages = jsForm.total_pages;
        const fragment = new DocumentFragment();
        document.getElementById("ul").innerHTML= " ";
        jsForm.data.forEach(element => {
            let li = document.createElement('li');
            li.innerText = `${element.first_name} ${element.last_name}`;
            fragment.appendChild(li);
            document.getElementById("ul").appendChild(fragment);
        });
    });
    request.addEventListener("error", function () {
        // აქ ვერ გავივე როგორ მივახვედრო ერორ ივენთი რომელი სტატუსის გამოა :(
        // if (jsForm.status == 404) {
        //     let p = document.createElement('p');
        //     p.textContent = "Page Not Found";
        //     document.getElementById("ulWrapper").appendChild(p);
        // }
        // else if (jsForm.status == 500) {
        //     let p = document.createElement('p');
        //     p.textContent = "Server Error";
        //     document.getElementById("ulWrapper").appendChild(p);
        // }
        let p = document.createElement('p');
        p.textContent = "Server Error";
        document.getElementById("ulWrapper").appendChild(p);
    })
    request.open("GET", "https://reqres.in/api/users?page=" + page);
    request.send();
}
document.getElementById("previous").addEventListener("click", function () {
    if (currentPage == 1) {
        return;
    }
    currentPage --;
    getUsers(currentPage);
});

document.getElementById("next").addEventListener("click", function () {
    if (currentPage == totalPages) {
        return;
    }
    currentPage ++;
    getUsers(currentPage);
});

getUsers(currentPage);