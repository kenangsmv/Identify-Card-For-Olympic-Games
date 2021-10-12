$(document).ready(function () {

    const img_q = document.querySelector('#img-box');
    
    
     country_select();
    // sport_category_select()
    function country_select() {
        fetch("https://restcountries.com/v2/all")
        .then(response => response.json())
        .then(country => {
           
            country.forEach(element => {
                let option=document.createElement("option");
                option.innerText=`${element.name}`;
                option.setAttribute("value", `${element.alpha3Code}`);

                $("#country_select").append(option);
            });

        })
    }
    // function sport_category_select() {
        
    //   fetch("https://private-anon-9bc4fd9f70-olympicsapi.apiary-mock.com/scrape/events")
    //   .then(response => response.json())
    //   .then(category => {

    //       category.forEach(element => {
              
    //           let option=document.createElement("option");
    //           option.innerText=`${element.sport}`;

    //           $("#category_select").append(option);

    //       });

    //   })

    // }


    $(".img-upload").click(function () {
        $("#card-image").click();
    })

    $("#card-image").change(function () {
     const file =this.files[0];

     var reader = new FileReader();

     reader.onload= function () {
        const result = reader.result;
        img_q.setAttribute("src", `${result}`)
     }
     $(".click-box").css("display","none")
     $("#img-box").css("display","block")


     reader.readAsDataURL(file);

    })


    function IsEmpty(value) {
        
      if (value==="" || value==null || value== undefined) {
          return true;
      }
      return false;


    }

    function checkSelection(value) {
        if (value==="country") {
             return true;
        }
        if (value==="category") {
            return true;
       }
        else{
        return false;
        }
    }
    function checkEmailFormat(value, regex) {
       
        if (!value.match(regex)) {
           return true;
        }
        else{
           return false;
        }

  }
    function checkImg(src) {
        if (src==="") {
           return true;
        }
        else{
            return false;
        }
    }

 
    

  document.querySelector(".submit-form").addEventListener("submit",application)

    function application(event) {
        
        event.preventDefault();     

        if (IsEmpty($("#name").val())) {
            
            $("#name").addClass("error-border");
        }
        else{
           

            $("#name").removeClass("error-border");
        }

        if (IsEmpty($("#surname").val())) {
           
            $("#surname").addClass("error-border");
        }
        else{
            

            $("#surname").removeClass("error-border");
        }
        if (IsEmpty($("#email").val())) {
           
            $("#email").addClass("error-border");
        }
        else{
            

            $("#email").removeClass("error-border");
        }

        const name =document.querySelector("#name").value;
        const surname =document.querySelector("#surname").value;
        const country = document.querySelector("#country_select").value;
        const country_name= document.querySelector("#country_select").textContent;
        const category = document.querySelector("#category_select").value;
        const email = document.querySelector("#email").value;
        const img = document.querySelector("#img-box").getAttribute("src");

        

        let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
 
console.log(country.textContent);
console.log(country);



        if (checkSelection(country)) {
           
            $("#country_select").addClass("error-border");
        }
        else{                  
            $("#country_select").removeClass("error-border");
        }

        if (checkSelection(category)) {
             $("#category_select").addClass("error-border");
         }
         else{
             $("#category_select").removeClass("error-border");
         }

         if (checkEmailFormat(email,regexEmail)) {
            $("#email").addClass("error-border");
        }
        else{
            $("#email").removeClass("error-border");
        }
        if (checkImg(img)) {
            $(".img-upload").addClass("error-border");
        }
        else{
            $(".img-upload").removeClass("error-border");
        }

     
    
       card_preparation(name,surname,category,country,country_name,img)

  
 
     
    }

    function card_preparation(name,surname,category,country,country_name,img) {

     
        let fullname=(name+" "+surname).toUpperCase();
        category=category.toUpperCase();

        let country_id = country.substring(0,2);
        let category_id = category.substring(0,2);

 

        let card_profile_photo = document.createElement("img");
        card_profile_photo.classList="card-profile-photo";

        card_profile_photo.setAttribute("src",img);
        $(".card_profile_img").append(card_profile_photo);
        

       



        $(".card_fullname").text(fullname);
        $(".sport_category").text(category);
        $(".id_number").text(country_id+category_id+"001");
        
        country_flag(country_name);

        function country_flag(country_name) {
            fetch(`https://restcountries.com/v2/name/${country_name}`)
            .then(response => response.json())
            .then(country => {
               

                country.forEach(element => {
                    let img=document.createElement("img");
                   
                    img.classList="flag";
                    img.setAttribute("src", `${element.flags.png}`);
    
              

                    $(".card-flag").append(img);
                });
                
                   
               
    
            })
        }

    }
  
    let country_children = document.querySelector("#country_select");

    console.log(country_children.childNodes);
    country_children.childNodes.addEventListener("click", function (event) {
           let targeted = event.target;
           targeted.setAttribute("selected", true);
    })

})