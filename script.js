function executeScripts(){
  let script = document.querySelector('script').innerText;
  try{
    eval(script);
  }catch(e){
    console.error(e);
  }   
}


async function navigate(title, url){
  document.title = title;
  let content = document.querySelector('#content');
  if(url === null){
    content.innerHTML = "";
  }else{
    let response = await fetch(url);
    content.innerHTML = await response.text();
    executeScripts();
  }
}

function handleClick(event){
  event.preventDefault();
  event.stopPropagation();
  let a = event.target;
  let text = a.text;
  let url = a.href;
  history.pushState({title:text, url: url}, null, a.href);
  navigate(a.text, a.href);
}

const menu = document.querySelector('#menu');
menu.addEventListener('click', handleClick, false);

function handleBack(event){
  
  if(event.state == null){
    navigate('Web APIs', null);
  }else{
    navigate(event.state.title, event.state.url);  
  }
}

window.addEventListener('popstate', handleBack);