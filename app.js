/* Global Variables */
const ApiURL = "https://api.openweathermap.org/data/2.5/weather?zip=";


//personal API Key
const apiKey = '&units=metric&appid=142a05b6c6eb8beb3db31c14bba202da';


//elements will be used
const inputZip = document.getElementById('zip');
const inputFeelings= document.getElementById("feelings");

//backend url
const host = "http://localhost:8010";


//the current date
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


//this function checks first that zipcode is entered
//It tries to fetch the the current weather from the API
async function GetWeatherAndFeeling(zipcode)
{
    if(zipcode!= "")
    {
        let result = await fetch(ApiURL + zipcode + apiKey);
        let ApiData ;
        try
        {
            ApiData = await result.json();
            let returnedData= MakeData(ApiData);
            return returnedData;
        }
        catch (error) 
        {
            console.log(ApiData.message);
        }
        
    }
    else
    {
        alert("ZipCode cannot be Empty");
    }
}

//This is helper Function that is used to  return  object contains the feeling , CurrentDate and Temp 
function MakeData(ApiData)
{
    const temp= ApiData.main.temp;
    const feelings= inputFeelings.value;
    const requiredData= {newDate, temp, feelings};
    return requiredData;
}

//this function is used to post the data ( temp , feeling , date) to the server 
async function  PostDataToServer(data)
{
    try{
        const res = await fetch(host+ '/postData', {
            method : 'POST',
            credentials : 'same-origin',
            headers : {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify(data),
        });
        if(res.status==200)
        {
            const finalData = await res.json();
            return(finalData);
        }
        else if(res.status==500)
        {
            alert(`${res.message}`);
        }
    }
    catch(error)
    {
        console.log(error) ;
    }
}

//this function is used to get the data ( temp , feeling , date) to the server 
async function GetDataFromServer()
{
    try{
        const res = await fetch(host+ '/currentData');
        const requestedData = await res.json();
        console.log(requestedData)
        if(res.status==200)
        {
            document.getElementById("date").innerHTML = requestedData.newDate;
            document.getElementById("temp").innerHTML = requestedData.temp + '&degC';
            document.getElementById("content").innerHTML = requestedData.feelings;

        }
        else if(res.status==500)
        {
            alert(`${res.message}`);
        }
    }
    catch(error)
    {
        alert(error) ;
    }
}


//event listener on generate button
document.getElementById('generate').addEventListener('click', function extractInfo() 
{
    const zipCode = inputZip.value;
    console.log(zipCode) ;
    GetWeatherAndFeeling(zipCode)
    .then(returnedData =>
        {
            PostDataToServer(returnedData) ;
        })
    .then(()=>
        {
            GetDataFromServer();
        })
    .catch(error=>
        {
            alert(error);
        });
})