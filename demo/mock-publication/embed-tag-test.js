//neon-js libary import
<script src="https://cdn.jsdelivr.net/npm/@cityofzion/neon-js@3.10.1/lib/browser.min.js"></script>

//jquery libary import-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/core.js" integrity="sha256-YCbKJH6u4siPpUlk130udu/JepdKVpXjdEyzje+z1pE=" crossorigin="anonymous"></script>

<script>
jQuery(document).ready(function ($) {
var config = {name: 'Private', extra: { neoscan: 'http://localhost:4000/api/main_net'}
var network = new Neon.rpc.Network(config); 
Neon.add.network(network); 
var script = Neon.create.script({scriptHash: '926c2d2cbe6422473225b382c81379193452bfa6', operation: 'getAuctionWinner', args: ['23ba2703c53263e8d6e522dc32203339dcd8eee9', 'Block Sports', 1535468400]})
var test = Neon.rpc.Query.invokeScript(script).execute('http://127.0.0.1:30333')
console.log(test)
console.log('test')

//publisherID (Public Address)
var id = 'xxx'

//variables must be queired from neon-js
var adUrl = 'https://www.blocksports.com';
var img1Url = 'https://i.imgur.com/HpFfvm5.png';
var img2Url = 'https://i.imgur.com/tjwcJjK.png';


//jquery to replace values
$('.na-img1').attr('src', img1Url);
$('.na-img2').attr('src', img2Url);
$('.na-div').attr('href', adUrl);

});</script>


//Image 1 (728x90)
<a class="na-div" style="width:728px;height:90px;" href="#">
  <img class="na-img1" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">
</a>


//Image 2 (300x250)
<a class="na-div" style="width:300px;height:250px;" href="#">
  <img class="na-img2" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">
</a>
