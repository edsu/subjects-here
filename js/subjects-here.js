function main() {
    if (Modernizr.geolocation) {
        navigator.geolocation.getCurrentPosition(lookup_subjects);
    }
    else {
        display_error();
    }
}

function lookup_subjects(position) {
    lat = parseFloat(position.coords.latitude);
    lon = parseFloat(position.coords.longitude);
    url = "http://experimental.worldcat.org/mapfast/services?geo=" + lat + "," + lon + ";crs=wgs84&radius=100000&mq=&sortby=distance&max-results=15";
    $.getJSON(url, display_subjects);
}

function display_subjects(data) {
    $.each(data.Placemark, display_subject);
}

function display_subject(index, subject) {
    s = subject.name.replace(/ -- /g, " ");
    url = "http://www.worldcat.org/search?q=su:" + s + "&qt=advanced";
    $("#subject_list").append('<li><a href="' + url + '">' + subject.name + "</a></li>");
}

function display_error() {
    html = "<p class='error'>Your browser doesn't seem to support the HTML5 geolocation API. You will need either: Firefox (3.5+), Safari (5.0+) Chrome (5.0+), Opera (10.6+), iPhone (3.0+) or Android (2.0+). Sorry!</p>";
    $("#subject_list").replaceWith(html);
}
