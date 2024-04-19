class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        // Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;
    }

    preload() {
        // Load assets without setting path
        this.load.image("blueBody", "assets/body_blueB.png");
        this.load.image("arm", "assets/arm_blueA.png");
        this.load.image("ear", "assets/detail_blue_ear.png");
        this.load.image("eye", "assets/eye_psycho_light.png");
        this.load.image("mouthHappy", "assets/mouth_closed_happy.png");
        this.load.image("mouthFangs", "assets/mouth_closed_fangs.png");
        this.load.image("nose", "assets/nose_brown.png");
        this.load.image("leg", "assets/leg_blueC.png");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "assets/spritesheet_default.png", "assets/spritesheet_default.xml");
        
        // Update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>';
    }

    create() {
        let my = this.my;   // Create an alias to this.my for readability

        // Create the main body sprite
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_blueB.png");

        // Additional sprites for arms, ears, eyes, etc.
        my.sprite.arm1 = this.add.sprite(this.bodyX - 80, this.bodyY + 9, "arm").setScale(-1, 1);; // Adjusted x position
        my.sprite.arm2 = this.add.sprite(this.bodyX + 80, this.bodyY + 9, "arm").setScale(1, 1);; // Adjusted x position

        // Flipping the leg sprite
        my.sprite.leg1 = this.add.sprite(this.bodyX - 30, this.bodyY + 100, "leg").setScale(-1, 1);
        my.sprite.leg2 = this.add.sprite(this.bodyX + 30, this.bodyY + 100, "leg").setScale(1, 1);

        my.sprite.ear1 = this.add.sprite(this.bodyX - 80, this.bodyY - 70, "ear").setScale(-1, 1);
        my.sprite.ear2 = this.add.sprite(this.bodyX + 80, this.bodyY - 70, "ear");

        my.sprite.eye = this.add.sprite(this.bodyX, this.bodyY - 50, "eye");
        my.sprite.nose = this.add.sprite(this.bodyX, this.bodyY - 10, "nose");

        // Initialize mouth sprites
        my.sprite.mouthHappy = this.add.sprite(this.bodyX, this.bodyY, "mouthHappy").setVisible(true);
        my.sprite.fangs = this.add.sprite(this.bodyX, this.bodyY, "mouthFangs").setVisible(false);
    }

    update() {
        let my = this.my;    // Create an alias to this.my for readability

        // Handle movement
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown) {
            // Move left
            for (let part in my.sprite) {
                my.sprite[part].x -= 1; // Adjust the speed as needed
            }
        } else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown) {
            // Move right
            for (let part in my.sprite) {
                my.sprite[part].x += 1; // Adjust the speed as needed
            }
        }

        // Event input: smile (S key)
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown) {
            my.sprite.mouthHappy.setVisible(true);
            my.sprite.fangs.setVisible(false);
        }

        // Event input: show fangs (F key)
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F).isDown) {
            my.sprite.mouthHappy.setVisible(false);
            my.sprite.fangs.setVisible(true);
        }
    }
}
