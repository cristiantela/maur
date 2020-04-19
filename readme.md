# Maur.js

Tool to create and manage canvas 2d objects for.

```javascript
Maur.set(settings);
```

#### Maur.set(settings);

It defines initial options.

|Property|Description|
|-|-|
|canvas|A canvas HTML element where it will be rendered|

#### Maur.clear();

It clears all canvas.

#### Maur.isMouseOver(object);

It verifies if mouse is over an object. It returns a `boolean`.

### Objects

Common options:

|Property|Description|
|-|-|
|rotate|The rotation of the object|
|horizontalAlign|Only for `rect` and `square` objects. A horizontal align of the object. Possible values are`center` or `right`|
|verticalAlign|Only for `rect` and `square` objects. A vertical align of the object. Possible values are `center` or `bottom`|
|backgroundColor|A background color of the object|

#### Maur.arc(options);

It creates an arc.

|Property|Description|
|-|-|
|radius|The radius of the arc|
|angle0|Initial angle|
|angle1|Final angle|

#### Maur.circle(options);

It creates a circle.

|Property|Description|
|-|-|
|radius|The radius of the circle|

#### Maur.rect(options);

It creates a rectangle.

|Property|Description|
|-|-|
|width|The width of the rectangle|
|height|The height of the rectangle|

#### Maur.square(options);

It creates a rectangle.

|Property|Description|
|-|-|
|width|The width of the square|