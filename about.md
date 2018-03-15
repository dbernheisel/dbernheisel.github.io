---
layout: page
title: About
permalink: /about/
---

[My Github!](https://github.com/dbernheisel)
<!--[Resume]({{ site.baseurl }}/files/DavidBernheiselResume2015.pdf)-->

## Wishcastr
<figure>
  <img src="{{ site.baseurl }}/images/wishcastr-sample.png" />
</figure>
[GitHub](https://github.com/wishcastr/wishcastr)

_curently does not work since Amazon API key expired_

Major functions:

- Users can set price thresholds on products and get notified when those products hit the threshold.
- Built on Rails 5 (API backend) and AngularJS 1.4 (Frontend)
- OAuth with Amazon Login
- Completely custom; no Ruby gems, CSS frameworks, or third-party Angular libaries.
- Background cron job to manage price updates
- Email notifications through Mailgun
- Consumes and normalizes Amazon Product Advertising API.


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

