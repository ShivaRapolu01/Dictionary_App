const content=document.querySelector(".center"),
searchInput=content.querySelector("input"),
infoText=content.querySelector(".info-text"),
contentText=document.querySelector(".content"),
Synonym=document.querySelector("#synonym div"),
SynonymDiv=document.querySelector("#synonym"),
volumeButton=document.querySelector("#phenotic i"),
removeIcon=document.querySelector(".search-box span");
let audio;
function data(result,word){
    // console.log(result);
    if(result.title=='No Definitions Found'){
        infoText.innerText=`Can't find meaning of "${word}", please search for another word `
    }else{
        // console.log(result);
       content.classList.add("active");
       let buf=result[0].meanings[0]; 
       document.querySelector(".search-content h3").innerText=result[0].word; 
       document.querySelector(".search-content p").innerText=`${buf.partOfSpeech}/${result[0].phonetic}`;
       document.querySelector("#meaning p").innerText=buf.definitions[0].definition;
       
       if(buf.definitions[0].example!=undefined){
       document.querySelector("#example p").innerText=buf.definitions[0].example;

       }
       Synonym.innerHTML="";
       Synonym.parentElement.style.display="block"; 
       if(buf.definitions[0].synonyms[0]==undefined){
        Synonym.parentElement.style.display="none"; 
       }else{
        for(let i=0;i<5;++i){
            let tag=`<span onclick=search('${buf.definitions[0].synonyms[i]}')>${buf.definitions[0].synonyms[i]}, </span>`;
            if(buf.definitions[0].synonyms[i]!=undefined)
            Synonym.insertAdjacentHTML("afterbegin",tag);
        }
       }
        
    }
     audio=new Audio("https:"+result[0].phonetics[0].audio);
    
}

function CheckError(response) {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
        window.alert("can't search for this word bcz the api doesn't support it");
    //   throw Error(response.statusText);
    }
  }
function search(word){

    fetchApi(word);
}

function fetchApi(word){
    infoText.style.color="black"; 
    content.classList.remove("active");
   infoText.innerText=`Searching the meaning of "${word}"`;
   let url=`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
   fetch(url).then(res=>CheckError(res)).then(result=>{searchInput.value=word ,data(result,word)});
}
searchInput.addEventListener("keyup",e=>{
    if(e.key==="Enter" && e.target.value){
        // console.log(e.target.value); 
        fetchApi(e.target.value);
    }
 
});

volumeButton.addEventListener("click",()=>{
    volumeButton.style.color = "#4D59FB";
    setTimeout(() =>{
        volumeButton.style.color = "#999";
    }, 800);
    // console.log(audio.play());
   

// In browsers that don’t yet support this functionality,
// playPromise won’t be defined.
if (audio.play() !== undefined) {
    audio.play().then(function() {
    // Automatic playback started!
  }).catch(function(error) {
      window.alert("Voice not available")
    // Automatic playback failed.
  });
}
})

removeIcon.addEventListener("click",()=>{
    searchInput.value="";
    searchInput.focus();
    content.classList.remove("active");
    infoText.innerText="Type any existing word and press enter to get meaning, example, synonyms, etc.";
})