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

export default class extends Phaser.State {
  init () {
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    this.scale.windowConstraints.bottom = 'visual'
    this.game.scale.setResizeCallback(() => {
      this.scale.setMaximum()
    })
    if (!this.game.device.desktop) {
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
      this.scale.minWidth = 300
      this.scale.minHeight = 100
      this.scale.maxWidth = window.innerWidth * 2
      this.scale.maxHeight = window.innerHeight * 2
    }

    this.scale.pageAlignHorizontally = false
    this.scale.pageAlignVertically = true

    this.scale.forceOrientation(true, false)
    this.scale.refresh(true)
  }

  preload () {
    this.load.json('gameSetup', 'assets/data/gameSetup.json')

    this.load.image('loaderBg', './assets/images/logobackground.png')
    this.load.image('loaderBar', './assets/images/loading-logo.png')

    let scaleRatio
    let canvasHeightMax = 900
    let canvasWidthMax = 1140
    let width = game.width // window.screen.availWidth * window.devicePixelRatio
    let height = game.height // window.screen.availHeight * window.devicePixelRatio
    game.aspectRatio = width / height
    game.scaleRatio = 1 // game.width / canvas_width_max

    // console.log('game dimension: ', game.width, 'x', game.height, 'height * scaleRatio', game.height * game.scaleRatio)
    if (game.aspectRatio < 1) {
      // game.scaleRatio = width / canvas_height_max
      // console.log(game.width, game.height)
      game.scale.setGameSize(game.width, game.height * game.scaleRatio)
    } else {
      game.scale.setGameSize(game.width, game.height)
    }

    game.canvas.oncontextmenu = function (e) { e.preventDefault() }
  }

  render () {
    this.state.start('Splash')
  }
}
