(function(links) {
  for(var i=0; i<links.length;i++) {
    var link = links[i];
    var data = link.getAttribute('data-url');
    var qr = qrcode(4,'M');
    qr.addData(data, 'Byte');
    qr.make();
    link.innerHTML = qr.createImgTag();
  }
})(document.querySelectorAll('.qr-link'));
