---
layout: post
title: DNS and hosting
date: 2024-07-08 21:03:38 +1000
categories: choice
---
I've been using [Cloudflare](https://cloudflare.com) for DNS hosting for years. The DNS management is great, with lightning fast updates and some cool features.

As I'd decided to recreate web sites using static generators and host using the file sharing features in [Fastmail](https://fastmail.com), it seemed like a good idea to move the DNS to Fastmail as well.

Poor choices...

At first, everything seemed fine. However, I quickly ran into the issue that if you have a domain registered with Cloudflare there is no way to delegate it to another name server. "Oh well," I think, "I'll just wait until domains are expiring and then migrate them to another registrar."

Moved a couple over to my long time favourite [Joker](https://joker.com). Discovered that not only are they more expensive (to be expected, Cloudflare claim that don't charge any markup on the wholesale registration costs), but Joker also charge extra for things like domain privacy. Ugh. Oh well, onwards.

Set up DNS in Fastmail and uploaded site content, all good.

Then discovered that the DNS capabilities were pretty limited, and were in some cases resolving a CNAME record instead of the wildcard MX, meaning mail wasn't be delivered for some subdomains. Ugh.

Tried to add a specific MX for a subdomain, to be told that I couldn't have a CNAME and MX with the same host. Ugh.

Then stumbled across a note saying that web site support isn't receiving any further development. Love it when I back a winner. Ugh.

Mostly back to square one now. Github pages maybe? Something else to learn.
