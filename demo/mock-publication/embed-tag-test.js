//neon-js libary import
<script src="./lib/browser.js"></script>

//jquery libary import-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/core.js" integrity="sha256-YCbKJH6u4siPpUlk130udu/JepdKVpXjdEyzje+z1pE=" crossorigin="anonymous"></script>

<script>
jQuery(document).ready(function ($) {

//publisherID (Public Address)
var id = 'xxx'

//variables must be queired from neon-js
var filler = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
var adUrl = 'https://www.blocksports.com';
var img1Url = 'https://i.imgur.com/HpFfvm5.png';
var img2Url = 'https://i.imgur.com/tjwcJjK.png';


//jquery to replace values
$('.na-img1').attr('src', filler);
$('.na-img2').attr('src', filler);
$('.na-img1').attr('src', img1Url);
$('.na-img2').attr('src', img2Url);
$('.na-div').attr('href', adUrl);

});</script>


//Image 1 (728x90)
<a class="na-div" style="width:728px;height:90px;" href="#">
  <img class="na-img1" src="#">
</a>


//Image 2 (300x250)
<a class="na-div" style="width:300px;height:250px;" href="#">
  <img class="na-img2" src="#">
</a>
