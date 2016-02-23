# JLR HVAC Concept


### Inspiration

Inspired by [PDXostc's HVAC project](https://github.com/PDXostc/hvac), this is purely a technical and stylistic exercise that is aimed to create a clean and simple HVAC interface. The interface takes design cues from the [Land Rover Discovery Vision Concept](http://www.landroverusa.com/future-vehicles/discovery-vision-concept.html).


## Getting started

#### Setup

After checking out the repo, in your bash run:

```
npm install
```

This will grab the required dependencies from NPM and check out [DNA_common](https://github.com/PDXostc/DNA_common) into the project directory. This will take a hot second, so grab a beverage of your choice.

#### Starting the dev server

```
npm start
```

Once the server has started, browse to `localhost:8080` to view the application.


## Technology Choices

The technology choices were based on the following goals:

* To create reusable components that can be used across multiple applications.
* Use modern tooling to enable quickly iteration.
* Create a single source of truth to more clearly control the state of the application.

### ES2016 / JSX / Stage0

Using the Webpack [Babel](https://babeljs.io/) loader, we get a ton of new functionality that, in my opinion, makes Javascript a more capable and fun language to write in.

JSX was used for component readability and to make React a bearable view engine to code with.

### React

React was used in this project for two reasons:
1. It's relativity unobtrusive, it prevents a lock-in and works with the existing common app.
1. It creates an environment that encourages the creation of reusable web components.

### Redux

Redux creates a predictable state layer that helps achieve the animation choreography. In addition, it creates a single point for the state to run through, making side effect changes (for instance, the event when 'MAX DEFROST' is turned on) clean and organized.

### SCSS & Local Scoping

Using Sass drastically decreases development time and helps with style maintainability through the use of modules, variables, functions, and mixins. But to add to that, this project uses [local styling](https://medium.com/seek-ui-engineering/the-end-of-global-css-90d2a4a06284#.s7erpepdt).

An important note about this project, every React component (that needs styling) is tied to a stylesheet. This tightly couples a component and its style, thus preventing many of the problems inherent with Cascading Stylesheets.


## Known issues

Like the project that this is based on, it doesn't work with a car...

## Future development

* Cleaner 'Auto AC' logic
* Heated seat control

___

Thanks for checking out this project.

— Robert Nolan, [@rnolan3](https://github.com/rnolan3)
