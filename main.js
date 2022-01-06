//clipboardJS
var clipboard = new ClipboardJS('.btn-copy');

clipboard.on('success', function (e) {
        console.log(e);
});

clipboard.on('error', function (e) {
    console.log(e);
});


let errorMessage = document.getElementById("error")
let result = document.getElementById("result")

const token = '0ac932367989d5f6ecf20ebb390e9cdaa29cd826';

function short(){
    let groupId;
    let userInput = document.getElementById("user-input").value;
    console.log(userInput)

    //get groupId
    fetch('https://api-ssl.bitly.com/v4/groups', {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json" 
        }
    })
    .then(response => response.json())
    .then(data => {
        groupId = data.groups[0].guid;
        console.log(groupId)
        return groupId;
    });

    //options
    const options = { //reference bit.ly api
        method: "POST",
        headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({ "long_url": userInput, "domain": "bit.ly", "group_guid": groupId })
    }

    fetch('https://api-ssl.bitly.com/v4/shorten', options)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                //console.log(data.link)
                if(data.message === "INVALID_ARG_LONG_URL") {
                errorMessage.innerHTML = "Invalid URL to shorten !";
                return;
                }
                result.innerHTML = data.link;
            })
}

//darkmode
let day =false;
function darkmode(){
    let icon = document.getElementById("icon");
    let element = document.body;
    element.classList.toggle("dark-mode")
    
    //icon 
    if(day === true){
        icon.src = "img/night-mode.png"
    }else{
        icon.src = "img/day.png"
    }
    day = !day;
   
}