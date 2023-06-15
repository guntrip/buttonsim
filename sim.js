document.addEventListener('DOMContentLoaded', function() {

    let btns = document.querySelectorAll("input");

    for (i of btns) {
    i.addEventListener('click', press);
    }

    setInterval(rando, 400);

})

var delay = 1000
var relight_delay = delay + 2000
var max_x = 12
var max_y = 12

var opts = {
    diag: false,
    leftright: true,
    topdown: true,
    rand: true,
    rand_value: 0.9
}

function rando() {
    if (Math.random() > 0.99) return; // chance of none
    var x = parseInt(Math.random() * max_x);
    var y = parseInt(Math.random() * max_y);
    light(x,y)
}

function press(e) {
    var x = parseInt(e.target.attributes.x.value)
    var y = parseInt(e.target.attributes.y.value)
    light(x,y)
}

function light(x,y) {
    // Set element
    var e = document.querySelector("[x='"+x+"'][y='"+y+"']");

    // Do we want to wait?
    var n = Date.now()
    var n_e = e.attributes.last_lit.value

    if (n > parseInt(n_e) + relight_delay) {

        e.classList.add("lit");
        e.setAttribute("last_lit", Date.now());
        setTimeout(function() {
            unlight(x,y);
        }, delay)

        //console.log("lit "+x+","+y)

    }
}

function unlight(x,y) {
    var e = document.querySelector("[x='"+x+"'][y='"+y+"']");
    e.classList.remove("lit");
    communicate(x,y)
}

function communicate(x,y) {
    // Communicate to everyone around us
    if (opts.diag) logic(x-1, y-1) // tl
    if (opts.topdown) logic(x, y-1) // t
    if (opts.diag) logic(x+1, y-1) // tr
    if (opts.leftright) logic(x-1, y) // l
    if (opts.leftright)logic(x+1, y) // r
    if (opts.diag) logic(x-1, y+1) //bl
    if (opts.topdown)logic(x, y+1) // b
    if (opts.diag) logic(x+1, y+1) // br
    
}

function logic(x,y) {
    if (x<0 || y<0 || x>max_x || y>max_y) {
        //console.log("no :C "+x+","+y)
        return;
    }

    if (opts.rand) {
        // 0.1: 90% return
        // 0.9: 10% return
        if (Math.random() > opts.rand_value) return
    }

    light(x,y)
}