/* The Distance Teaching and Mobile learning licenses this file
to you under the Apache License, Version 2.0 (the "License"); 
you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
*/

import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
import PhaserInput from '../libs/phaser-input'
import PhaserJuicy from '../libs/juicy'
import config from '../config';
import WebFont from 'webfontloader'

export default class extends Phaser.State {
    init() {
    }

    preload() {
        //this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
        this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
        centerGameObjects([this.loaderBar])

        this.load.setPreloadSprite(this.loaderBar)

        this.load.onLoadStart.add(this.loadStart, this);
        this.load.onFileComplete.add(this.fileComplete, this);
        this.load.onLoadComplete.add(this.loadComplete, this);

        this.add.plugin(PhaserInput.Plugin);
        this.add.plugin(PhaserJuicy);
        this.game.juicy = this.add.plugin(new PhaserJuicy(this))
        //
        // load your assets
        if (config.webfonts.length) {
            WebFont.load({
                google: {
                    families: config.webfonts
                },
                active: this.fontsLoaded
            })
        }
        //
        // this.load.video('intro', 'assets/videos/intro.webm');
        this.load.image('mushroom', 'assets/images/mushroom2.png')

        this.load.atlas('wizard', 'assets/images/wizard/atlas.png', 'assets/images/wizard/atlas.json')
        this.load.xml('wizardAnimations', 'assets/images/wizard/animations.scml')

        // load bar for patience
        this.load.spritesheet('patienceBar5', 'assets/images/Health5.png', 245, 28);
        this.load.spritesheet('patienceBar4', 'assets/images/Health4.png', 200, 27);
        this.load.spritesheet('patienceBar3', 'assets/images/Health3.png', 150, 27);
        this.load.spritesheet('patienceBar2', 'assets/images/Health2.png', 103, 27);
        this.load.spritesheet('patienceBar1', 'assets/images/Health1.png', 53, 27);

        this.load.atlas('gnome', 'assets/images/gnome2/atlas.png', 'assets/images/gnome2/atlas.json')
        this.load.xml('gnomeAnimations', 'assets/images/gnome2/animations.scml')

        this.load.atlas('fireball', 'assets/images/fire/atlas.png', 'assets/images/fire/atlas.json');
        this.load.image('iconAttack', 'assets/images/icon-attack.png');
        this.load.image('iconHome', 'assets/images/icon-home.png');

        // bg
        this.load.image('bg1', 'assets/images/layers/l1_background.png')
        this.load.image('bg2', 'assets/images/layers/l2_trees01.png')
        this.load.image('bg3', 'assets/images/layers/l3_bush01.png')
        this.load.image('bg4', 'assets/images/layers/l4_trees02.png')
        this.load.image('bg5', 'assets/images/layers/l5_trees03.png')
        this.load.image('bg6', 'assets/images/layers/l6_bush02.png')
        this.load.image('bg7', 'assets/images/layers/l7_ground.png')
        this.load.image('cloud', 'assets/images/cloud.png');
        this.load.image('gameover', 'assets/images/endgame.jpg');
        this.load.image('scroll', 'assets/images/scroll.png');

        // audio
        this.load.audio('click', 'assets/audio/Click.wav')
        this.load.audio('explosion', 'assets/audio/Explosion.wav')
        this.load.audio('blaster', 'assets/audio/Blastwave_FX_FireballWhoosh_S08FI.42.mp3')
        this.load.audio('hover', 'assets/audio/ButtonHover.wav')
        this.load.audio('steps', 'assets/audio/LandingFootsteps.wav')
        this.load.audio('woosh', 'assets/audio/Whoosh.wav')

        //this.load.atlas('flags', 'assets/images/flags/flags.png', 'assets/images/flags/flags.json')
        this.load.spritesheet('heart', 'assets/images/ss-heart.png', 48, 48, 6)

        //side menu
        this.load.spritesheet('openmenu', 'assets/images/openMenu.png', 64, 64);
        this.load.spritesheet('sidebg', 'assets/images/sidebg.png', 115, 117);
        this.load.spritesheet('characters', 'assets/images/characters.png', 96, 128);
        this.load.image('sidemenu', 'assets/images/sidemenu.png');

        // game state data
        this.load.json('stateData', 'assets/data/gameStates.json');
    }

    loadStart() {
        this.loadingText = this.add.text(20, this.world.height - 32, 'Loading...', {
            font: '20px Berkshire Swash',
            fill: '#ffffff'
        });
    }

    fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
        this.loadingText.setText('File Complete: ' + progress + '% - ' + totalLoaded + ' out of ' + totalFiles);
        // console.log('totalLoaded', totalLoaded)
    }

    loadComplete() {
        game.world.remove(this.loadingText);

        this.time.advancedTiming = true;

        // let video = this.add.video('intro');
        // video.play(false);
        // //  x, y, anchor x, anchor y, scale x, scale y
        // video.addToWorld(game.world.centerX, game.world.centerY, 0.5, 0.5, 0.5, 0.5);
        let videoDuration = 0
        this.time.events.add(Phaser.Timer.SECOND * videoDuration, () => {
            document.querySelector('#intro').style.display = 'none'
            document.querySelector('#content').style.display = 'block'
            //this.state.start('GameOver', false, false, '4234')
            this.state.start('Game')
            //   video.destroy()

        }, this)
    }

    create() {

    }

    fontsLoaded() {
        this.fontsReady = true
    }
}
