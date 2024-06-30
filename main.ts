controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(assets.image`Bullet`, mySprite, 0, -100)
})
statusbars.onStatusReached(StatusBarKind.EnemyHealth, statusbars.StatusComparison.EQ, statusbars.ComparisonType.Percentage, 0, function (status) {
    sprites.destroy(statusbar.spriteAttachedTo())
    info.changeScoreBy(1)
})
info.onScore(50, function () {
    game.gameOver(true)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    statusbar.value += -5
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprites.destroy(otherSprite, effects.fire, 500)
    scene.cameraShake(4, 500)
})
let EnemyShip: Sprite = null
let statusbar: StatusBarSprite = null
let projectile: Sprite = null
let mySprite: Sprite = null
info.setScore(0)
effects.starField.startScreenEffect()
mySprite = sprites.create(assets.image`HeroPlane`, SpriteKind.Player)
mySprite.setPosition(71, 95)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
info.setLife(5)
game.onUpdateInterval(2000, function () {
    EnemyShip = sprites.create(assets.image`VillainPlane`, SpriteKind.Enemy)
    statusbar = statusbars.create(20, 2, StatusBarKind.EnemyHealth)
    statusbar.setColor(2, 1)
    EnemyShip.y = randint(10, scene.screenHeight() - 5)
    EnemyShip.vy = 20
    EnemyShip.x = randint(10, scene.screenWidth() - 10)
    statusbar.attachToSprite(EnemyShip)
})
