import { Container, Graphics, Sprite, Text } from "pixi.js";
import gsap from "gsap";

export default class MagicHat extends Container {
  constructor() {
    super();
    this._emojis = [
      "🐶",
      "🐱",
      "🐭",
      "🐹",
      "🐰",
      "🦊",
      "🐻",
      "🐼",
      "🐻‍",
      "❄️",
      "🐨",
      "🐯",
    ];
    this._createHat();
  }

  _createItem() {
    if (this._item) this.removeChild(this._item);
    this._item = new Text(`${this._emojis[this._randomIndex(this._emojis)]}`, {
      fontFamily: "Arial",
      fontSize: 150,
      fill: 0xff1010,
      align: "center",
    });
    this._item.anchor.set(0.5);
    this._item.y = 100;
    this.addChild(this._item);
    this._createMask();
  }

  _createHat() {
    this._body = new Sprite.from("hat");
    this._body.interactive = true;
    this._body.buttonMode = true;
    this._body.anchor.set(0.5, 0.5);
    this._body.y = window.innerHeight / 2 - this._body.getBounds().height / 2;
    this.addChild(this._body);
    this._body.on("mousedown", () => this._shootEmoji());
  }

  _createMask() {
    const mask = new Sprite.from("hat-mask");
    mask.anchor.set(0.5);
    mask.y = -100;
    this.addChild(mask);
    this._item.mask = mask;
  }

  _shootEmoji() {
    this._createItem();
    gsap.to(this._item, {
      y: "-=150",
      ease: "elastic",
      duration: 1,
    });
  }

  _randomIndex(arr) {
    return Math.floor(Math.random() * arr.length);
  }
}
