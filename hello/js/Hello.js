function Hello(){
    var url=new Array();

    url[0]="https://github.com/Lanky6/Hello";
    url[1]="https://lanky6.github.io/";



    if (document.referrer) {
      var origin = new URL(document.referrer).origin;
      url.splice(url.indexOf(origin), 1);
    }
    
    
    var ints=Math.floor(Math.random() * url.length);
    window.location=url[ints];
   }