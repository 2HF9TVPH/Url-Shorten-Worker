let res
  function shorturl() {
    if(document.querySelector("#text").value==""){
        alert("Url kann nicht leer sein!")
        return
    }

    document.getElementById("searchbtn").disabled=true;
	document.getElementById("searchbtn").innerHTML='<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Bitte warten...';
    fetch(window.location.pathname, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: document.querySelector("#text").value,key: document.querySelector("#key").value,hash: md5(document.querySelector("#text").value+document.querySelector("#password").value) })
    }).then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    res = myJson;
    document.getElementById("searchbtn").disabled=false;
	document.getElementById("searchbtn").innerHTML=' Kürzen';
    if(res.key!=="")
    document.getElementById("result").innerHTML=window.location.origin+res.key;
    $('#exampleModal').modal('anzeigen')
  }).catch(function(err){alert("Unbekannter Fehler. Bitte versuchen Sie es erneut!");
  console.log(err);
  document.getElementById("searchbtn").disabled=false;
	document.getElementById("searchbtn").innerHTML=' Kürzen';})
  }
  function copyurl (id, attr) {
    let target = null;

    if (attr) {
        target = document.createElement('div');
        target.id = 'tempTarget';
        target.style.opacity = '0';
        if (id) {
            let curNode = document.querySelector('#' + id);
            target.innerText = curNode[attr];
        } else {
            target.innerText = attr;
        }
        document.body.appendChild(target);
    } else {
        target = document.querySelector('#' + id);
    }

    try {
        let range = document.createRange();
        range.selectNode(target);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand('Kopieren');
        window.getSelection().removeAllRanges();
        console.log('Erfolg kopieren')
    } catch (e) {
        console.log('Fehler kopieren')
    }

    if (attr) {
        // remove temp target
        target.parentElement.removeChild(target);
    }
  }
  $(function () {
    $('[data-toggle="popover"]').popover()
  })
