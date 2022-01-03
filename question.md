# Simple Online Graphics Design Platform

## Goal

The goal of this assignment is to build a simple online image editing tool with basic functionalities.

## Description

Candidate needs to build a very simple image editing tool using canvas that let user add multiple images to the canvas, move it around and the save the generated design.

## Features

- A panel that loads thumbnails from [Picsum](https://picsum.photos/v2/list) with pagination on scrolling.

- A blank canvas (9:16)

- Drag and drop images from the left panel to the canvas

- If the canvas is blank, then image should be added as a background of the entire canvas. In case image has a different aspect ration than the canvas, then fit the image inside the canvas by blurring the sides. Check out the [example](https://github.com/invideoio/invideo-assignments/blob/master/frontend/example.mp4) to get better idea.

- If there is already a background image set, then new image should be added on top of the canvas, and should be added as per its aspect ratio

## Bonus Features

- Switch aspect ratio of canvas to 16:9

- Cropping the image


## Deliverables

This is a fairly challenging task, so we are not expecting a full fledged solution. Rather our expectations are a working solution that can execute the above mentioned features. We would love if you can document your assumptions, the features that it supports and some thoughts on what are the major challenges to develop a full fledge solution and how you think you will approach it.

- A typescript project that runs the app on localhost. The requirement for this task is to implement the central canvas / editing area using the canvas api.

- Readme file to let us know how to run the app and any other documentation that you might want to share

## Instructions

- One of the key challenges of this assignment is identifying how to work with canvas api. You are allowed to use any libraries.

- Must use typescript.

- A well written code with good abstractions will definitely make the project more appealing

- Good Design / UI is not important

