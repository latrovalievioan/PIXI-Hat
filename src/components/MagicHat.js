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
    this._item = new Text("", {
      fontSize: 200,
    });

    this._item.anchor.set(0.5);
    this._item.y = 0;

    this._body = new Sprite.from("hat");
    this._body.anchor.set(0.5, 0.5);

    this._body.interactive = true;
    this._body.buttonMode = true;
    this.name = "magic-hat";
    this._body.on("click", () => this._handler());

    this._mask = new Sprite.from("hat-mask");
    this._mask.anchor.set(0.5, 0.5);
    this._mask.y = -300;
    this.addChild(this._mask);
    this._item.mask = this._mask;

    this.addChild(this._item);
    this.addChild(this._body);
  }

  _setText() {
    this._item.text = this._emojis[
      Math.floor(Math.random() * this._emojis.length)
    ];
  }

  _handler() {
    this._item.y = 0;
    this._setText();
    gsap.to(this.scale, {
      x: 0.9,
      y: 0.9,
      duration: 0.1,
      onComplete: () =>
        gsap.to(this._item, {
          y: -350,
          duration: 0.2,
          onComplete: () => {
            gsap.to(this.scale, {
              x: 1,
              y: 1,
              duration: 0.1,
            });
          },
        }),
    });
  }
}
