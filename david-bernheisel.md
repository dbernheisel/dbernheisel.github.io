---
layout: pageminimal
permalink: /david-bernheisel/index.html
title: David Bernheisel
description: "About David Bernheisel"
tags: [David, Bernheisel, about]
imagefeature: david-bernheisel-2.jpg
---

[My Github!](https://github.com/dbernheisel)
[Resume]({{ site.baseurl }}/images/DavidBernheiselResume2015.pdf)

## Wishcastr
<figure>
  <img src="{{ site.baseurl }}/images/wishcastr-sample.png" />
</figure>
[https://wishcastr.com](https://wishcastr.com)
[GitHub](https://github.com/wishcastr/wishcastr)

Major functions:
	- Users can set price thresholds on products and get notified when those products hit the threshold.
	- Built on Rails 5 (API backend) and AngularJS 1.4 (Frontend)
	- OAuth with Amazon Login
	- Completely custom; no Ruby gems, CSS frameworks, or third-party Angular libaries.
	- Background cron job to manage price updates
	- Email notifications through Mailgun
	- Consumes and normalizes Amazon Product Advertising API.


## Todo List
<figure>
  <img src="{{ site.baseurl }}/images/todo-sample.png" />
</figure>
[Demo](http://to-dame-bern-it.herokuapp.com/)
[GitHub](https://github.com/to-dame-bern-it/how-we-dew-it)

Major functions:
	- Todo list with drag-and-drop support.
	- Built with Rails 4, [Bourbon](http://bourbon.io/), [Neat](http://neat.bourbon.io/), [Refills](http://refills.bourbon.io/), jQuery.
	- Nifty motivational video backgrounds.
	- Custom login system (standard has_secure_password usage)



## Sample API Application
[API Documentation Sample](https://cats-overflow.herokuapp.com/#/)
Wrote API documentation using the Swagger environment. Swagger isn't my favorite tool, but this should show a basic RESTful API structure.
[GitHub](https://github.com/DavryKarlohoun/api)


## Command Line Utilities (fun)
<figure style="width: 23%; display: inline-block">
  <a href="{{ site.baseurl }}/images/weatherreport-sample.png">
  	<img src="{{ site.baseurl }}/images/weatherreport-sample.png" />
  </a>
  <figcaption>
  	<a href="https://github.com/dbernheisel/weather_report">Github</a>
  </figcaption>
</figure>
<figure style="width: 23%; display: inline-block">
	<a href="{{ site.baseurl }}/images/battleship-sample.png">
  	<img src="{{ site.baseurl }}/images/battleship-sample.png" />
  </a>
  <figcaption>
  	<a href="https://github.com/dbernheisel/battleship">Github</a>
  </figcaption>
</figure>
<figure style="width: 23%; display: inline-block">
	<a href="{{ site.baseurl }}/images/blackjack-sample.png">
  	<img src="{{ site.baseurl }}/images/blackjack-sample.png" />
  </a>
  <figcaption>
  	<a href="https://github.com/dbernheisel/blackjack_advisor">Github</a>
  </figcaption>
</figure>
<figure style="width: 23%; display: inline-block">
	<a href="{{ site.baseurl }}/images/numberguessing-sample.png">
  	<img src="{{ site.baseurl }}/images/numberguessing-sample.png" />
  </a>
  <figcaption>
  	<a href="https://github.com/dbernheisel/guessing_game">Github</a>
  </figcaption>
</figure>



## eBook Tools
The eBook market is a bit of a technological mixture and mess. As a budding developer, I saw some opportunities to learn, get my hands dirty, and help fill vacuums that my teams needed while I was at Ingram Content Group and VitalSource Technologies. Unfortunately, not all of these projects are not open-source.

### Contextual EPUB Checker
[EPUBCheck](https://github.com/IDPF/epubcheck) can only go so far&ndash;older versions only checked for strict validity, not whether the eBook will render correctly on the intended eReader. I recognized some patterns and incorporated Kindlegen into a checking suite that gave more insights to the publishers on possible gaps. The tools also eliminated some of the common problem with ePub packaging and manifest issues.

### Internal File Workflow
Products aren't stationary during production: they MUST move. Usually they move through a bunch of hands. Doing all of that manually is time-consuming. I created a system of cron jobs that watched network folders that allowed my team to drag-and-drop files into folders to trigger actions based on spreadsheets.

###	Metadata Analysis
Some products are incredible, but customers don't know that upfront all the time. Metadata is the first impression that they'll get. My experience with metadata in the industry can help you shape and supply data that matters.









