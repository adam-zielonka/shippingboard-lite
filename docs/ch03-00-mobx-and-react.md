# 3. Mobx in React

React for me it is functions that can render user interface and Mobx is classes that contains state of application. In this chapter I try to show you how easy and power full is that connection.

During this chapter the app that I create will be counters, with some buttons that will be change counter value.

## Setup the environment

If you prepared in last chapter empty project react project, you need to add two libraries to your project `mobx` and `mobx-react-lite`:

```shell
pnpm install mobx mobx-react-lite
```

You should also delete all thing that we don't need in this project like styles.

Also the `App` component don't need so much elements:

```tsx
function App() {
  return <div>
    Counter
  </div>
}
```

## Create component for counter

Let's start building our counter. Should have place for displaying value and buttons for changing this value (-100,-1,0,+1,+100).

```tsx
const Counter = () => {

  return <div className="counter">
    <span>
      <span>0</span>
    </span>
    <button>-100</button>
    <button>-1</button>
    <button>0</button>
    <button>+1</button>
    <button>+100</button>
  </div>;
}
```

And of course we need to add this component to `App`:

```tsx
function App() {
  return <div>
    <Counter />
  </div>;
}
```

TODO: Show img result and url to styles

## Create store + First spell

## Import store to component + Second spell

## Global store + Action for adding

## Limit number of counters

## Action for deleting

## Sum of all counters

## Value to input

## Console in browser

## Reaction (Bonus)

TODO: Replace param in url

## Autorun (Bonus)

TODO: Save state in local storage

## Summary and Ending


