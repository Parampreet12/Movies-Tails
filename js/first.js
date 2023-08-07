/*initially texting part is inside*/
var textingWidth=-($(".texting").width());
$(".SlidingPart").css("left",textingWidth);
/**/
/*Getting inputs values*/
var productName=document.getElementById("name");
var productEmail=document.getElementById("email");
var productPhone=document.getElementById("phone");
var productAge=document.getElementById("age");
var productPassword=document.getElementById("pass");
var productRePassword=document.getElementById("repass");
/* */
/*Validation*/
var nameValid=false;
var emailValid=false;
var phoneValid=false;
var ageValid=false;
var passwordValid=false;
var repasswordValid=false;
/*Type of sorting */
var sortTypee="random";
/*AJAX*/
var newsDisplay=document.getElementById("newsShow"); //news container
var receivedArticles=[]; //array of news
/*Create new XMLHttpRequest*/
var httpRequest=new XMLHttpRequest(); 
httpRequest.open("GET","https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR1B06TsSXIV7Ur7o1ycbu5yx4HzsxbQs6Hh0-LKKuObQHaTV0Tz4aAsZ8U",true); //open connection
httpRequest.send(); //send request
httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
        //Data received and URL is correct
         receivedArticles=(JSON.parse(httpRequest.response)).results; 
       displayNews(sortTypee); //show news
    }
    else{/*do nothing */}
  };//check state of httpRequest
/**/
/*Display News*/
function displayNews(sortingType)
{
    var htmlCode="";
    if(sortingType=="higher rate")
    {
        receivedArticles.sort(
            function(a,b)
            {
                return b.vote_average-a.vote_average;
            }
        );
    }
    else if(sortTypee=="lower rate")
    {
        receivedArticles.sort(
            function(a,b) 
            {
                return a.vote_average-b.vote_average;
            }
        );
    }
    else if(sortTypee=="latest")
    {
        receivedArticles.sort(
            function(a,b)
            {
            return  new Date(b.release_date)-new Date(a.release_date);
            }
        );
    }
    else if(sortTypee=="oldest")
    {
        receivedArticles.sort(
            function(a,b)
            {
            return new Date(a.release_date)-new Date(b.release_date);
            }
        );
    }
    else if(sortTypee=="random")
    {
        receivedArticles=(JSON.parse(httpRequest.response)).results; 
        //do nothing
    }
    for(var i=0;i<receivedArticles.length;i++)
    {
        var u=receivedArticles[i].title.indexOf(":");
        if(u<0)
        {    
           htmlCode+=`<div class="col-md-6 col-lg-4 my-3">
           <div class="imgAndContentContainer">
           <img src="https://image.tmdb.org/t/p/w500`+receivedArticles[i].poster_path+`"class="img-fluid"/>
           <div class="content text-center d-flex align-items-center justify-content-center">
           <div>
           <h1 class="w-100 mx-auto">`+receivedArticles[i].title+`</h1>`
        }
        else {
            htmlCode+=`<div class="col-md-6 col-lg-4 my-3">
            <div class="imgAndContentContainer">
            <img src="https://image.tmdb.org/t/p/w500`+receivedArticles[i].poster_path+`"class="img-fluid"/>
            <div class="content text-center d-flex align-items-center justify-content-center">
            <div>
            <h1 class="mx-auto">`+receivedArticles[i].title.slice(0,u)+`</h1>`
        }
        htmlCode+=`<p class="px-3">`+receivedArticles[i].overview+`</p>
        <p>`+"Rate: "+receivedArticles[i].vote_average+`</p>
        <p>`+receivedArticles[i].release_date+`</p>
        </div>
        </div>
        </div>
        </div>
        `
    }
    newsDisplay.innerHTML=htmlCode;
}
/**/
/*Search by title*/
$("#SearchInput").keyup(

    function()
{   
    let searchedNews=this;
    var temp="";
    for(var j = 0;j<receivedArticles.length;j++)
    {
        var u=receivedArticles[j].title.indexOf(":");
        if(u>=0)
        {
            var t=receivedArticles[j].title;
            receivedArticles[j].title=t.slice(0,u);
        }
        var newsLower=(receivedArticles[j].title).toLowerCase();
        var searchLower=searchedNews.value.toLowerCase();
        if(searchedNews.value=="")
        {
            displayNews(sortTypee);
        }
        else if(newsLower.includes(searchLower)&&(searchedNews.value!=""))
        {
            temp+=`<div class="col-md-6 col-lg-4 my-3">
            <div class="bg-light imgAndContentContainer">
            <img src="https://image.tmdb.org/t/p/w500`+receivedArticles[j].poster_path+`"class="img-fluid"/>
            <div class="content text-center d-flex justify-content-center align-items-center">
            <div>
            <h1 class="mx-auto">`+receivedArticles[j].title+`</h1>`
            temp+=`<p class="px-2">`+receivedArticles[j].overview+`</p>
            <p>`+"Rate: "+receivedArticles[j].vote_average+`</p>
            <p>`+receivedArticles[j].release_date+`</p>
            </div>
            </div>
            </div>
            </div>
            `
            newsDisplay.innerHTML=temp;
        }
    }
}
)
/*Validate name*/
productName.addEventListener("keyup",function()
{
    var regEx = /^[a-zA-Z]{3,8}$/;
    var nameP=productName.value;
    if(nameP=="")
    {
        /*Still empty*/
        nameValid=false;
        $("#ErrorName").css("display","none");
        $("#name").css("backgroundColor","transparent");
    }
    else if((regEx.test(nameP)==true))
    {
        /*No error*/
        nameValid=true;
        $("#name").css("backgroundColor","transparent");
        $("#name").css("color","white");
        $("#ErrorName").css("display","none");
    }
    else
    {
        /*error*/
        nameValid=false;
        $("#name").removeClass("bg-transparent");
        $("#name").css("backgroundColor","white");
        $("#name").css("color","black");
        $("#ErrorName").css("display","block");
    }
});
/**/
/*Validate email*/
productEmail.addEventListener("keyup",function()
{
    var regEx = /^[a-zA-Z].{3,8}@(gmail|yahoo).com$/;
    var emailP=productEmail.value;
    if(emailP=="")
    {
        /*Still empty*/
        emailValid=false;
        $("#ErrorEmail").css("display","none");
        $("#email").css("backgroundColor","transparent");
    }
    else if((regEx.test(emailP)==true))
    {   
        /*No error*/
        emailValid=true;
        $("#email").css("backgroundColor","transparent");
        $("#email").css("color","white");
        $("#email").addClass("bg-transparent");
        $("#ErrorEmail").css("display","none");
    }
    else
    {
        /*error*/
        emailValid=false;
        $("#email").removeClass("bg-transparent");
        $("#email").css("color","black");
        $("#email").css("backgroundColor","white");
        $("#ErrorEmail").css("display","block");
    }
});
/**/
/*Validate phone*/
productPhone.addEventListener("keyup",function()
{
    var regEx = /^01(1|0|2|5)[0-9]{8}$/;
    var phoneP=productPhone.value;
    if(phoneP=="")
    {   /*Still empty*/
        phoneValid=false;
        $("#ErrorPhone").css("display","none");
        $("#phone").css("backgroundColor","transparent");
    }
    else if((regEx.test(phoneP)==true))
    {   /*No error*/
        phoneValid=true;
        $("#phone").css("backgroundColor","transparent");
        $("#phone").css("color","white");
        $("#phone").addClass("bg-transparent");
        $("#ErrorPhone").css("display","none");
    }
    else
    {   /*error*/
        phoneValid=false;
        $("#phone").removeClass("bg-transparent");
        $("#phone").css("color","black");
        $("#phone").css("backgroundColor","white");
        $("#ErrorPhone").css("display","block");
    }
});
/**/
/*Validate age*/
productAge.addEventListener("keyup",function()
{
    var regEx = /^[1-6][0-9]$/;
    var ageP=productAge.value;
    if(ageP=="")
    {
        /*Still Empty*/
        ageValid=false;
        $("#ErrorAge").css("display","none");
        $("#age").css("backgroundColor","transparent");
    }
    else if((regEx.test(ageP)==true))
    {
        /*No error*/
        ageValid=true;
        $("#age").css("backgroundColor","transparent");
        $("#age").css("color","white");
        $("#age").addClass("bg-transparent");
        $("#ErrorAge").css("display","none");
    }
    else
    {
        /*Error*/
        phoneValid=false;
        $("#age").removeClass("bg-transparent");
        $("#age").css("color","black");
        $("#age").css("backgroundColor","white");
        $("#ErrorAge").css("display","block");
    }
});
/**/
/*Validate password*/
productPassword.addEventListener("keyup",function()
{
    var regEx = /^.{8,15}$/;
    var passwordP=productPassword.value;
    if(passwordP=="")
    {
        /*Still empty*/
        passwordValid=false;
        $("#ErrorPassword").css("display","none");
        $("#pass").css("backgroundColor","transparent");
    }
    else if((regEx.test(passwordP)==true))
    {
        /*No error*/
        passwordValid=true;
        $("#pass").css("backgroundColor","transparent");
        $("#pass").css("color","white");
        $("#pass").addClass("bg-transparent");
        $("#ErrorPassword").css("display","none");
    }
    else
    {
        passwordValid=false;
        $("#pass").removeClass("bg-transparent");
        $("#pass").css("color","black");
        $("#pass").css("backgroundColor","white");
        $("#ErrorPassword").css("display","block");
    }
});
/**/
/*Validate repassword*/
productRePassword.addEventListener("keyup",function()
{
    var regEx = /^.{8,15}$/;
    var repasswordP=productRePassword.value;
    if(repasswordP=="")
    {
        repasswordValid=false;
    }
    else if((regEx.test(repasswordP)==true))
    {
        repasswordValid=true;
        $("#repass").css("backgroundColor","");
        $("#repass").addClass("bg-transparent");
       /*do Nothing*/
    }
    else
    {
        repasswordValid=false;
        $("#repass").removeClass("bg-transparent");
        $("#repass").css("backgroundColor","#f8d7da");
    }
});
/**/
/*Choose sorting type */
$("#sortDropBox").change(

    function()
    {
        sortTypee=$("#sortDropBox").val();
        displayNews(sortTypee)
    }
)
/**/
/*movingSmoothlyLis*/
let liIndex=0;
let checkk=false;
function moveLi()
{
    $("li").eq(liIndex).css("top","0");
    if(liIndex<6)
    {
        checkk=false;
        liIndex++;
    }
    if(liIndex==6)
    {
        liIndex=0;
        checkk=true;
    }
}
function moveAllLis()
{
        var interval=setInterval(function()
        {
            if(checkk==true)
            {
                clearInterval(interval);
                checkk=false;
            }
            else
            {
                moveLi();
            }
        },100);
}
/**/
/*Moving leftPart*/
$("#openexitIcon").click(
    function()
    {   
        //go inside
    if(($(".texting").offset().left)==0)
    {
        $(".SlidingPart").css("left",textingWidth);
        //again Lis in bottom
        $("li").css("top","900px");
        $("li").css("transition","top 0s 0s");
        $("#openexitIcon").attr("class","fas fa-align-justify");
    }
    //go outside
    else
    {
        liIndex=0;
        $("#openexitIcon").attr("class","fas fa-times");
        $(".SlidingPart").css("left",0);
        moveAllLis();
        $("li").css("transition","top 0.3s 0.5s");
    }
    }
    );
/**/
