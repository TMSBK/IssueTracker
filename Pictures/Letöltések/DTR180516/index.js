

$(window).on('load', function() {
console.log(window.innerWidth);
  let mainSlideNumber = 2;
  let subSlideNumber = 4;

  if(window.innerWidth < 580 && window.innerWidth < window.innerHeight){
    mainSlideNumber = 1;
    subSlideNumber = 2;
  }

  $('.autoplayMain').slick({
    slidesToShow: mainSlideNumber,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: false,
  });

  $('.autoplaySub').slick({
    slidesToShow: subSlideNumber,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  });

})

var id;
$(window).resize(function() {
    clearTimeout(id);
    id = setTimeout(doneResizing, 500);
    
});

function doneResizing(){
  location.reload();  
}
