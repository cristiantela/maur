Maur = {
  canvas: null,
  context: null,

  mouse: {
    x: null,
    y: null,
  },

  calcOffset({ horizontalAlign, verticalAlign, width, height, }) {
    let x = 0;
    let y = 0;

    if (horizontalAlign === 'center') {
      x = width / 2;
    } else if (horizontalAlign === 'right') {
      x = width;
    }

    if (verticalAlign === 'center') {
      y = height / 2;
    } else if (verticalAlign === 'bottom') {
      y = height;
    }

    return { x, y, };
  },

  set(object) {
    if (object.canvas) {
      this.canvas = object.canvas;
      this.context = this.canvas.getContext('2d');

      this.canvas.addEventListener('mousemove', event => {
        this.mouse.x = event.layerX;
        this.mouse.y = event.layerY;
      });

      this.canvas.addEventListener('mouseout', event => {
        this.mouse.x = this.mouse.y = null;
      });
    }
  },

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  isMouseOver(object) {
    if (object.type === 'arc') {
      return Math.pow(this.mouse.x - object.x, 2) + Math.pow(this.mouse.y - object.y, 2) <= Math.pow(object.radius, 2);
    } else if (object.type === 'rect') {
      const offset = this.calcOffset(object);

      const rotate = object.rotate || 0;

      if (rotate !== 0) {
        console.warn('isMouseOver doesn\'t work for rect with rotate different of 0');
        return false;
      }

      return this.mouse.x >= object.x - offset.x && this.mouse.x <= object.x + object.width - offset.x
        && this.mouse.y >= object.y - offset.y && this.mouse.y <= object.y + object.height - offset.y;
    }

    return false;
  },

  draw(object) {
    this.context.save();
    this.context.beginPath();

    this.context.translate(object.x, object.y);

    const rotate = object.rotate || 0;
    this.context.rotate(rotate * Math.PI / 180);

    if (object.type === 'arc') {
      this.context.arc(0, 0, object.radius, object.angle0, object.angle1);
    } else if (object.type === 'rect') {
      const offset = this.calcOffset(object);

      this.context.rect(0 - offset.x, 0 - offset.y, object.width, object.height);
    }

    this.context.fillStyle = object.backgroundColor;
    this.context.fill();
    this.context.closePath();

    this.context.restore();
  },

  circle(settings) {
    return this.arc({ ...settings, angle0: 0, angle1: 2 * Math.PI, });
  },

  arc(settings) {
    const object = { ...settings, type: 'arc', };

    return Object.assign(object, {
      draw: () => {
        this.draw(object);
      },
    });
  },

  square(settings) {
    return this.rect({ ...settings, height: settings.width, });
  },

  rect(settings) {
    const object = { ...settings, type: 'rect', };

    return Object.assign(object, {
      draw: () => {
        this.draw(object);
      },
    });
  },
};