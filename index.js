var sites_msg = "";
var numSites = 2;
var thresh = 0;
var img_names = ['h1_pre','h2_pre','h1','h2','m1','m2','google', 'nyt'];
var img_times = [0, 0, 0, 0, 0, 0, 0, 0];
var img_addrs = [
    'http://www.nytimes.com/bad1.jpg',
    'http://www.nytimes.com/bad2.jpg',
    'http://www.nytimes.com/bad1.jpg',
    'http://www.nytimes.com/bad2.jpg',
    'http://www.nytimes.com/miss1.jpg',
    'http://www.nytimes.com/miss2.jpg',
    'https://www.google.com/images/srpr/logo11w.png',
    'http://i1.nyt.com/images/misc/nytlogo379x64.gif']

loadImage(0)

function checkSites() {
    var thresh = (Math.max(img_times[2], img_times[3]) +
        Math.min(img_times[4], img_times[5])) / 2;
    var msgstr = "";
    for(var i = 0; i < img_names.length; i++) {
        msgstr += img_names[i] + "|" + img_times[i] + "\n";
    }

    alert(msgstr + "time: " + img_times[6] + " thresh: " + thresh);

    for(var i = 6; i < img_names.length; i++) {
        var index = i - 6;
        if (img_times[i] <= 15) {
        // if (img_times[i] <= thresh) {
            var I = document.getElementById("img" + index);
            I.src = "yes.jpg";
        } else {
            var I = document.getElementById("img" + index);
            I.src = "no.jpg";
        }
    }
}

// load images sequentially. once all are loaed, check timings
function loadImage(counter) {
    //Break out if no more images and check results
    if(counter == img_names.length) {
        checkSites();
        return;
    }

    //Grab an image obj
    var I = document.getElementById(img_names[counter]);

    //Monitor load or error events, moving on to next image in either case
    var start = new Date();
    I.onload = I.onerror = function() {
        var end = new Date();
        img_times[counter] = (end - start);
        loadImage(++counter);
    }

    //Change source (then wait for event)
    I.src = img_addrs[counter];
}