## 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
**getElementById** finds a single element using its id.
**getElementsByClassName** finds all elements that have a given class name.
**querySelector** finds the first matching element using a CSS selector.
**querySelectorAll** finds all matching elements using a CSS selector.


## 2. How do you create and insert a new element into the DOM?
To create a new element in the DOM, **document.createElement()** is used.
**For example:**
``` js
const newDiv = document.createElement("div");
```
To insert the new element into the DOM, methods like **appendChild()** are used.
**For example:**
```js
const parent = document.getElementById("container");
parent.appendChild(newDiv);
```

##  3. What is Event Bubbling? And how does it work?

**Event Bubbling** is a process where, when an event (like a click) occurs on an HTML element, it propagates step by step up to its parent elements.

**How Event Bubbling Works:**
**• Start:** When a button (child element) is clicked, the event first triggers the handler on that button.

**• Propagation Upwards:** Then the event moves up to its parent element (like a < div > or < form >), then to <body>, and finally reaches <html> or the document.

**• Default Behavior:** This is the browser’s default behavior, allowing events to be handled by parent elements as well.

**Example:**
```js
document.getElementById("child").addEventListener("click", function() {
  alert("Child clicked");
});

document.getElementById("parent").addEventListener("click", function() {
  alert("Parent clicked");
});
```


##  4. What is Event Delegation in JavaScript? Why is it useful?

**Event Delegation** is handling the actions of child elements by attaching a listener to their parent element.

**Why it is used:**

**•** Instead of adding separate listeners to multiple child elements, a single parent listener is sufficient.

**•** Even if new child elements are added later, the parent listener can automatically handle them.

**•** Having fewer listeners makes the code easier to manage and maintain.

##  5. What is the difference between preventDefault() and stopPropagation() methods?

**preventDefault()** stops the default action of an event.

**Example:** 
```js
Clicking a link does not load the page.
```

**stopPropagation()** stops the event from bubbling or capturing. 

**Example:** 
```js
The click listener on the parent element does not get triggered.
```