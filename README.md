## Simple Online Graphics Design Platform(sogdp)
In the project directory, you can run:
#### `1.yarn`(Installs the packages required for the project)
#### `2.yarn start`(Runs the app in the development mode.)
#### `3.open (http://localhost:3000)`(to view it in the browser.)



Features
1.A panel that loads thumbnails from Picsum with pagination on scrolling.

2.A blank canvas (9:16 by default)

3.Drag and drop images from the left panel to the canvas

4.If the canvas is blank, then image should be added as a background of the entire canvas. In case image has a different aspect ration than the canvas, then fit the image inside the canvas by blurring the sides. Check out the example to get better idea.

5.If there is already a background image set, then new image should be added on top of the canvas, and should be added as per its aspect ratio

6.Switchable aspect ratio of canvas to 9:16 to 16:9

7.Zoom option of with various values

8.Option to download the design (png) 

9.collapsable image view grid with infinity scroll pagination effect.


# Modules used in the project.

## 1. Context API
This includes code re-use and easier ways of sharing state between components

## 2. image Lazy laoding feature with IntersectionObserver
The benefits of lazy loading include:

Reduces initial load time – Lazy loading a webpage reduces page weight, allowing for a quicker page load time.
Bandwidth conservation – Lazy loading conserves bandwidth by delivering content to users only if it’s requested.
System resource conservation – Lazy loading conserves both server and client resources, because only some of the images, JavaScript and other code actually needs to be rendered or executed.

# Project tree map.
./
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── README.md
├── src
│   ├── App.css
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── assets
│   │   ├── design.png
│   │   └── img-placeholder.png
│   ├── components
│   │   ├── editor
│   │   │   ├── editor.css
│   │   │   ├── editor.tsx
│   │   │   └── index.ts
│   │   ├── image-panel
│   │   │   ├── hook.tsx
│   │   │   ├── image-panel.css
│   │   │   ├── image-panel.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── context
│   │   ├── canvas
│   │   │   ├── canvas-context-provider.tsx
│   │   │   ├── canvas-context.ts
│   │   │   └── index.ts
│   │   ├── image-data
│   │   │   ├── image-context.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── index.css
│   ├── index.tsx
│   ├── logo.svg
│   ├── pages
│   │   ├── app-base
│   │   │   ├── app-base.css
│   │   │   ├── app-base.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── react-app-env.d.ts
│   ├── serviceWorker.ts
│   └── setupTests.ts
├── tsconfig.json
└── yarn.lock

11 directories, 39 files