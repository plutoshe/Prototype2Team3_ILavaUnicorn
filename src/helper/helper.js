export function new2DArray(x, y) {
    var myarray = new Array(x)
    for (var i=0; i < x; i++) 
        myarray[i] = new Array(y);
    return myarray;
    
}

export function collide(a, b) {
    let a1 = a.getTopLeft();
    let a2 = a.getBottomRight();
    let b1 = b.getTopLeft();
    let b2 = b.getBottomRight();
    if (b1.x >= a1.x && b1.x <= a2.x && b1.y >= a1.y && b1.y <= a2.y || 
        a1.x >= b1.x && a1.x <= b2.x && a1.y >= b1.y && a1.y <= b2.y) {
        if (b2.y == a1.y || b2.x == a1.x || a2.y == b1.y || a2.x == b1.x) return false;
        return true;
    } else return false;
}