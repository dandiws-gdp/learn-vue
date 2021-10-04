---
marp: true
---

# Frontend Security

----------

# Outline

- XSS - Cross site scripting
- CSRF - Cross-site request forgery
- Integrating third-party scripts
- Autofill
- Be carefull with iframes
- Referrer-Policy
- Dependency vulnerabilities

----------

# XSS - Cross site scripting

Cross-Site Scripting (XSS) attacks are a type of injection, in which malicious scripts are injected into otherwise benign and trusted websites. XSS attacks occur when an attacker uses a web application to send malicious code, generally in the form of a browser side script, to a different end user. Flaws that allow these attacks to succeed are quite widespread and occur anywhere a web application uses input from a user within the output it generates without validating or encoding it.

There are three main types of XSS attacks. These are:

- Reflected XSS, where the malicious script comes from the current HTTP request.
- Stored XSS, where the malicious script comes from the website's database.
- DOM-based XSS, where the vulnerability exists in client-side code rather than server-side code.

----------

### Reflected XSS

It arises when an application receives data in an HTTP request and includes that data within the immediate response in an unsafe way.

```tsx
// https://insecure-website.com/status?message=All+is+well.

<p>Status: All is well.</p>
```

```tsx
// https://insecure-website.com/status?message=<script>/*+Bad+stuff+here...+*/</script>

<p>Status: <script>/* Bad stuff here... */</script></p>
```

----------

### Stored XSS

Stored XSS (also known as persistent or second-order XSS) arises when an application receives data from an untrusted source and includes that data within its later HTTP responses in an unsafe way.

The data in question might be submitted to the application via HTTP requests; for example, comments on a blog post, user nicknames in a chat room, or contact details on a customer order. In other cases, the data might arrive from other untrusted sources; for example, a webmail application displaying messages received over SMTP, a marketing application displaying social media posts, or a network monitoring application displaying packet data from network traffic.

----------

### DOM-based cross-site scripting

DOM-based XSS (also known as DOM XSS) arises when an application contains some client-side JavaScript that processes data from an untrusted source in an unsafe way, usually by writing the data back to the DOM.

In the following example, an application uses some JavaScript to read the value from an input field and write that value to an element within the HTML:

```js
var search = document.getElementById('search').value;
var results = document.getElementById('results');
results.innerHTML = 'You searched for: ' + search;
```

----------

### XSS Prevention

- Filter input on arrival.
- Encode data on output
- Use appropriate response headers. `Content-Type` and `X-Content-Type-Options`
- Content Security Policy.
- use modern JS frameworks (React, vue, angular, etc)

more: 
- [Cross Site Scripting Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- https://portswigger.net/web-security/cross-site-scripting

----------

# CSRF - Cross-site request forgery

csrf is a browser exploit where an attacker tricks someone into executing unwanted actions against a website to which their browser is already authenticated.


- [Mitigating CSRF attacks in Single Page Applications](https://medium.com/tresorit-engineering/modern-csrf-mitigation-in-single-page-applications-695bcb538eec)
----------

![alt](https://miro.medium.com/max/1400/1*vdh5SWbgqYu4QNgtovBt2A.png)

----------

# Integrating third-party scripts

You may notice while using the bootstrap CDN with an integrity attribute.

```html
<link
  rel="stylesheet"
  href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
  integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
  crossorigin="anonymous"
/>
```

----------


Imagine you are including a third-party script in your application. 

**What if they serve different content that attacks your application instead of actual content?** 
The eventuality that is possible. The good news is we can prevent using Subresource Integrity. 

**What if your third-party provider doesn't provide the SRI?** Still, you can generate Integrity by using srihash.org

or use this command:

```
openssl dgst -sha384 -binary FILENAME.js | openssl base64 -A
```

----------


**Why do I need to include crossorigin="anonymous"?**

When the request is not on the same origin the `crossorigin` attribute must be present to check the integrity of the file.
Without a `crossorigin` attribute, the browser will choose to 'fail-open' which means it will load the resource as if the integrity attribute was not set, effectively losing all the security SRI brings in the first place.

----------

# Autofill

Autofill is the super useful feature for the user, but it might lead to Sensitive data exposure.

https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill

> Tip : Disable auto-filled forms for sensitive data.

----------

# Be carefull with iframes

Using an iframe with content from a different domain embedded into your site triggers a browser’s cross-domain policies, which maintains a separation between your code and the iframe’s content – preventing it from accessing your DOM, cookies, or local storage.

----------

However, even with these automatic cross-site protections, an iframe element from a different domain still CAN:

- Auto-play videos
- Display forms
- Trigger alerts
- Run plugins – including malicious ones
- Allow pop-ups

----------


To prevent those abbilities add `sandbox` attribute:

```html
<iframe sandbox src="http://example.com"></iframe>
```

With this attribute, iframe cannot do this things:

- Run any JavaScript, even if it would only affect - contents of the iframe.
- Change the parent’s URL
- Open pop-ups, new windows, or new tabs
- Submit forms
- Run plug-ins
- Use pointer lock
- Read cookies or local storage from the parent, - even if it’s from the same origin

----------

To give a certian access, add this in sandbox attribute :

- `allow-same-origin` - allows the iframe to access - cookies and local storage from the parent, as if - it came from the same domain.
- `allow-top-navigation` – allows the iframe to - navigate the parent to a different URL.
- `allow-forms` – allows form submission
- `allow-scripts` – allows JavaScript execution
- `allow-popups` – allows the iframe to open new - windows or tabs
- `allow-pointer-lock` – allows pointer lock

example:
```html
<iframe sandbox="allow-popup" src="..."></iframe>
```
- https://www.synopsys.com/blogs/software-security/protect-your-website-with-iframes/

----------


# Referrer-Policy
Whenever we use anchor tag or a link that navigates away from the website, make sure you use a header policy `"Referrer-Policy": "no-referrer"`or, in case of the anchor tag, set `rel = "noopener"` or `"noreferrer"` or both.
When we don’t set these headers and rel, the destination website can obtain data like session tokens and database IDs.

----------

# Dependency vulnerabilities

```npm audit```

- https://overreacted.io/npm-audit-broken-by-design/

----------

## Additional Resources

- https://html5sec.org/
- https://vuejs.org/v2/guide/security.html
- https://cheatsheetseries.owasp.org/index.html
