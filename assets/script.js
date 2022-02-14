var form_coll=document.getElementById('form-collection');
var form_input=document.getElementById('form-input');
var format_input=document.getElementById('format-input');
resultTextEl=document.getElementById('result-text')
var resultContentEl=document.getElementById('result-content')
var myresult=document.getElementById('myidea')
console.log(format_input);
function myfun(event){
    event.preventDefault();

    var query=form_input.value;
    var format=format_input.value;

searchApi(query,format);
}
function searchApi(query, format) {
    var locQueryUrl = 'https://www.loc.gov/search/?fo=json';

  
    if (format) {
      locQueryUrl = 'https://www.loc.gov/' + format + '/?fo=json';
    }
  
    locQueryUrl = locQueryUrl + '&q=' + query;
  
    fetch(locQueryUrl)
      .then(function (response) {
        if (!response.ok) {
        console.log('error');    
    }
  
        return response.json();
      })
      .then(function (locQueryUrlresult) {
        resultTextEl.textContent = locQueryUrlresult.search.query;
        for(var i=0;i<locQueryUrlresult.results.length;i++){
           printresult(locQueryUrlresult.results[i])
        };})

      }
      function printresult(resultObj) {
        console.log(resultObj);
      var card=document.createElement('div');
      card.classList.add('card','bg-light','text-dark','p-5');
      var cardbody=document.createElement('div');
      cardbody.classList.add('card-body');
    //   card.append(cardbody);
    var mytitle=document.createElement('h3');
    mytitle.textContent=resultObj.title;
    var mydate=document.createElement('p');
    mydate.textContent=resultObj.date;
    var mydescription=document.createElement('p');
    mydescription.innerHTML='<strong>Description:</strong> <br>'+resultObj.description;
    var mysubject=document.createElement('p');
    mysubject.innerHTML='<strong>Subject:</strong> <br>'+resultObj.subject;

    var mylink=document.createElement('a');
    mylink.textContent='view image';
    mylink.setAttribute('href',resultObj.image_url);
   var addbr=document.createElement('br')

    var href1=document.createElement('a');
    href1.textContent='Show More..';
    href1.setAttribute('href',resultObj.url);

    var img=document.createElement('img');
    img.classList.add('ps-1');
    img.src=resultObj.image_url;
  
    cardbody.append(mydate,mytitle,mydescription,mysubject,mylink,addbr,href1,addbr,img);
    card.append(cardbody)
    resultContentEl.append(card)
    
        



      
       
      }
form_coll.addEventListener('submit',myfun);
