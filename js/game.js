var GameLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        this._super();
        var size = cc.director.getWinSize();

        var sprite = cc.Sprite.create(res.BG_IMAGE);
        sprite.setPosition(size.width / 2, size.height / 2);
        this.addChild(sprite, kZindexBg);

        this._floor = cc.Sprite.create(res.FLOOR_IMAGE);
        this._floor.setPosition(0, 0);
        this._floor.setAnchorPoint(0, 0);
        this.addChild(this._floor, kZindexFloor);


    },
    onEnter: function () {
        this._super();
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        },this);
    },
    onTouchBegan: function (touch, event) {
        var tp = touch.getLocation();
        var tar = event.getCurrentTarget();
        tar._floor.setPosition(tp.x,tp.y);
        console.log('onTouchBegan:' + tp.x.toFixed(2) + ',' + tp.y.toFixed(2));
        console.log('_floor.HEIGHT:' + tar._floor.height);
        console.log('_floor.position:' + tar._floor.x.toFixed(2) + ',' + tar._floor.y.toFixed(2));


        return false;
    },
    onTouchMoved: function (touch, event) {
        var tp = touch.getLocation();
        console.log('onTouchMoved:' + tp.x.toFixed(2) + ',' + tp.y.toFixed(2));
    },
    onTouchEnded: function (touch, event) {
        var tp = touch.getLocation();
        console.log('onTouchEnded:' + tp.x.toFixed(2) + ',' + tp.y.toFixed(2));
    },
});

GameLayer.scene = function () {
    var scene = new cc.Scene();
    var layer = new GameLayer();
    scene.addChild(layer);
    return scene;
}

window.onload = function () {
    var targetWidth = 960;
    var targetHeight = 640;

    cc.game.onStart = function () {

        cc.view.adjustViewPort(false);
        cc.view.setDesignResolutionSize(targetWidth, targetHeight, cc.ResolutionPolicy.SHOW_ALL);
        cc.view.resizeWithBrowserSize(true);
        //load resources
        cc.LoaderScene.preload(["HelloWorld.png"], function () {
            cc.director.runScene(GameLayer.scene());
            console.log(cc);
        }, this);
    };
    cc.game.run("gameCanvas");
};


//   window.onload = function(){
//       cc.game.onStart = function(){
//           //load resources
//         /*  cc.LoaderScene.preload(["HelloWorld.png"], function () {
//               var MyScene = cc.Scene.extend({
//                   onEnter:function () {
//                       this._super();
//                       var size = cc.director.getWinSize();
//                        var sprite = cc.Sprite.create("HelloWorld.png");
//                       sprite.setPosition(size.width / 2, size.height / 2);
//                       sprite.setScale(0.8);
//                       this.addChild(sprite, 0);
//
//                       // var label = cc.LabelTTF.create("Hello World", "Arial", 40);
//                       // label.setPosition(size.width / 2, 0);
//                       // label.runAction(
//                       //     cc.sequence(
//                       //         cc.spawn(
//                       //             cc.moveBy(2.5, cc.p(0, size.height - 40)),
//                       //             cc.tintTo(2.5,0,125,0)
//                       //         ),
//                       //         cc.delayTime(2.5),
//                       //         cc.moveBy(3.5, cc.p(0, size.height + 40))
//                       //     )
//                       // );
//                       // this.addChild(label, 1);
//                       var tsLabel = new cc.LabelTTF("Tunnel Snakes Rule!", "Arial", 38);
//                       tsLabel.x = size.width / 10;
//                       tsLabel.y = size.height / 2;
//                       this.addChild(tsLabel, 5);
//                   }
//               });
//               cc.director.runScene(new MyScene());
//           }, this);*/
//
//
//
//     };
//     cc.game.run("gameCanvas");
// };