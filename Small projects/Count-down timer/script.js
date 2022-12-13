const newYears = '1 Oct 2022'

function countdown () {

    const newYearsDate = new Date(newYears);
    const currentDate = new Date();

    const seconds = (newYearsDate - currentDate) / 1000;
    const days = Math.floor(seconds / 3600 / 24);
    const hours = Math.floor((seconds / 3600 / 24 - days)*24);
    const minutes = Math.floor(((seconds / 3600 / 24 - days)*24 - hours)*60);
    const second = Math.floor((((seconds / 3600 / 24 - days)*24 - hours)*60 - minutes)*60);

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = second;
}

setInterval(countdown, 1000);
