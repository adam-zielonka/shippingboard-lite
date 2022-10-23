# Shipping Board Lite

WORK IN PROGRESS

The purpose of this project is to show how we create React apps in my team and to train my team members and students about the way.

## Ideas for exercises

### Date in local time

```js
const date = new Date(2020, 9, 22);
const options = { month: "2-digit", day: "2-digit" };
console.log(date.toLocaleDateString("en", options)); // 10/22
console.log(date.toLocaleDateString("pl", options)); // 22.10
```

### Error in DB crash application

Maybe not existing customers or ramp
