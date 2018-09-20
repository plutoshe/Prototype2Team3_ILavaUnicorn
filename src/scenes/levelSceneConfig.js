
export let enemyManagerConfig = {
    enemies: [
    {x:11,y:21},{x:6, y:23},
    {
        x: 6,
        y: 7, 
    }, 
    {
        x: 6,
        y: 8, 
    },
    {
        x: 6,
        y: 9, 
    },
    {
        x: 9,
        y: 15,
    },
    {
        x: 9,
        y: 13,
    },
    {
        x:11,
        y:4,
    }],

    defaultTexture: 'enemy1',
    defaultSpeed: 180,  
    defaultIsAnimation: true,
};  

export let blockTextures = {
    0 : {
        group: "empty",
        texture: "empty",
        createFunction: function(v) {
            return true;
        }
    },
    1 : {
        group: "full",
        texture: "full_lightbrown",
        createFunction: function(v) {
            if (v.texture != "full_lightbrown") {
                return false;
            }
                return true;
        }
    },
    2 : {
        group: "full",
        texture: "full_darkbrown",//full_red
        createFunction: function(v) {
            if (v.texture == "full_darkbrown") 
                return true;
            else return false;
        }
    },
    3 : {
        group: "full",
        texture: "full_orange",
        createFunction: function(v) {
            if (v.texture == "full_orange") 
                return true;
            else return false;
        }
    },
    4 : {
        group: "full",
        texture: "full_red",
        createFunction: function(v) {
            if (v.texture == "full_red") 
                return true;
            else return false;
        }
    },
    5: {
        group: "full",
        texture: "full_maroon",
        createFunction: function (v) {
            if (v.texture == "full_maroon")
                return true;
            else return false;
        }
    },
    6: {
        group: "full",
        texture: "full_purple",
        createFunction: function (v) {
            if (v.texture == "full_purple")
                return true;
            else return false;
        }
    },
    7: {
        group: "full",
        texture: "full_pink",
        createFunction: function (v) {
            if (v.texture == "full_pink")
                return true;
            else return false;
        }
    },
    8: {
        group: "full",
        texture: "full_blue",
        createFunction: function (v) {
            if (v.texture == "full_blue")
                return true;
            else return false;
        }
    },
    9: {
        group: "full",
        texture: "full_green",
        createFunction: function (v) {
            if (v.texture == "full_green")
                return true;
            else return false;
        }
    },
    10: {
        group: "full",
        texture: "full_lightgray",
        createFunction: function (v) {
            if (v.texture == "full_lightgray")
                return true;
            else return false;
        }
    },
    11: {
        group: "full",
        texture: "full_darkgray",
        createFunction: function (v) {
            if (v.texture == "full_darkgray")
                return true;
            else return false;
        }
    },
    12: {
        group: "full",
        texture: "full_black",
        createFunction: function (v) {
            if (v.texture == "full_black")
                return true;
            else return false;
        }
    },
    13: {
        group: "lava",
        texture: "lava",
        createFunction: function(v) {
            if (v.texture == "lava") 
                return true;
            else return false;
        }
    },
}

export let entityTextures = [
    {
        group: "rock",
        texture: "rock_static",
        backgroundBlockGroup: "full",
        pos: [[4, 5], [10, 11], [3, 13], [6, 19], [7, 19], [2, 22]],
    },
    {
        group: "knight",
        texture: "knight",
        animation: "knight",
        // backgroundBlockGroup: "full",
        // pos: [[1,9]],
        pos: [[1, 9], [12, 9], [0, 15], [11, 18], [3, 26], [12, 26]],
    },
]


export var backgroundConfig = { 
    leftTopX: 0, 
    leftTopY: 0,  
    displayBlockWidth: 14, 
    displayBlockHeight: 18, 
    successbackLimit: 3,
    blockWidth: 14,
    blockHeight: 29,
    lavaTileIndex: 13, 
    castleImage: "castle",
    levelMap: [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0], // 0
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,0,1,1,1,1,1,1,1],
        [1,0,1,1,1,1,0,1,1,0,0,0,0,1],
        [2,0,2,2,2,2,0,2,2,2,2,2,2,2], // 5
        [2,0,2,2,2,2,0,2,2,2,2,2,2,2],
        [3,0,3,3,3,3,0,3,3,3,3,3,3,3],
        [3,3,3,3,3,3,0,3,3,3,3,3,3,3],
        [13,4,4,4,4,0,0,0,4,4,4,4,4,13],
        [4,4,4,4,4,4,4,4,4,4,4,4,4,4],  // 10
        [5,5,5,5,5,5,5,5,5,0,5,5,5,5],
        [5,5,0,0,0,0,5,5,5,0,5,5,5,5],
        [6,6,6,6,6,6,6,6,6,0,6,6,6,6],
        [13,6,6,6,6,6,6,6,6,0,6,6,6,6],
        [7,7,7,7,7,7,7,7,7,0,7,7,7,7],  // 15
        [7,7,7,7,7,7,7,7,7,7,7,7,7,7],
        [8,8,8,8,8,8,8,8,8,8,8,8,8,8],
        [8,8,8,0,8,8,8,8,8,8,13,8,8,8],
        [9,9,9,0,9,9,9,9,9,9,9,9,9,9],
        [9,9,9,0,9,9,9,9,9,9,9,9,9,9],  // 20
        [10,10,10,10,10,10,10,10,0,0,0,0,10,10],
        [10,10,10,10,10,10,10,10,10,10,10,10,10,10],
        [11,11,11,11,11,11,0,11,11,11,11,11,11,11],
        [11,11,11,11,11,11,0,11,11,11,11,11,11,11],
        [12,12,12,13,12,12,0,12,12,12,12,12,12,12], // 25
        [12,12,12,12,12,12,12,12,12,12,12,12,12,13],
        [12,12,12,12,12,12,12,12,12,12,12,12,12,12],
        [12,12,12,12,12,12,12,12,12,12,12,12,12,12]],

}

export var playerConfig = {
    x: 0,
    y: 5,
    player_idle_texture: 'player_idle',
    player_move_texture: 'player_move',
    attack_texture: 'player_attack',
    cameraBoundry: 2,
}