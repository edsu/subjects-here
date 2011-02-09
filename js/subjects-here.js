function main() {
    if (Modernizr.geolocation) {
        navigator.geolocation.getCurrentPosition(lookup_subjects);
    }
    else {
        alert("Sorry, I guess you don't have a geo-aware browser!");
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
    s = subject.name.replace(" -- ", " ");
    url = "http://www.worldcat.org/search?q=su:" + s + "&qt=advanced";
    $("#subject_list").append('<li><a href="' + url + '">' + subject.name + "</a></li>");
}
